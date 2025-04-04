import SignUpWrapper from "@/app/_components/signUpWrapper";
import { auth } from "@/app/_lib/auths";
import { redirect } from "next/navigation";

export default async function SignUpForm() {
  const session = await auth();
  if (session) redirect("/sign-in");

  return <SignUpWrapper />;
}
