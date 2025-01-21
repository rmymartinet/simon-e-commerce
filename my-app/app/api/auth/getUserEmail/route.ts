import { prisma } from "@/app/_lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  // Vérifier si l'utilisateur est authentifié
  if (!session || !session.user?.email) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 },
    );
  }

  const userEmail = session.user.email;

  try {
    // Chercher l'utilisateur dans la base de données avec Prisma en utilisant l'email
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    // Si l'utilisateur n'existe pas dans la base de données
    if (!user) {
      return NextResponse.json(
        { error: "User not found in the database" },
        { status: 404 },
      );
    }

    // Retourner toutes les informations supplémentaires de l'utilisateur
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error retrieving user from database:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
