"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log l’erreur si besoin
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-6xl font-bold mb-4">500</h1>
      <h2 className="text-2xl mb-6">Erreur interne du serveur</h2>
      <p className="mb-8">Une erreur inattendue est survenue. Veuillez réessayer plus tard.</p>
      <button
        onClick={() => reset()}
        className="mb-4 px-6 py-2 rounded bg-violet-600 text-white font-semibold hover:bg-violet-700 transition"
      >
        Réessayer
      </button>
      <Link href="/" className="px-6 py-2 rounded bg-gray-800 text-white font-semibold hover:bg-gray-700 transition">
        Retour à l’accueil
      </Link>
    </main>
  );
}