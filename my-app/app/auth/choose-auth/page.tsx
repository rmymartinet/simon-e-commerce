"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Guest from "@/components/Guest";
import { useRouter, useSearchParams } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { Suspense } from "react";

const ChooseAuthContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = searchParams.toString();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10 md:py-20">
      <div className="flex w-full max-w-4xl flex-col items-center gap-10 lg:flex-row lg:gap-20">
        {/* Image de fond ou illustration - cachée sur mobile */}
        <div className="hidden lg:flex items-center justify-center">
          <Image
            src="/images/card_program/advanced.png"
            alt="Illustration programme"
            width={400}
            height={400}
            className="rounded-xl object-cover shadow-lg"
          />
        </div>

        {/* Section Choix utilisateur */}
        <div className="flex w-full max-w-md flex-col items-center justify-center gap-6">
          <button 
            onClick={() => router.back()}
            className="self-start flex items-center gap-2 mb-12"
          >
            <IoArrowBack />
            Retour
          </button>

          <h1 className="text-center text-2xl font-bold md:text-3xl">
            Choisissez comment continuer
          </h1>

          <p className="text-center">
            Pour finaliser votre achat, vous devez soit vous connecter à votre compte, soit continuer en tant qu&apos;invité.
          </p>

          <div className="flex w-full flex-col gap-4">
            <Link href={`/auth/signin?${params}`}>
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
    </div>
  );
};

export default function ChooseAuthPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ChooseAuthContent />
    </Suspense>
  );
}
