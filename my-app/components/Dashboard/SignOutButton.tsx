"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";
import { Loader2 } from "lucide-react";

type Variant = "purpleBg" | "whiteBg";

export default function SignOutButton({ variant = "whiteBg" }: { variant?: Variant }) {
  const router = useRouter();
  const { refreshSession } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
      });
      
      if (!response.ok) throw new Error("Erreur lors de la déconnexion");
      
      await refreshSession();
      router.refresh();
      window.location.href = "/auth/signin";

    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant={variant}
        className="w-full"
        onClick={handleSignOut}
        disabled={loading}
      >
        {loading ? (
          <div className="flex flex-row items-center justify-center gap-x-2">
            <Loader2 size={16} className="animate-spin mr-2" />
            Déconnexion en cours...
          </div>
        ) : (
          "Déconnexion"
        )}
      </Button>
      {loading && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          style={{ cursor: "wait" }}
        >
          <div className="flex flex-col items-center gap-2">
            <Loader2 size={32} className="animate-spin text-white" />
            <span className="text-white font-semibold">Déconnexion en cours...</span>
          </div>
        </div>
      )}
    </>
  );
}   