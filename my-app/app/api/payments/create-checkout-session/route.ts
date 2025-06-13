import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { verifyAuth } from "@/lib/auth-utils";
import { z } from 'zod';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

const VALID_SUBSCRIPTION_DURATIONS = [3, 6, 9];

const checkoutSchema = z.object({
  priceId: z.union([z.string(), z.array(z.string())]),
  subscription: z.boolean(),
  month: z.number().refine(val => !val || VALID_SUBSCRIPTION_DURATIONS.includes(val), {
    message: "Durée de souscription invalide"
  }),
  titlePlan: z.union([z.string(), z.array(z.string())]),
  email: z.string().email().optional(),
  guest: z.boolean().optional()
});

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
    console.log("data", data);  
    
    // Validation des entrées
    const validatedData = checkoutSchema.parse(data);

    const { priceId, subscription, email, month, titlePlan, guest } = validatedData;
    const isGuest = guest === true;

    // Vérification de l'authentification
    let userId = 'guest';
    let userEmail = email;



    // Si ce n'est pas un invité, on vérifie l'authentification
    if (!isGuest) {
      try {
        const auth = await verifyAuth(req);
        if (auth.success && auth.user) {
          userId = auth.user.id;
          userEmail = auth.user.email;
        } else {
          console.error("Échec de l'authentification:", auth.error);
          return NextResponse.json(
            { error: "Session invalide" },
            { status: 401 }
          );
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification:", error);
        return NextResponse.json(
          { error: "Erreur lors de la vérification de l'authentification" },
          { status: 500 }
        );
      }
    }

    if (!userEmail) {
      return NextResponse.json(
        { error: "L'email est requis pour le paiement" },
        { status: 400 }
      );
    }

    const lineItems = createLineItems(priceId);
    const titlePlanString = formatTitlePlan(titlePlan);



    const baseSessionConfig = {
      line_items: lineItems,
      metadata: {
        userId,
        month: month.toString(),
        titlePlan: titlePlanString,
        guest: isGuest ? "true" : "false"
      },
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      customer_email: userEmail,
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
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Échec de la création de la session" },
      { status: 400 }
    );
  }
}
