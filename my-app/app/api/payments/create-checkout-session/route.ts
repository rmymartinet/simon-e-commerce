import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

const VALID_SUBSCRIPTION_DURATIONS = [3, 6, 9];

function validateInput(data: { priceId: string; subscription: boolean; month: number; titlePlan: string | string[] }) {
  if (!data.priceId) {
    throw new Error("Price ID is required");
  }
  if (data.subscription && !VALID_SUBSCRIPTION_DURATIONS.includes(data.month)) {
    throw new Error("Invalid subscription duration");
  }
}

function createLineItems(priceId: string | string[]) {
  return Array.isArray(priceId)
    ? priceId.map((id) => ({
        price: id,
        quantity: 1,
      }))
    : [{ price: priceId, quantity: 1 }];
}

function formatTitlePlan(titlePlan: string | string[]) {
  return Array.isArray(titlePlan)
    ? titlePlan.filter(Boolean).join(", ") || "N/A"
    : titlePlan || "N/A";
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    validateInput(data);

    const { userId, priceId, subscription, email, guest, month, titlePlan } = data;
    const lineItems = createLineItems(priceId);
    const titlePlanString = formatTitlePlan(titlePlan);

    const baseSessionConfig = {
      line_items: lineItems,
      metadata: {
        userId,
        month,
        guest,
        titlePlan: titlePlanString,
      },
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      customer_email: email || undefined,
    };

    const session = await stripe.checkout.sessions.create(
      subscription
        ? {
            ...baseSessionConfig,
            payment_method_types: ["sepa_debit"],
            mode: "subscription",
            allow_promotion_codes: true,
            phone_number_collection: {
              enabled: true,
            },
            metadata: {
              ...baseSessionConfig.metadata,
              subscription: "true",
            },
          }
        : {
            ...baseSessionConfig,
            payment_method_types: ["card"],
            mode: "payment",
          }
    );

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create checkout session" },
      { status: 400 }
    );
  }
}
