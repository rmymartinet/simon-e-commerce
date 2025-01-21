import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <div className="grid h-screen place-content-center">
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/dashboard" });
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>

      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/dashboard" });
        }}
      >
        <button type="submit">Signin with Github</button>
      </form>
    </div>
  );
}
