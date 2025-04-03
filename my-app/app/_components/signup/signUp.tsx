"use client";

import React, { useState } from "react";
import { signUp } from "@/app/_lib/authAction";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";

export default function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await signUp(formData);

      if (response.success) {
        router.push("/sign-in");
      } else {
        setErrorMessage(response.message);
      }
    } catch {
      setErrorMessage("Une erreur inconnue est survenue.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm">
          Pseudo
        </label>
        <input
          name="name"
          type="text"
          required
          className="text-secondary rounded-lg border border-[--border-color] bg-[--card-bg] p-2"
          placeholder="Nom"
        />
      </div>
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
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      <Button variant="blackBg">S&apos;inscrire</Button>
      <button className="text-secondary">
        <Link href="/sign-in">Vous avez déjà un compte? Se connecter</Link>
      </button>
    </form>
  );
}
