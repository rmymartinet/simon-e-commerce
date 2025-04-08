import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  /** the base url of the server (optional if you're using the same domain) */
  baseURL: "https://www.smartinet-coaching.com",
});

export const { signIn, signOut, signUp, useSession } = authClient;
