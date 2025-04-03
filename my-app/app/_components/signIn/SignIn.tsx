"use client";

import Link from "next/link";
import { authenticate } from "@/app/_lib/authAction";
import { Button } from "../ui/button";

function SignIn({ errorMessage }: { errorMessage?: string }) {
  return (
    <>
      <div className="flex w-full flex-nowrap items-center">
        <div className="h-[1px] w-full bg-slate-200"></div>
        <p className="mx-2 whitespace-nowrap text-[--subtext]">
          Continuer avec son email
        </p>
        <div className="h-[1px] w-full bg-slate-200"></div>
      </div>
      <form action={authenticate} className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="text-secondary rounded-lg border border-[--border-color] bg-[--card-bg] p-2"
            placeholder="Email"
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="password" className="text-sm">
            Mot de passe
          </label>
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="text-secondary rounded-lg border border-[--border-color] bg-[--card-bg] p-2"
            placeholder="Mot de passe"
          />
        </div>
        {errorMessage && (
          <p className="text-sm text-red-500">
            {decodeURIComponent(errorMessage)}
          </p>
        )}
        <Button variant="blackBg">Se connecter</Button>
        <Button variant="whiteBg">
          <Link href="/sign-up">S&apos;inscrire</Link>
        </Button>
        <button className="mt-4 text-blue-400">
          <Link href="/forgot-password">Mot de passe oublié ?</Link>
        </button>
        <button className="text-secondary">
          <Link href="/sign-up">Pas de compte? S&apos;inscrire</Link>
        </button>
      </form>
    </>
  );
}

export default SignIn;
