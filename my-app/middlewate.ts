import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request, {
    cookieName: "session_token",
    cookiePrefix: "better-auth",
  });

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

const protectedRoutes = [
  "/dashboard",
  "/dashboard/settings",
  "/dashboard/invoices",
  "/dashboard/faq",
  "/dashboard/support",
  "/studio/:path*",
];
export const config = {
  matcher: protectedRoutes,
};
