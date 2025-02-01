"use client";

import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("/api/auth/password/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    console.log(email);

    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Réinitialiser le mot de passe</h1>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-lg border border-slate-200 p-2 text-black"
          placeholder="Email"
        />
        <button className="mt-6 rounded-lg bg-button-gradient p-2 font-semibold text-white">
          Envoyer
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-green-500">{message}</p>}
    </div>
  );
}
