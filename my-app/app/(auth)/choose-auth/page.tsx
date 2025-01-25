import React from "react";
import Guest from "@/app/_components/Guest";
import SignInForm from "../sign-in/page";

export default function page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center justify-items-center gap-20 lg:grid lg:grid-cols-3">
      <div className="flex flex-col gap-6">
        <h1 className="text-center text-3xl">
          Connectez-vous pour régler vos achats plus rapidement.
        </h1>
        <SignInForm />
      </div>
      <div className="mt-10 h-[1px] w-full bg-slate-400 lg:mt-0 lg:h-[40vh] lg:w-[1px]"></div>
      <Guest />
    </div>
  );
}
