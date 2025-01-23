import { signUp } from "@/app/_lib/action";
import GoogleProvider from "../../_components/GoogleProvider";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/app/_lib/auth";
import RegisterCard from "@/app/_components/RegisterCard";

export default async function SignUpForm() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <RegisterCard>
      <h1 className="text-xl font-medium text-black">S&apos;insrire</h1>
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
          const res = await signUp(formData);

          if (res.success) {
            redirect("/dashboard");
          }
        }}
        className="flex w-full flex-col gap-4"
      >
        <input
          name="name"
          type="name"
          required
          autoComplete="name"
          className="rounded-lg border border-slate-200 p-2 text-black"
          placeholder="Nom"
        />
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
        <button className="mt-6 rounded-lg bg-button-gradient p-2 font-semibold text-white">
          Se connecter
        </button>
        <button className="text-black">
          <Link href="/sign-in">Vous avez déja un compte? Se connecter</Link>
        </button>
      </form>
    </RegisterCard>
  );
}
