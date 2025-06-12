import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const headersList = await headers();
    await auth.api.signOut({
      headers: headersList,
    });
    
    const cookieStore = await cookies();
    cookieStore.delete("next-auth.session-token");
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    return NextResponse.json({ error: "Erreur lors de la déconnexion" }, { status: 500 });
  }
} 