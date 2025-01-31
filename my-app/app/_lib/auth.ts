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
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    async signIn({ user, account }) {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: user.email as string,
        },
      });
      if (existingUser) {
        await prisma.account.upsert({
          where: {
            provider_providerAccountId: {
              provider: account?.provider ?? "",
              providerAccountId: account?.providerAccountId ?? "",
            },
          },
          update: {
            access_token: account?.access_token,
            refresh_token: account?.refresh_token,
            expires_at: account?.expires_at ?? null,
            token_type: account?.token_type,
            scope: account?.scope,
            id_token: account?.id_token,
            session_state: account?.session_state?.toString() ?? null,
          },
          create: {
            userId: existingUser.id,
            type: account?.type ?? "",
            provider: account?.provider ?? "",
            providerAccountId: account?.providerAccountId ?? "",
            access_token: account?.access_token,
            refresh_token: account?.refresh_token,
            expires_at: account?.expires_at,
            token_type: account?.token_type,
            scope: account?.scope,
            id_token: account?.id_token,
            session_state: account?.session_state?.toString(),
          },
        });
      } else {
        await prisma.user.create({
          data: {
            email: user.email as string,
            name: user.name as string,
            image: user.image,
            emailVerified: new Date(),
            password: null,
            accounts: {
              create: {
                type: account?.type ?? "",
                provider: account?.provider ?? "",
                providerAccountId: account?.providerAccountId ?? "",
                access_token: account?.access_token ?? "",
                refresh_token: account?.refresh_token ?? "",
                expires_at: account?.expires_at ?? null,
                token_type: account?.token_type ?? "",
                scope: account?.scope ?? "",
                id_token: account?.id_token ?? "",
                session_state: account?.session_state?.toString() ?? null,
              },
            },
          },
        });
      }
      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.email = token.email ?? "";
        session.user.name = token.name;
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
  },
});
