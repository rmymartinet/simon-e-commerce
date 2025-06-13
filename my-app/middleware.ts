import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Liste des routes publiques
const PUBLIC_ROUTES = [
  '/auth/signin',
  '/auth/signup',
  '/api/webhook/stripe',
  '/api/payments/create-checkout-session',
  '/',
  '/programs',
  '/coachings',
  '/api/auth/verify',
  '/api/auth/signout',
  '/api/auth/signin',
  '/api/auth/signup',
  '/api/auth/reset-password',
  '/api/auth/forgot-password',
] as const;

// Liste des routes protégées nécessitant une vérification supplémentaire
const PROTECTED_ROUTES = [
  '/api/payments',
  '/api/invoices',
  '/api/user',
  '/dashboard',
  '/studio',
] as const;

// Configuration des en-têtes de sécurité
const securityHeaders = {
  'Content-Security-Policy': 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://*.sanity.io https://*.sanity-cdn.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "connect-src 'self' https://api.stripe.com https://*.stripe.com https://*.sanity.io https://*.sanity-cdn.com; " +
    "frame-src 'self' https://js.stripe.com https://*.sanity.io;",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

export async function middleware(request: NextRequest) {
 

  const sessionToken = request.cookies.get('better-auth.session_token')?.value;
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');
  const path = request.nextUrl.pathname;

  // Vérification des routes publiques
  if (PUBLIC_ROUTES.some(route => path.startsWith(route))) {
    const response = NextResponse.next();
    // Ajout des en-têtes de sécurité même pour les routes publiques
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    response.headers.set("Access-Control-Allow-Origin", "https://simon-e-commerce-mwum5g9lb-rmymartinets-projects.vercel.app");
    response.headers.set("Access-Control-Allow-Origin", "https://www.smartinet-coaching.com");
    response.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return response;
  }

  // Vérification de l'authentification
  if (!sessionToken) {
    if (isApiRoute) {
      return NextResponse.json(
        { error: 'Non autorisé - Session invalide' },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // Vérification de la validité du token
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify`, {
      headers: {
        'Cookie': `better-auth.session_token=${sessionToken}`
      }
    });

    if (!response.ok) {
      if (isApiRoute) {
        return NextResponse.json(
          { error: 'Session invalide ou expirée' },
          { status: 401 }
        );
      }
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    // Vérification supplémentaire pour les routes protégées
    if (PROTECTED_ROUTES.some(route => path.startsWith(route))) {
      const userData = await response.json();
      if (!userData?.isSubscribed && path.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/programs', request.url));
      }
    }

    const nextResponse = NextResponse.next();
    
    // Ajout des en-têtes de sécurité
    Object.entries(securityHeaders).forEach(([key, value]) => {
      nextResponse.headers.set(key, value);
    });

    nextResponse.headers.set("Access-Control-Allow-Origin", "https://simon-e-commerce-mwum5g9lb-rmymartinets-projects.vercel.app");
    nextResponse.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    nextResponse.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return nextResponse;
  } catch (error) {
    console.error('Erreur de vérification de session:', error);
    if (isApiRoute) {
      return NextResponse.json(
        { error: 'Erreur de vérification de session' },
        { status: 500 }
      );
    }
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
}

export const config = {
  matcher: [
    '/api/:path*',
    '/studio/:path*',
    '/dashboard/:path*',
    '/auth/:path*',
    '/programs/:path*',
    '/coachings/:path*'
  ]
};
