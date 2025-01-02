import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/_lib/session";

// Routes protégées
const protectedRoutes = ["/dashboard", "/studio"];

// ID de l'utilisateur autorisé à accéder à /studio
const authorizedUserId = "cm556n08700004tju8iuxhd1i";

export const config = {
  matcher: ["/((?!api/).*)"],
};

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Déterminer si la route est protégée ou publique
  const isProtectedRoute = protectedRoutes.includes(path);

  // Récupérer le cookie de session
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;

  // Si la route est protégée et l'utilisateur n'est pas connecté, rediriger vers /login
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Si la route est /studio et l'utilisateur n'est pas autorisé, rediriger vers /dashboard
  if (path === "/studio" && session?.userId !== authorizedUserId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  // Sinon, continuer la requête normalement
  return NextResponse.next();
}
