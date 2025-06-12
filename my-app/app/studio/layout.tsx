import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  console.log("Headers:", Object.fromEntries(headersList.entries()));

  const session = await auth.api.getSession({
    headers: headersList,
  });


  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL_2;

  if (!isAdmin) {
    console.log("Pas de session, redirection vers /auth/signin");
    redirect("/auth/signin");
  }

  return <>{children}</>;
} 