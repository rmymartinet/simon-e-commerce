"use client";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { CheckoutProvider } from "./context/CheckoutContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <CheckoutProvider>{children}</CheckoutProvider>
      </CartProvider>
    </AuthProvider>
  );
}
