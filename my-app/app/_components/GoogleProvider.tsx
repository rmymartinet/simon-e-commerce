"use client";

import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "../_lib/authAction";

function GoogleProvider() {
  return (
    <form action={() => signInWithGoogle()} className="w-full">
      <div className="flex justify-center gap-4 rounded-lg border border-slate-200 bg-white p-2">
        <FcGoogle size={30} />
        <button type="submit" className="text-black">
          Se connecter avec Google
        </button>
      </div>
    </form>
  );
}

export default GoogleProvider;
