import Stripe from "stripe";
import { prisma } from "../prisma";

export async function getUserAndSubscription(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription;
  const customerId = subscription.customer as string;

  const user = await prisma.user.findFirst({
    where: {
      stripeCustomerId: customerId,
    },
  });

  if (!user) {
    if (process.env.NODE_ENV === "development") {
      console.error("User not found for subscription:", subscription.id);
    }
    return null;
  }

  return { user, subscription };
}
