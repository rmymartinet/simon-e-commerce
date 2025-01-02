"use client";

import Link from "next/link";
import { FaCheck } from "react-icons/fa";

export default function SuccessPage() {
  return (
    <main className="min-w-screen flex h-screen flex-col items-center justify-center gap-10">
      <div className="w-max rounded-full bg-green-300 p-8">
        <div className="w-max rounded-full bg-green-400 p-8">
          <div className="grid w-max place-content-center rounded-full bg-green-500 p-2">
            <FaCheck size={40} color="white" />
          </div>
        </div>
      </div>
      <h1 className="mb-3 scroll-m-20 text-5xl font-semibold tracking-tight transition-colors first:mt-0">
        Bienvenue sur SM Coaching 🎉
      </h1>
      <p>Vous allez être redirigé vers votre dashboard dans 5 secondes</p>
      <Link href="/dashboard" className="mt-4">
        <button className="bg-button rounded-md px-4 py-1 font-semibold text-white">
          Aller dans mon dashboard
        </button>
      </Link>
    </main>
  );
}
