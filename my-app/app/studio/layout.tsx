import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL_1 || session?.user?.email === process.env.ADMIN_EMAIL_2;

  if (!isAdmin) {
    redirect("/auth/signin");
  }

  return <>{children}</>;
} 