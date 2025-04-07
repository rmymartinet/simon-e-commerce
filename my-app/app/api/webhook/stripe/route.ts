import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { handleSubscription } from "@/lib/stripe/subscription";
import { handleProgram } from "@/lib/stripe/programs";
import { stripe } from "@/lib/stripe/stripe";
import { getUserAndSubscription } from "@/lib/stripe/getUserAndSubscription";

const WEBHOOK_SECRET = process.env.NEXT_STRIPE_WEBHOOK_SECRET!;

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
        const email = session.customer_details?.email || "";

        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser) {
          if (session.metadata?.subscription) {
            await handleSubscription(existingUser, session, subscriptionId);
          } else {
            await handleProgram(existingUser, session);
          }
        } else {
          if (session.customer_details?.email) {
            await prisma.purchase.create({
              data: {
                email: session.customer_details?.email,
                amount: session.amount_total ? session.amount_total / 100 : 0,
                status: session.payment_status || "unpaid",
                customerId: session.customer as string,
                createdAt: new Date(),
                userPurchaseData: session.metadata?.programTitle
                  ? {
                      create: {
                        titlePlan: session.metadata.programTitle,
                      },
                    }
                  : undefined,
              },
            });
          }
        }

        return new Response("Webhook processed successfully", { status: 200 });

      case "customer.subscription.deleted":
      case "customer.subscription.updated":
      case "customer.subscription.created":
      case "invoice.created":
        const userAndSubscription = await getUserAndSubscription(event);

        if (!userAndSubscription && process.env.NODE_ENV === "development") {
          console.log(
            "User not found for subscription, skipping update/delete",
          );
          return new Response("User not found for subscription", {
            status: 404,
          });
        }

        const { user, subscription } = userAndSubscription!;

        if (!user) {
          return new Response("User not found for subscription", {
            status: 404,
          });
        }

        if (event.type === "customer.subscription.deleted") {
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
          // } else if (event.type === "customer.subscription.created") {
          //   await prisma.user.update({
          //     where: { id: user.id },
          //     data: {
          //       isSubscribed: true,
          //       subscriptionEndDate: new Date(
          //         subscription.current_period_end * 1000,
          //       ),
          //       subscriptionId: subscription.id,
          //     },
          //   });
          //   const subscriptionData = {
          //     startDate: new Date(
          //       subscription.current_period_start * 1000,
          //     ).toISOString(),
          //     endDate: new Date(
          //       subscription.current_period_end * 1000,
          //     ).toISOString(),
          //     status: subscription.status,
          //     titlePlan: "3mois",
          //     user: {
          //       connect: { id: user.id },
          //     },
          //   };

          //   await prisma.purchase.create({
          //     data: {
          //       userId: user.id,
          //       subscriptionId: subscription.id,
          //       amount: 3333.0,
          //       status: subscription.status,
          //       customerId: subscription.customer as string,
          //       createdAt: new Date(),
          //       subscriptionData: {
          //         create: subscriptionData,
          //       },
          //     },
          //   });
          // }
          return new Response("Webhook processed successfully", {
            status: 200,
          });
        }
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
