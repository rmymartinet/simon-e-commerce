import RegisterCard from "./RegisterCard";
import GoogleProvider from "./GoogleProvider";
import SignUpForm from "./signup/signUp";

export default function SignUpWrapper() {
  return (
    <RegisterCard>
      <GoogleProvider />
      <SignUpForm />
    </RegisterCard>
  );
}
