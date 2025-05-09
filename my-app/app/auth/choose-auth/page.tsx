"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Guest from "@/components/Guest";
import useWindowWidth from "@/hooks/useWindowWidth";

export default function Page() {
  const { width } = useWindowWidth();
  const isMobile = width < 768;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10 lg:grid lg:grid-cols-2 lg:gap-10">
      {/* Image de fond ou illustration */}
      <div className="flex items-center justify-center">
        <Image
          src="/images/card_program/advanced.png"
          alt="Illustration programme"
          width={isMobile ? 300 : 400}
          height={isMobile ? 300 : 400}
          className="rounded-xl object-cover shadow-lg"
        />
      </div>

      {/* Section Choix utilisateur */}
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-8">
        <h1 className="text-center text-2xl font-bold">
          Choisissez comment continuer
        </h1>

        <div className="flex w-full flex-col gap-4">
          <Link href="/auth/signin">
            <Button className="w-full py-6 text-lg" variant="blackBg">
              Se connecter
            </Button>
          </Link>

          <div className="relative text-center text-gray-500 before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:bg-gray-300 before:content-['']">
            <span className="relative z-10 bg-white px-4 text-sm">ou</span>
          </div>

          <Guest />
        </div>
      </div>
    </div>
  );
}
