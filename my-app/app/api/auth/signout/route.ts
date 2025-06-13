import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { cookies } from "next/headers";

// Liste des cookies à supprimer lors de la déconnexion
const COOKIES_TO_DELETE = [
  "next-auth.session-token",
  "better-auth.session_token",
  "better-auth.csrf_token",
  "better-auth.callback_url",
  "better-auth.state"
];

export async function POST() {
  try {
    // Vérification de la session avant la déconnexion
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: "Aucune session active" },
        { status: 401 }
      );
    }

    // Déconnexion via l'API d'authentification
    await auth.api.signOut({
      headers: await headers(),
    });
    
    // Suppression de tous les cookies d'authentification
    const cookieStore = await cookies();
    COOKIES_TO_DELETE.forEach(cookieName => {
      cookieStore.delete(cookieName);
    });

    // Nettoyage des en-têtes de sécurité
    const response = NextResponse.json(
      { success: true, message: "Déconnexion réussie" },
      { status: 200 }
    );

    // Ajout d'en-têtes de sécurité
    response.headers.set("Clear-Site-Data", '"cookies", "storage"');
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    
    // Réponse d'erreur avec en-têtes de sécurité
    const errorResponse = NextResponse.json(
      { 
        error: "Erreur lors de la déconnexion",
        details: error instanceof Error ? error.message : "Erreur inconnue"
      },
      { status: 500 }
    );

    errorResponse.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    errorResponse.headers.set("Pragma", "no-cache");
    
    return errorResponse;
  }
} 