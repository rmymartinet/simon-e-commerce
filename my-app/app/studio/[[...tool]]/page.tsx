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
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export { metadata, viewport } from "next-sanity/studio";

export default async function StudioPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });


  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL_1 || session?.user?.email === process.env.ADMIN_EMAIL_2;



  if (!isAdmin) {
    redirect("/auth/signin");
  }

  return <NextStudio config={config} />;
}
