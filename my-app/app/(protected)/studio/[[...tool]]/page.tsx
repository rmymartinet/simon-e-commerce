/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { redirect } from "next/navigation";
import { auth } from "@/app/_lib/auth";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default async function StudioPage() {
  const session: { user?: { email?: string | null } } | null = await auth();
  if (!session || session?.user?.email !== "simonmrt@hotmail.fr") {
    redirect("/sign-in");
  }
  return <NextStudio config={config} />;
}
