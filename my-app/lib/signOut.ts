"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signOut() {
  const resolvedHeaders = Object.fromEntries((await headers()).entries());
  await auth.api.signOut({ headers: resolvedHeaders });
  redirect("/auth/signin");
}
