import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth-utils";
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email()
});

export async function POST(req: NextRequest) {
  try {
    // Vérification de l'authentification
    const auth = await verifyAuth(req);
    if (!auth.success) {
      return NextResponse.json(
        { error: auth.error },
        { status: auth.status }
      );
    }

    // Validation des entrées
    const body = await req.json();
    const validatedData = userSchema.parse(body);

    // Vérification que l'utilisateur modifie ses propres données
    if (!auth.user || auth.user.email !== validatedData.email) {
      return NextResponse.json(
        { error: 'Accès non autorisé' },
        { status: 403 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { email: validatedData.email },
      data: { name: validatedData.name },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: error.errors },
        { status: 400 }
      );
    }

    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }

    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const auth = await verifyAuth(req);

  if (!auth.success) {
    return NextResponse.json(
      { error: auth.error },
      { status: auth.status }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: auth.user?.email,
    },
    select: {
      isSubscribed: true,
      Purchase: true,
    },
  });

  return NextResponse.json(user, { status: 200 });
}
