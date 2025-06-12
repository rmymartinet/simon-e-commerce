import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { resend } from "./resend";
import { nextCookies } from "better-auth/next-js";

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
    provider: "postgresql",
  }),
  session: {
    expiresIn: 60 * 60 * 24,
    updateAge: 60 * 60,
  },
  emailAndPassword: {
    enabled: true,

    async sendResetPassword(data) {
      console.log("Sending password reset email to:", data.user.email);
      await resend.emails
        .send({
          from: process.env.EMAIL_FROM!,
          to: data.user.email,
          subject: "Password Reset",
          text: `Reset your password: ${data.url}`,
        })
        .then((res) => {
          console.log("✅ EMAIL SENT:", res);
        })
        .catch((err) => {
          console.error("❌ EMAIL ERROR:", err);
        });

      console.log("Password reset email sent to:", data.user.email);
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
});
