import RegisterCard from "@/app/_components/RegisterCard";
import SignIn from "@/app/_components/SignIn";
import { auth } from "@/app/_lib/auth";
import { redirect } from "next/navigation";

export default async function SignInForm({
  searchParams,
}: {
  searchParams?: Promise<{ error: string }>;
}) {
  const session = await auth();
  if (session) redirect("/dashboard");

  const params = await searchParams;
  const errorMessage = params?.error;

  return (
    <RegisterCard>
      <SignIn errorMessage={errorMessage} />
    </RegisterCard>
  );
}
