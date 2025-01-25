import { redirect } from "next/navigation";
import GoogleProvider from "./GoogleProvider";
import { signIn } from "../_lib/auth";
import Link from "next/link";

function SignIn({ errorMessage }: { errorMessage?: string }) {
  return (
    <>
      <h1 className="text-xl font-medium text-black">Se connecter</h1>
      <GoogleProvider />
      <div className="flex w-full flex-nowrap items-center">
        <div className="h-[1px] w-full bg-slate-200"></div>
        <p className="mx-2 whitespace-nowrap text-slate-400">
          Ou continuer avec son email
        </p>
        <div className="h-[1px] w-full bg-slate-200"></div>
      </div>
      <form
        action={async (formData) => {
          "use server";
          try {
            const result: { success: boolean; message: string } = await signIn(
              "credentials",
              formData,
            );
            if (!result.success) {
              redirect(`/sign-in?error=${encodeURIComponent(result.message)}`);
            } else {
              redirect("/dashboard");
            }
          } catch (error) {
            console.error(error);
            redirect(
              `/sign-in?error=${encodeURIComponent("Votre adresse mail ou mot de passe sont icorrect.")}`,
            );
          }
        }}
        className="flex w-full flex-col gap-4"
      >
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="rounded-lg border border-slate-200 p-2 text-black"
          placeholder="Email"
        />
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="rounded-lg border border-slate-200 p-2 text-black"
          placeholder="Mot de passe"
        />
        {errorMessage && (
          <p className="text-sm text-red-500">
            {decodeURIComponent(errorMessage)}
          </p>
        )}
        <button className="mt-6 rounded-lg bg-button-gradient p-2 font-semibold text-white">
          Se connecter
        </button>
        <button className="text-black">
          <Link href="/sign-up">Pas de compte? S&apos;inscrire</Link>
        </button>
      </form>
    </>
  );
}

export default SignIn;
