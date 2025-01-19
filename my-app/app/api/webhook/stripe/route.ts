import { prisma } from "@/app/_lib/prisma";
import Stripe from "stripe";
import crypto from "crypto";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  typescript: true,
});

type SubscriptionData = {
  startDate: string;
  endDate: string;
  subscriptionStatus: string;
  titlePlan: string;
};

console.log("HELLLLO");

const WEBHOOK_SECRET = process.env.NEXT_STRIPE_WEBHOOK_SECRET!;

function handleError(error: unknown) {
  console.error("Error handling webhook event:", error);
  return new Response("Webhook processing error", { status: 400 });
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function generateToken(length = 64): { token: string; expires: Date } {
  return {
    token: crypto.randomBytes(length).toString("hex"),
    expires: new Date(Date.now() + 3600000),
  };
}

async function handleSubscription(
  existingUser: { id: string },
  session: Stripe.Checkout.Session,
) {
  const startDate = new Date(session.created * 1000);
  const months = parseInt(session.metadata?.month || "0", 10);

  if (isNaN(months) || months <= 0) {
    console.error("Invalid months metadata:", session.metadata?.month);
    throw new Error("Invalid months metadata");
  }

  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + months); // Ajoute les mois à la date de début
  const endDateString = endDate.toISOString(); // Convertit la date de fin en chaîne de caractères

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      isSubscribed: true,
      subscriptionStartDate: startDate,
      subscriptionEndDate: endDate,
      stripeCustomerId:
        typeof session.customer === "string" ? session.customer : null,
    },
  });

  const subscriptionData: SubscriptionData = {
    startDate: startDate.toISOString(), // Convertir la date en chaîne JSON-compatible
    endDate: endDateString,
    subscriptionStatus: "active",
    titlePlan: session.metadata?.titlePlan || "",
  };

  return prisma.purchase.create({
    data: {
      userId: existingUser.id,
      amount: session.amount_total || 0,
      status: "completed",
      customerId: session.customer ? String(session.customer) : "",
      subscriptionData,
      subscriptionStatus: "active",
      createdAt: new Date(),
    },
  });
}
async function handleProgram(
  existingUser: { id: string },
  session: Stripe.Checkout.Session,
) {
  console.log("existingUser", existingUser);
  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      isSubscribed: session.metadata?.subscription ? true : false,
      stripeCustomerId:
        typeof session.customer === "string" ? session.customer : null,
    },
  });

  const userPurchaseData = {
    titlePlan: session.metadata?.titlePlan || "",
  };

  return prisma.purchase.create({
    data: {
      userId: existingUser.id,
      amount: session.amount_total || 0,
      status: "completed",
      customerId: session.customer ? String(session.customer) : "",
      userPurchaseData,
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

export async function POST(req: Request) {
  const body = await req.text();
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
    if (event.type === "checkout.session.completed") {
      const session = await stripe.checkout.sessions.retrieve(
        (event.data.object as Stripe.Checkout.Session).id,
        { expand: ["line_items"] },
      );

      if (!session.metadata) {
        throw new Error("Missing metadata in checkout session.");
      }

      const email = session.customer_details?.email || "";
      if (!validateEmail(email)) {
        throw new Error("Invalid email format.");
      }

      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        if (session.metadata?.subscription === "true") {
          await handleSubscription(existingUser, session);
        } else {
          await handleProgram(existingUser, session);

        }
      } else {
        await handleNewUser(session);
      }
    } else {
      console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response("Webhook processed successfully", { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}
