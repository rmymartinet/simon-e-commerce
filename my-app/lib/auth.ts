import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { resend } from "./resend";
import { nextCookies } from "better-auth/next-js";
import { z } from 'zod';

// Schéma de validation pour les variables d'environnement
const envSchema = z.object({
  BETTER_AUTH_SECRET: z.string().min(32),
  EMAIL_FROM: z.string().email(),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
});

// Validation des variables d'environnement
try {
  envSchema.parse({
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    EMAIL_FROM: process.env.EMAIL_FROM,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  });
} catch (error) {
  console.error("Erreur de configuration d'authentification:", error);
  throw new Error("Configuration d'authentification invalide");
}

export interface BetterAuthSession {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
}

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,

  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),

  session: {
    expiresIn: 60 * 60 * 24, // 24 heures
    updateAge: 60 * 60, // 1 heure
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    name: "better-auth.session_token",
    async create(data: { id: string; userId: string; token: string; expiresAt: Date }) {
      try {
        const session = await prisma.session.create({
          data: {
            id: data.id,
            userId: data.userId,
            token: data.token,
            expiresAt: data.expiresAt,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        });
        return session;
      } catch (error) {
        console.error("Erreur lors de la création de la session:", error);
        throw error;
      }
    },
    async validate(data: { token: string }) {
      try {
        const session = await prisma.session.findUnique({
          where: { token: data.token },
          include: { user: true }
        });
        return session;
      } catch (error) {
        console.error("Erreur lors de la validation de la session:", error);
        throw error;
      }
    }
  },

  emailAndPassword: {
    enabled: true,
    passwordMinLength: 8,
    passwordMaxLength: 100,
    passwordRequirements: {
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSpecialChars: 1,
    },

    async sendResetPassword(data) {
      try {
        
        await resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to: data.user.email,
          subject: "Réinitialisation de mot de passe",
          text: `Pour réinitialiser votre mot de passe, cliquez sur ce lien : ${data.url}\n\nCe lien expirera dans 1 heure.`,
          html: `
            <h1>Réinitialisation de mot de passe</h1>
            <p>Pour réinitialiser votre mot de passe, cliquez sur le lien ci-dessous :</p>
            <a href="${data.url}">Réinitialiser mon mot de passe</a>
            <p>Ce lien expirera dans 1 heure.</p>
            <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>
          `,
        });

      } catch (error) {
        console.error("❌ Erreur lors de l'envoi de l'email:", error);
        throw new Error("Échec de l'envoi de l'email de réinitialisation");
      }
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      scope: ["email", "profile"],
    },
  },

  plugins: [nextCookies()],

  // Configuration de sécurité supplémentaire
  security: {
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60, // 15 minutes
    requireEmailVerification: true,
    emailVerificationExpiresIn: 24 * 60 * 60, // 24 heures
  },

  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production"
        ? "__Secure-better-auth.session_token"
        : "better-auth.session_token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain: process.env.NODE_ENV === "production" ? ".smartinet-coaching.com" : undefined,
      },
    },
  }
});
