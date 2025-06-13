import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from 'zod';

// Schéma de validation pour les données utilisateur
const userDataSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().nullable(),
  image: z.string().nullable(),
  isSubscribed: z.boolean(),
  subscriptionEndDate: z.date().nullable(),
  subscriptionId: z.string().nullable(),
  stripeCustomerId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Non autorisé - Session invalide" },
        { status: 401 }
      );
    }

    const userData = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        isSubscribed: true,
        subscriptionEndDate: true,
        subscriptionId: true,
        stripeCustomerId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!userData) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé dans la base de données" },
        { status: 404 }
      );
    }

    // Validation des données avec Zod
    const validatedData = userDataSchema.parse(userData);

    return NextResponse.json(validatedData, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des données utilisateur:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données utilisateur invalides", details: error.errors },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}
