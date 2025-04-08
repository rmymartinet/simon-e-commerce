"use server";

import { FaCheck } from "react-icons/fa";
import ClearCartComponent from "@/hooks/useClearCart";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";

export default async function SuccessPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="min-w-screen flex h-screen flex-col items-center justify-center gap-10">
      <ClearCartComponent />
      <div className="w-max rounded-full bg-green-300 p-8">
        <div className="w-max rounded-full bg-green-400 p-8">
          <div className="grid w-max place-content-center rounded-full bg-green-500 p-2">
            <FaCheck size={40} color="white" />
          </div>
        </div>
      </div>
      <h1 className="mb-3 scroll-m-20 text-center text-5xl font-semibold tracking-tight transition-colors first:mt-0">
        Bienvenue sur SM Coaching 🎉
      </h1>
      <div className="flex flex-col items-center gap-2 lg:flex-row">
        <span className="font-semibold underline lg:text-lg">Programmes:</span>
        <h2 className="text-center lg:text-lg">
          Retrouvez votre (vos) programme(s) dans votre boite mail
        </h2>
      </div>
      <div className="flex flex-col items-center gap-2 lg:flex-row">
        <span className="font-semibold underline lg:text-lg">Coaching:</span>
        <h2 className="text-center lg:text-lg">
          Si vous avez opté pour un coaching, je vous contacterai
          aujourd&apos;hui.{" "}
        </h2>
      </div>
      {session ? (
        <Button variant="blackBg">
          <Link href="/auth/dashboard">Allez sur mon compte</Link>
        </Button>
      ) : (
        <Button variant="whiteBg">
          <Link href="/auth/dashboard">Home</Link>
        </Button>
      )}
    </main>
  );
}
