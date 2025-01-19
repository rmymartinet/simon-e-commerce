import { prisma } from "@/app/_lib/prisma";
import { getSession } from "@/app/_lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("GET request received"); // Journal pour suivre les appels à la fonction GET

  await new Promise((resolve) => setTimeout(resolve, 800));

  try {
    const session = await getSession();

    if (!session) {
      console.log("No session found"); // Journal pour vérifier si la session est trouvée
      return NextResponse.json({ isAuthenticated: false });
    }

    const userId = session.userId as string | undefined;

    const isExistingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!isExistingUser) {
      console.log("User not found"); // Journal pour vérifier si l'utilisateur est trouvé
      return NextResponse.json({ isAuthenticated: false });
    }

    const userData = isExistingUser;

    console.log("User authenticated:", userData); // Journal pour vérifier les données de l'utilisateur

    return NextResponse.json({ isAuthenticated: true, userData });
  } catch (error) {
    console.error("Failed to verify session", error);
    return NextResponse.json({ isAuthenticated: false });
  }
}
