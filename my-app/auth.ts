import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./app/_lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile: (profile) => {
        console.log("profile", profile);
        const name = profile.name?.split(" ");
        return {
          id: profile.id.toString(), // Ensure the 'id' is returned
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
          id: profile.sub, // Ensure the 'id' (sub) is returned
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
        username: { label: "Username", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (user && user.password === credentials.password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    authorized: async ({ auth }) => {
      console.log("authorized", auth);

      return !!auth;
    },
    async signIn({ user, account, profile }) {
      console.log("signIn", user, account, profile);
      const existingUser = await prisma.user.findUnique({
        where: {
          email: user.email as string,
        },
      });

      if (existingUser) {
        // Liez le compte OAuth au compte existant
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
