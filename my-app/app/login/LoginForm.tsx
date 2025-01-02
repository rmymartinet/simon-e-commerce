"use client";

import { login, signup } from "./actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { FaApple } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

export function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [state, loginAction] = useActionState(login, undefined);
  const [signupState, signupAction] = useActionState(signup, undefined);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="mb-10 text-2xl font-semibold">
        Se connecter à Sm coaching
      </h1>
      <div className="grid h-[6vh] w-full grid-cols-3 justify-items-center gap-4">
        <div className="grid w-full cursor-pointer place-content-center rounded-md border-card bg-[#18191A] hover:bg-[#292a2c]">
          <FaApple size={32} />
        </div>
        <div className="grid w-full cursor-pointer place-content-center rounded-md border-card bg-[#18191A] hover:bg-[#292a2c]">
          <FaGithub size={32} />
        </div>
        <div className="grid w-full cursor-pointer place-content-center rounded-md border-card bg-[#18191A] hover:bg-[#292a2c]">
          <FcGoogle size={32} />
        </div>
      </div>
      <p className="text-textOpacity">ou</p>
      <div className="flex w-full flex-col gap-8">
        {/* Affichage du formulaire en fonction de l'état */}
        {isLogin ? (
          <form action={loginAction} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <input
                id="email"
                name="email"
                placeholder="Email"
                className="rounded-md border-card bg-[#18191A] px-4 py-2 hover:border-[#5f5f5f] focus:outline-none"
              />
            </div>
            {state?.errors?.email && (
              <p className="text-red-500">{state.errors.email}</p>
            )}

            <div className="flex flex-col gap-2">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="rounded-md border-card bg-[#18191A] px-4 py-2 hover:border-[#5f5f5f] focus:outline-none"
              />
            </div>
            {state?.errors?.password && (
              <p className="text-red-500">{state.errors.password}</p>
            )}
            <SubmitButton isLogin={isLogin} />
          </form>
        ) : (
          <form action={signupAction} className="flex flex-col gap-6">
            <div>
              <input
                id="name"
                name="name"
                placeholder="Name"
                className="w-full rounded-md border-card bg-[#18191A] px-4 py-2 hover:border-[#5f5f5f] focus:outline-none"
              />
            </div>
            {signupState?.errors?.name && (
              <p className="text-red-500">{signupState.errors.email}</p>
            )}

            <div className="flex flex-col gap-2">
              <input
                id="email"
                name="email"
                placeholder="Email"
                className="rounded-md border-card bg-[#18191A] px-4 py-2 hover:border-[#5f5f5f] focus:outline-none"
              />
            </div>
            {signupState?.errors?.email && (
              <p className="text-red-500">{signupState.errors.email}</p>
            )}

            <div className="flex flex-col gap-2">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="rounded-md border-card bg-[#18191A] px-4 py-2 hover:border-[#5f5f5f] focus:outline-none"
              />
            </div>
            {signupState?.errors?.password && (
              <p className="text-red-500">{signupState.errors.password}</p>
            )}
            <SubmitButton isLogin={isLogin} />
          </form>
        )}
        {isLogin ? (
          <button
            onClick={() => setIsLogin(false)}
            className="rounded-md border-card bg-[#090A0B] px-4 py-3 font-bold"
          >
            Vous n&apos;avez pas de compte ? Inscrivez-vous
          </button>
        ) : (
          <button
            onClick={() => setIsLogin(true)}
            className="rounded-md border-card bg-[#090A0B] px-4 py-3 font-bold"
          >
            Vous avez déjà un compte ? Connectez-vous
          </button>
        )}
      </div>
    </div>
  );
}

function SubmitButton({ isLogin }: { isLogin: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="rounded-md bg-button-gradient px-4 py-2 font-bold text-white"
    >
      {isLogin ? "Se connecter" : "S'inscrire"}
    </button>
  );
}
