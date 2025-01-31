"use client";

import React from "react";
import Guest from "@/app/_components/Guest";
import Link from "next/link";
import useWindowWidth from "@/hooks/useWindowWidth";
import Image from "next/image";
import SignInWrapper from "@/app/_components/SignInWrapper";

export default function Page() {
  const { width } = useWindowWidth();
  return (
    <div className="mt-6 flex h-screen flex-col items-center justify-center justify-items-center px-4 lg:mt-0 lg:grid lg:grid-cols-3">
      {width > 1024 && (
        <>
          <SignInWrapper />
          <div className="mb-6 mt-10 h-[1px] w-full bg-slate-400 lg:mt-0 lg:h-[40vh] lg:w-[1px]"></div>
          <Guest />
        </>
      )}

      {width <= 498 && (
        <>
          <Image
            src="/images/card_program/advanced.png"
            alt="simon profile"
            width={400}
            height={400}
            quality={100}
          />
          <div className="mb-6 mt-10 h-[1px] w-full bg-slate-400 lg:mt-0 lg:h-[40vh] lg:w-[1px]"></div>
          <div className="flex w-full flex-col gap-6">
            <Link href={"/sign-in"}>
              <button className="w-full rounded-full bg-violet-300 px-2 py-1 font-semibold lg:px-4 lg:py-2">
                Se connecter
              </button>
            </Link>
          </div>
          <Guest />
        </>
      )}
    </div>
  );
}
