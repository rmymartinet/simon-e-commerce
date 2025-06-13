"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
const { useSession } = authClient;

interface AuthContextType {
  session: {
    user: {
      id: string;
      name: string;
      emailVerified: boolean;
      email: string;
      createdAt: Date;
      updatedAt: Date;
      image?: string | null;
    };
    session: {
      id: string;
      token: string;
      userId: string;
      expiresAt: Date;
      createdAt: Date;
      updatedAt: Date;
      ipAddress?: string | null;
      userAgent?: string | null;
    };
  } | null;
  isLoading: boolean;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: true,
  refreshSession: async () => {},
});

const REFRESH_DELAY = 5000; // 5 secondes entre chaque tentative
const MAX_RETRIES = 3;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const router = useRouter();

  const refreshSession = useCallback(async () => {
    if (retryCount >= MAX_RETRIES) {
      console.warn("Nombre maximum de tentatives atteint");
      return;
    }

    try {
      setIsLoading(true);
      if (typeof window !== "undefined") {
        await new Promise(resolve => setTimeout(resolve, REFRESH_DELAY));
        router.refresh();
        setRetryCount(prev => prev + 1);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la session:", error);
    } finally {
      setIsLoading(false);
    }
  }, [router, retryCount]);

  useEffect(() => {
    if (!isPending) {
      setIsLoading(false);
      setRetryCount(0); // Réinitialiser le compteur quand la session est chargée
    }
  }, [isPending]);

  // Réinitialiser le compteur toutes les 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setRetryCount(0);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ session, isLoading, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.displayName = "AuthProvider";

export const useAuth = () => useContext(AuthContext); 