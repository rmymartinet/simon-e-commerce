"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!token) {
      setMessage("Token manquant ou invalide.");
      return;
    }

    try {
      const response = await fetch("/api/auth/password/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessage(data.message);

      if (data.success) {
        router.push("/sign-in");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Une erreur inconnue est survenue.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Réinitialiser le mot de passe</h1>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="rounded-lg border border-slate-200 p-2 text-black"
          placeholder="Nouveau mot de passe"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="rounded-lg border border-slate-200 p-2 text-black"
          placeholder="Confirmer le mot de passe"
        />
        <button className="mt-6 rounded-lg bg-button-gradient p-2 font-semibold text-white">
          Réinitialiser
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-green-500">{message}</p>}
    </div>
  );
}