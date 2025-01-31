"use client";

import React, { useState } from "react";
import { signUp } from "@/app/_lib/authAction";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await signUp(formData);
      console.log("Réponse de signUp:", response); // <-- Ajoute ce log

      if (response.success) {
        router.push("/sign-in");
      } else {
        console.log("bonjour");
        setErrorMessage(response.message);
      }
    } catch {
      setErrorMessage("Une erreur inconnue est survenue.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <input
        name="name"
        type="text"
        required
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
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      <button className="mt-6 rounded-lg bg-button-gradient p-2 font-semibold text-white">
        S&apos;inscrire
      </button>
      <button className="text-black">
        <Link href="/sign-in">Vous avez déjà un compte? Se connecter</Link>
      </button>
    </form>
  );
}
