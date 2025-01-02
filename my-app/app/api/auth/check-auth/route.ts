import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/app/_lib/session";

export async function GET() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;

  // Si le cookie est absent ou invalide, retour 'false' pour l'état d'authentification
  if (!cookie) {
    return NextResponse.json({ isAuthenticated: false });
  }

  try {
    const session = await decrypt(cookie);
    if (session && session.userId) {
      return NextResponse.json({ isAuthenticated: true, user: session.userId });
    } else {
      return NextResponse.json({ isAuthenticated: false });
    }
  } catch (error) {
    console.error("Error decrypting session:", error);
    return NextResponse.json({ isAuthenticated: false });
  }
}
