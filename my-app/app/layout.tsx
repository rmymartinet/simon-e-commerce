// app/layout.tsx
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./context/CartContext";
import { CheckoutProvider } from "./context/CheckoutContext";
import { AnimationProvider } from "./context/AnimationContext";
import ConditionalNav from "./_components/Nav/ConditionalNav";
import Footer from "./_components/Footer/Footer";
import "./globals.css";
import { LayoutTransition } from "./_components/pageTransitions/LayoutTransition";
import LocomotiveScrollWrapper from "./_components/LocomotiveScrollWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <CartProvider>
        <CheckoutProvider>
          <AnimationProvider>
            <html lang="en">
              <body id="main-container" className="antialiased">
                <ConditionalNav />
                <LayoutTransition>{children}</LayoutTransition>
                <Footer />
                <LocomotiveScrollWrapper />
              </body>
            </html>
          </AnimationProvider>
        </CheckoutProvider>
      </CartProvider>
    </SessionProvider>
  );
}
