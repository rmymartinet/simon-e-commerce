import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/stripe";

export async function GET() {
  try {
    // Vérifiez si l'utilisateur est authentifié
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Récupérez le stripeCustomerId depuis la base de données
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { stripeCustomerId: true },
    });

    if (!dbUser?.stripeCustomerId) {
      return NextResponse.json({ invoices: [] });
    }

    // Récupérez les factures depuis Stripe
    const invoices = await stripe.invoices.list({
      customer: dbUser.stripeCustomerId,
      limit: 10, // Limitez le nombre de factures retournées
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
