import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { verifyAuth } from "@/lib/auth-utils";
import { z } from 'zod';
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

const checkoutSchema = z.object({
  lineItems: z.array(z.object({
    priceId: z.string(),
    quantity: z.number().min(1),
    titlePlan: z.string(),
    month: z.number(),
  })),
  subscription: z.boolean(),
  email: z.string().email().optional(),
  guest: z.boolean().optional()
});

function createLineItems(lineItems: { priceId: string; quantity: number }[]) {
  return lineItems.map(({ priceId, quantity }) => ({
    price: priceId,
    quantity,
  }));
}

function formatTitlePlan(lineItems: { titlePlan: string; quantity: number }[]) {
  return lineItems
    .map(item => `${item.titlePlan}${item.quantity > 1 ? ` (x${item.quantity})` : ''}`)
    .join(", ");
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Validation des entrées
    const validatedData = checkoutSchema.parse(data);

    const { lineItems, subscription, email, guest } = validatedData;

    // Vérification de l'authentification
    let userId = 'guest';
    let userEmail = email;
    let user = null;

    // Si ce n'est pas un invité, on vérifie l'authentification
    if (!guest) {
      try {
        const auth = await verifyAuth(req);
        if (auth.success && auth.user) {
          userId = auth.user.id;
          userEmail = auth.user.email;
          user = auth.user;
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

    let stripeCustomerId = user?.stripeCustomerId;


    // Vérifier si le stripeCustomerId existe dans Stripe
    if (stripeCustomerId) {
      try {
        await stripe.customers.retrieve(stripeCustomerId);
      } catch (error) {
        console.error("Erreur lors de la vérification du stripeCustomerId:", error);

        stripeCustomerId = null;
        // Réinitialiser le stripeCustomerId dans la base de données
        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: { stripeCustomerId: null },
          });
        }
      }
    }

    // Créer un nouveau client si nécessaire
    if (!stripeCustomerId) {
      console.log("Création d'un nouveau client Stripe pour:", userEmail);
      const customer = await stripe.customers.create({
        email: userEmail,
        name: user?.name || "",
      });
      stripeCustomerId = customer.id;
      console.log("Nouveau client Stripe créé:", stripeCustomerId);
      
      // Mettre à jour l'utilisateur dans la base
      if (user) {
        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerId },
        });
        console.log("Base de données mise à jour avec le nouveau stripeCustomerId");
      }
    }

    const stripeLineItems = createLineItems(lineItems);
    const titlePlanString = formatTitlePlan(lineItems);

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      line_items: stripeLineItems,
      metadata: {
        userId,
        month: lineItems[0]?.month.toString() || "0",
        titlePlan: titlePlanString,
        guest: guest ? "true" : "false"
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    };

    if (stripeCustomerId) {
      sessionParams.customer = stripeCustomerId;
    } else {
      sessionParams.customer_email = userEmail;
    }

    const session = await stripe.checkout.sessions.create(
      subscription
        ? {
            ...sessionParams,
            payment_method_types: ["sepa_debit"],
            mode: "subscription",
            allow_promotion_codes: true,
            phone_number_collection: {
              enabled: true,
            },
            metadata: {
              ...sessionParams.metadata,
              subscription: "true",
            },
          }
        : {
            ...sessionParams,
            payment_method_types: ["card"],
            mode: "payment",
          }
    );

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Erreur de validation:", error.errors);
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
