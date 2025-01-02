import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { userId, priceId, subscription, email, guest, month, titlePlan } =
    await req.json();

  if (subscription) {
    if (![3, 6, 9].includes(month)) {
      return NextResponse.json({ error: "Invalid subscription duration" });
    }

    try {
      // Si priceId est un tableau, on le mappe pour créer les line_items
      const lineItems = Array.isArray(priceId)
        ? priceId.map((id) => ({
            price: id, // Assurez-vous que `id` est une chaîne
            quantity: 1,
          }))
        : [{ price: priceId, quantity: 1 }]; // Cas d'un seul prix

      const titlePlanString = Array.isArray(titlePlan)
        ? titlePlan.filter((item) => item).join(", ") || "N/A"
        : titlePlan || "N/A";

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        metadata: {
          userId,
          subscription,
          month,
          guest,
          titlePlan: titlePlanString,
        },
        mode: "subscription",
        success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        allow_promotion_codes: true,
        customer_email: email,
        phone_number_collection: {
          enabled: true,
        },
      });

      console.log("Subscription checkout session created:", session.id);

      return NextResponse.json({ sessionId: session.id });
    } catch (error) {
      console.error("Error creating subscription checkout session:", error);
      return NextResponse.json({ error: "Failed to create checkout session" });
    }
  } else {
    try {
      // Si priceId est un tableau, on le mappe pour créer les line_items
      const lineItems = Array.isArray(priceId)
        ? priceId.map((id) => ({
            price: id, // Assurez-vous que `id` est une chaîne
            quantity: 1,
          }))
        : [{ price: priceId, quantity: 1 }]; // Cas d'un seul prix

      const titlePlanString = Array.isArray(titlePlan)
        ? titlePlan.filter((item) => item).join(", ") || "N/A"
        : titlePlan || "N/A";

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        metadata: { userId, month, guest, titlePlan: titlePlanString },
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        customer_email: email || undefined,
      });

      return NextResponse.json({ sessionId: session.id });
    } catch (error) {
      console.error("Error creating one-time payment checkout session:", error);
      return NextResponse.json({ error: "Failed to create checkout session" });
    }
  }
}
