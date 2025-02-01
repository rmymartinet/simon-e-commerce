import { generateResetToken } from "@/app/_lib/generateToken";
import { prisma } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      console.log("Invalid or expired token");
      return NextResponse.json({ message: "Email invalide" }, { status: 400 });
    }

    await generateResetToken(email);

    return NextResponse.json(
      {
        message: "Mail pour réinitialisation de mot de passe envoyé",
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Erreur lors de la réinitialisation du mot de passe" },
      { status: 500 },
    );
  }
}
