"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function SignOutButton() {
  const router = useRouter();
  const { refreshSession } = useAuth();

  const handleSignOut = async () => {
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
    }
  };

  return (
    <Button variant="blackBg" className="w-full" onClick={handleSignOut}>
      Déconnexion
    </Button>
  );
} 