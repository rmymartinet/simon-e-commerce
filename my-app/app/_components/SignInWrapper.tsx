import SignIn from "@/app/_components/signIn/SignIn";
import RegisterCard from "./RegisterCard";
import GoogleProvider from "./GoogleProvider";

export default function SignInWrapper({
  errorMessage,
}: {
  errorMessage?: string;
}) {
  return (
    <RegisterCard>
      <GoogleProvider />
      <SignIn errorMessage={errorMessage} />
    </RegisterCard>
  );
}
