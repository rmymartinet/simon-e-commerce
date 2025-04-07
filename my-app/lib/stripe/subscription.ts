import { prisma } from "../prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  typescript: true,
});

export async function handleSubscription(
  existingUser: { id: string; email: string },
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
  const endDateTimestamp = Math.floor(endDate.getTime() / 1000);

  await stripe.subscriptions.update(subscriptionId, {
    cancel_at: endDateTimestamp,
  });

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

  await prisma.purchase.create({
    data: {
      email: existingUser.email, // 👈 ajoute ça
      subscriptionId,
      userId: existingUser.id,
      amount: session.amount_total || 0,
      status: "completed",
      customerId: session.customer ? String(session.customer) : "",
      createdAt: new Date(),
      subscriptionData: {
        create: {
          startDate,
          endDate,
          titlePlan: session.metadata?.titlePlan || "",
          status: session.metadata?.status || "",
          user: {
            connect: { id: existingUser.id },
          },
        },
      },
    },
  });
}
