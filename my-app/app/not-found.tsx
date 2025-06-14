// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-6">Page non trouvée</h2>
      <p className="mb-8">Oups, la page que vous cherchez n’existe pas ou a été déplacée.</p>
      <Link href="/" className="px-6 py-2 rounded bg-violet-600 text-white font-semibold hover:bg-violet-700 transition">
        Retour à l’accueil
      </Link>
    </main>
  );
}