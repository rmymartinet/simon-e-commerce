import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe/stripe";
import { verifyAuth } from "@/lib/auth-utils";

export async function GET(req: NextRequest) {
  try {
    // Vérification de l'authentification
    const auth = await verifyAuth(req);
    if (!auth.success) {
      return NextResponse.json(
        { error: auth.error },
        { status: auth.status }
      );
    }

    // Récupérez le stripeCustomerId depuis la base de données
    const dbUser = await prisma.user.findUnique({
      where: { id: auth.user?.id },
      select: { stripeCustomerId: true },
    });

    if (!dbUser?.stripeCustomerId) {
      return NextResponse.json({ invoices: [] });
    }

    // Récupérez les factures depuis Stripe
    const invoices = await stripe.invoices.list({
      customer: dbUser.stripeCustomerId,
      limit: 10,
    });

    // Retournez les factures
    return NextResponse.json({ invoices: invoices.data });
  } catch (error) {
    console.error("Erreur lors de la récupération des factures :", error);
    return NextResponse.json(
      {
        error: "Une erreur est survenue lors de la récupération des factures.",
      },
      { status: 500 },
    );
  }
}
