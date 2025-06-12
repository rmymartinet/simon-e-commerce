"use client";

import { createContext, useContext, useEffect, useState } from "react";
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const refreshSession = async () => {
    try {
      setIsLoading(true);
      if (typeof window !== "undefined") {
        router.refresh();
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isPending) {
      setIsLoading(false);
    }
  }, [isPending]);

  return (
    <AuthContext.Provider value={{ session, isLoading, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.displayName = "AuthProvider";

export const useAuth = () => useContext(AuthContext); 