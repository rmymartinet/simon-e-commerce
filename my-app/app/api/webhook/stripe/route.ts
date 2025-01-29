import { prisma } from "@/app/_lib/prisma";
import Stripe from "stripe";
import crypto from "crypto";
import { sendProgramEmail } from "@/app/_lib/mailer";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  typescript: true,
});

type SubscriptionData = {
  startDate: string;
  endDate: string;
  titlePlan: string;
  status: string;
};

const WEBHOOK_SECRET = process.env.NEXT_STRIPE_WEBHOOK_SECRET!;

function generateToken(length = 64): { token: string; expires: Date } {
  return {
    token: crypto.randomBytes(length).toString("hex"),
    expires: new Date(Date.now() + 3600000),
  };
}

async function handleSubscription(
  existingUser: { id: string },
  session: Stripe.Checkout.Session,
  subscriptionId: string,
) {
  const startDate = new Date(session.created * 1000);
  const months = parseInt(session.metadata?.month || "0", 10);

  if (isNaN(months) || months <= 0) {
    console.error("Invalid months metadata:", session.metadata?.month);
    throw new Error("Invalid months metadata");
  }

  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + months);
  const endDateString = endDate.toISOString();

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      subscriptionId,
      isSubscribed: true,
      subscriptionStartDate: startDate,
      subscriptionEndDate: endDate,
      stripeCustomerId:
        typeof session.customer === "string" ? session.customer : null,
    },
  });

  const subscriptionData: SubscriptionData = {
    startDate: startDate.toISOString(),
    endDate: endDateString,
    titlePlan: session.metadata?.titlePlan || "",
    status: session.metadata?.status || "",
  };

  return prisma.purchase.create({
    data: {
      subscriptionId,
      userId: existingUser.id,
      amount: session.amount_total || 0,
      status: "completed",
      customerId: session.customer ? String(session.customer) : "",
      subscriptionData: {
        create: subscriptionData,
      },
      createdAt: new Date(),
    },
  });
}
async function handleProgram(
  existingUser: { id: string },
  session: Stripe.Checkout.Session,
) {
  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      isSubscribed: session.metadata?.subscription ? true : false,
      stripeCustomerId:
        typeof session.customer === "string" ? session.customer : null,
    },
  });

  const email = session.customer_details?.email || "";
  const programTitle = session.metadata?.titlePlan as string;
  await sendProgramEmail(email, programTitle);

  const userPurchaseData = {
    titlePlan: session.metadata?.titlePlan as string,
  };


  return prisma.purchase.create({
    data: {
      userId: existingUser.id,
      amount: session.amount_total || 0,
      status: "completed",
      customerId: session.customer ? String(session.customer) : "",
      userPurchaseData: {
        create: userPurchaseData,
      },
      createdAt: new Date(),
    },
  });
}
async function handleNewUser(session: Stripe.Checkout.Session) {
  const { token: activationToken, expires: activationTokenExpires } =
    generateToken();
  const email = session.customer_details?.email || "";

  const newUser = await prisma.user.create({
    data: {
      email,
      password: crypto.randomBytes(16).toString("hex"),
      isTemporary: true,
      activationToken,
      activationTokenExpires,
      createdAt: new Date(),
    },
  });

  await prisma.purchase.create({
    data: {
      userId: newUser.id,
      customerId: session.customer ? String(session.customer) : "", // Vérifier le type de customerId
      amount: session.amount_total || 0,
      status: "completed",
      createdAt: new Date(),
    },
  });

  // Envoyer un email d'activation (simulate the process)
  const activationLink = `http://localhost:3000/activate?token=${activationToken}`;
  console.log(`Activation email sent to ${email}: ${activationLink}`);
}

async function getUserAndSubscription(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription;
  const customerId = subscription.customer as string;

  const user = await prisma.user.findFirst({
    where: {
      stripeCustomerId: customerId,
    },
  });

  if (!user) {
    console.error("User not found for subscription:", subscription.id);
    return null;
  }

  return { user, subscription };
}

export async function POST(req: Request) {
  const body = await req.text();

  if (!body) {
    console.error("Empty body received");
    return new Response("Empty body", { status: 400 });
  }

  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return new Response("Missing Stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return new Response("Webhook signature verification failed.", {
      status: 400,
    });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = await stripe.checkout.sessions.retrieve(
          (event.data.object as Stripe.Checkout.Session).id,
          {
            expand: ["line_items"],
          },
        );

        const subscriptionId = session.subscription as string;

        console.log("Session completed:", session.id);

        const email = session.customer_details?.email || "";
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser) {
          if (session.metadata?.subscription) {
            await handleSubscription(existingUser, session, subscriptionId);
            await handleProgram(existingUser, session, clearCart);
            await handleProgram(existingUser, session);
            console.log("Program purchased");
          }
        } else {
          await handleNewUser(session);
        }

        return new Response("Webhook processed successfully", { status: 200 });

      case "customer.subscription.deleted":
      case "customer.subscription.updated":
      case "customer.subscription.created":
      case "invoice.created":
        const userAndSubscription = await getUserAndSubscription(event);

        if (!userAndSubscription) {
          console.log(
            "User not found for subscription, skipping update/delete",
          );
          return new Response("User not found for subscription", {
            status: 404,
          });
        }

        const { user, subscription } = userAndSubscription;

        if (!user) {
          console.log("No user found for subscription, skipping update/delete");
          return new Response("User not found for subscription", {
            status: 404,
          });
        }

        if (event.type === "customer.subscription.deleted") {
          console.log("Subscription deleted for user:", user.id);
          await prisma.purchase.deleteMany({
            where: {
              userId: user.id,
              subscriptionId: subscription.id,
            },
          });

          await prisma.user.update({
            where: { id: user.id },
            data: {
              isSubscribed: false,
              subscriptionEndDate: new Date(),
              subscriptionId: null,
            },
          });
        } else if (event.type === "customer.subscription.created") {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              isSubscribed: true,
              subscriptionEndDate: new Date(
                subscription.current_period_end * 1000,
              ),
              subscriptionId: subscription.id,
            },
          });
          const subscriptionData = {
            startDate: new Date(
              subscription.current_period_start * 1000,
            ).toISOString(),
            endDate: new Date(
              subscription.current_period_end * 1000,
            ).toISOString(),
            status: subscription.status, // Ajoute le champ `status` ici
            titlePlan: "3mois",
          };

          await prisma.purchase.create({
            data: {
              userId: user.id,
              subscriptionId: subscription.id,
              amount: 3333.0,
              status: subscription.status,
              customerId: subscription.customer as string,
              createdAt: new Date(),
              subscriptionData: {
                create: subscriptionData, // Crée la relation SubscriptionData avec les bons champs
              },
            },
          });
        }

        return new Response("Webhook processed successfully", { status: 200 });

      default:
        if (process.env.NODE_ENV === "development") {
          console.log(`Unhandled event type: ${event.type}`);
        }
        return new Response(`Unhandled event type: ${event.type}`, {
          status: 200,
        });
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
