import { headers } from "next/headers";
import { auth } from "./auth";

export const getUser = async () => {
  "use server";

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user;
};
