import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { resend } from "./resend";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,

    async sendResetPassword(data) {
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
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
});
