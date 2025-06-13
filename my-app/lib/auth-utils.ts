import { NextRequest } from 'next/server';
import { prisma } from './prisma';

export async function verifyAuth(req: NextRequest) {
  const cookieName = process.env.NODE_ENV === "production"
    ? "__Secure-better-auth.session_token"
    : "better-auth.session_token";
  const sessionToken = req.cookies.get(cookieName)?.value;
  
  
  if (!sessionToken) {
    return { 
      success: false, 
      error: 'Non autorisé',
      status: 401 
    };
  }

  try {
    // Extraction du token de base (avant le point)
    const baseToken = sessionToken.split('.')[0];
  
    
    const session = await prisma.session.findFirst({
      where: { 
        token: baseToken
      },
      include: { user: true }
    });


    if (!session) {
      return { 
        success: false, 
        error: 'Session invalide',
        status: 401 
      };
    }

    // Vérification de la date d'expiration
    if (session.expiresAt < new Date()) {
      return {
        success: false,
        error: 'Session expirée',
        status: 401
      };
    }

    return { 
      success: true, 
      user: session.user 
    };
  } catch (error) {
    console.error('Erreur de vérification:', error);
    return { 
      success: false, 
      error: 'Erreur de vérification',
      status: 500 
    };
  }
} 