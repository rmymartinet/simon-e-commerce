import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  /** the base url of the server (optional if you're using the same domain) */
  baseURL: process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PREVIEW_BASE_URL,
});

export const { signIn, signOut, signUp, useSession } = authClient;
