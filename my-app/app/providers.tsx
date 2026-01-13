"use client";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { CheckoutProvider } from "./context/CheckoutContext";
import { AnimationProvider } from "./context/AnimationContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <CheckoutProvider>
          <AnimationProvider>{children}</AnimationProvider>
        </CheckoutProvider>
      </CartProvider>
    </AuthProvider>
  );
}
