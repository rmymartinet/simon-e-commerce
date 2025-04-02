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
import Script from "next/script";

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
              <head>
                <Script
                  async
                  src="https://www.googletagmanager.com/gtag/js?id=G-NH0VPNGP9L"
                ></Script>
                <Script id="google-analytic">
                  {` 
                  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-NH0VPNGP9L');
  `}
                </Script>
              </head>
              <body id="main-container" className="antialiased">
                <ConditionalNav />
                {children}
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
