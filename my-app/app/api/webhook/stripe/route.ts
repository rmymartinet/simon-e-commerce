import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { handleSubscription } from "@/lib/stripe/subscription";
import { handleProgram } from "@/lib/stripe/programs";
import { sendProgramEmail } from "@/lib/mailer";
import { stripe } from "@/lib/stripe/stripe";
import { getUserAndSubscription } from "@/lib/stripe/getUserAndSubscription";
import { headers } from "next/headers";
import { User } from "better-auth/types";

const WEBHOOK_SECRET = process.env.NEXT_STRIPE_WEBHOOK_SECRET!;

const HANDLED_EVENTS = [
  "checkout.session.completed",
  "customer.subscription.deleted",
  "customer.subscription.updated",
  "customer.subscription.created",
  "invoice.created",
  "payment_intent.succeeded",
  "payment_intent.payment_failed",
] as const;

async function handleCheckoutSession(session: Stripe.Checkout.Session) {
  const subscriptionId = session.subscription as string;
  const email =
    session.customer_details?.email ||
    session.customer_email ||
    session.metadata?.email;

  if (!email) {
    throw new Error("No email found in session");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  const programTitle =
    (session.metadata?.titlePlan as string | undefined) ||
    (session.metadata?.programTitle as string | undefined) ||
    "";

  if (existingUser) {
    if (session.metadata?.subscription) {
      await handleSubscription(existingUser, session, subscriptionId);
    } else {
      await handleProgram(existingUser, session);
    }
  } else {
    await prisma.purchase.create({
      data: {
        email,
        amount: session.amount_total ? session.amount_total / 100 : 0,
        status: session.payment_status || "unpaid",
        customerId: session.customer as string,
        createdAt: new Date(),
        userPurchaseData: programTitle
          ? {
              create: {
                titlePlan: programTitle,
              },
            }
          : undefined,
      },
    });

    if (programTitle) {
      await sendProgramEmail(email, programTitle);
    }
  }
}

async function handleSubscriptionDeletion(user: User, subscription: Stripe.Subscription) {
  try {
    
    const result = await prisma.$transaction(async (tx) => {
      // Supprimer les achats liés
      const deletedPurchases = await tx.purchase.deleteMany({
        where: {
          userId: user.id,
          subscriptionId: subscription.id,
        },
      });

      // Mettre à jour l'utilisateur
      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: {
          isSubscribed: false,
          subscriptionEndDate: new Date(),
          subscriptionId: null,
        },
      });

      return { deletedPurchases, updatedUser };
    });

    return result;
  } catch (error) {
    console.error('Error in subscription deletion transaction:', error);
    throw error;
  }
}

export async function POST(req: Request) {
  console.log("Début du webhook Stripe");
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!body || !sig) {
    return new Response(
      JSON.stringify({ error: "Missing body or signature" }), 
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response(
      JSON.stringify({ error: "Invalid signature" }), 
      { status: 400 }
    );
  }

  if (!HANDLED_EVENTS.includes(event.type as typeof HANDLED_EVENTS[number])) {
    console.log(`Unhandled event type: ${event.type}`);
    return new Response(
      JSON.stringify({ message: "Event type not handled" }), 
      { status: 200 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = await stripe.checkout.sessions.retrieve(
          (event.data.object as Stripe.Checkout.Session).id,
          { expand: ["line_items"] }
        );
        await handleCheckoutSession(session);
        break;
      }

      case "customer.subscription.deleted": {
        const result = await getUserAndSubscription(event);
        if (!result) {
          throw new Error("User or subscription not found");
        }
        const { user, subscription } = result;
        await handleSubscriptionDeletion(user, subscription);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("paymentIntent reçu :", paymentIntent);

        if (!paymentIntent.customer) {
          console.warn("paymentIntent.customer est null ou undefined !");
          break;
        }

        // On retrouve l'utilisateur à partir du stripeCustomerId
        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: paymentIntent.customer as string }
        });

        if (!user) {
          const email = paymentIntent.receipt_email || 'inconnu';
          console.warn("Aucun utilisateur trouvé pour ce customer Stripe :", paymentIntent.customer, "Email associé :", email);
          break;
        }

        // On met à jour les achats de cet utilisateur
        await prisma.purchase.updateMany({
          where: { userId: user.id, customerId: paymentIntent.customer as string },
          data: { status: "paid" },
        });

        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        if (!paymentIntent.customer) {
          console.warn("paymentIntent.customer est null ou undefined !");
          break;
        }
        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: paymentIntent.customer as string }
        });
        if (!user) {
          const email = paymentIntent.receipt_email || 'inconnu';
          console.warn("Aucun utilisateur trouvé pour ce customer Stripe :", paymentIntent.customer, "Email associé :", email);
          break;
        }
        await prisma.purchase.updateMany({
          where: { userId: user.id, customerId: paymentIntent.customer as string },
          data: { status: "failed" },
        });
        break;
      }
    }

    return new Response(
      JSON.stringify({ message: "Webhook processed successfully" }), 
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur dans le webhook Stripe :", error);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      }), 
      { status: 500 }
    );
  }
}
