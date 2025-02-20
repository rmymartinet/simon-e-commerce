import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { singInSchema } from "./zod";
import { getUserByEmail } from "./user";

async function verifyPassword(plainPassword: string, hashedPassword: string) {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  return match;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile: (profile) => {
        const name = profile.name?.split(" ");
        return {
          id: profile.id.toString(),
          firstName: name?.[0] ?? "unknown",
          lastName: name?.[1],
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile: (profile) => {
        return {
          id: profile.sub,
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          image: profile.picture,
          username:
            `${profile.given_name}${profile.family_name}`.toLowerCase() ??
            "unknown",
        };
      },
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const isValidCredentials = await singInSchema.parseAsync(credentials);
          const user = await getUserByEmail(isValidCredentials.email);

          if (!user) {
            throw new Error("Invalid email or password.");
          }

          const verifyPass = await verifyPassword(
            isValidCredentials.password,
            user?.password ?? "",
          );

          if (!verifyPass) {
            throw new Error("Password not match");
          }

          return user;
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message || "An unexpected error occurred.");
          }
          throw new Error("An unexpected error occurred.");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",

  // Ajouter la configuration des cookies pour PKCE et CSRF
  cookies: {
    csrfToken: {
      name: "next-auth.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
});
