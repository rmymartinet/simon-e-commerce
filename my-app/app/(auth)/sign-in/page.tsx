import { auth } from "@/app/_lib/auths";
import { redirect } from "next/navigation";
import SignInWrapper from "@/app/_components/SignInWrapper";

export default async function SignInForm({
  searchParams,
}: {
  searchParams?: Promise<{ error: string }>;
}) {
  const session = await auth();
  if (session) redirect("/dashboard");

  const params = await searchParams;
  const errorMessage = params?.error;

  return <SignInWrapper errorMessage={errorMessage} />;
}
