import RegisterCard from "./RegisterCard";
import SignUpForm from "./signup/signUp";
// import GoogleProvider from "./GoogleProvider";

export default function SignUpWrapper() {
  return (
    <RegisterCard>
      {/* <GoogleProvider /> */}
      <SignUpForm />
    </RegisterCard>
  );
}
