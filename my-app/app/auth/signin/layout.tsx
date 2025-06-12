import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (session) {
    redirect("/auth/portal");
  }

  return <main className="flex justify-center items-center h-screen">{children}</main>;
} 