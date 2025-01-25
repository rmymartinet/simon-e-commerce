"use client";

import { CheckoutContextValue, CheckoutData } from "@/types/types";
import { createContext, useContext, useState, ReactNode } from "react";

// Définir le type des données dans le contexte

// Créer le contexte avec un type explicite
const CheckoutContext = createContext<CheckoutContextValue | undefined>(
  undefined,
);

// Provider pour envelopper l'application
export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);

  return (
    <CheckoutContext.Provider value={{ checkoutData, setCheckoutData }}>
      {children}
    </CheckoutContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};
