import { hashPassword } from "@/app/_lib/hashPassword";
import { prisma } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();
    console.log("Token:", token);
    console.log("Password:", password);

    // Vérifier si le token est valide et non expiré
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          gt: new Date(), // Token non expiré
        },
      },
    });

    if (!user) {
      return NextResponse.redirect("/404");
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await hashPassword(password);

    // Mettre à jour le mot de passe et invalider le token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    return NextResponse.json({
      message: "Mot de passe réinitialisé avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la réinitialisation du mot de passe:", error);
    return NextResponse.json(
      { message: "Erreur lors de la réinitialisation du mot de passe" },
      { status: 500 },
    );
  }
}
