// app/layout.tsx
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./context/CartContext";
import { CheckoutProvider } from "./context/CheckoutContext";
import { AnimationProvider } from "./context/AnimationContext";

import "./globals.css";

import Script from "next/script";
import ConditionalNav from "@/components/Nav/ConditionalNav";
import { LayoutTransition } from "@/components/pageTransitions/LayoutTransition";
import Footer from "@/components/Footer/Footer";
import LocomotiveScrollWrapper from "@/components/LocomotiveScrollWrapper";
import { Analytics } from "@vercel/analytics/react";

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
                <Analytics />
                <ConditionalNav />
                <LayoutTransition>
                  <main className="pb-20">{children}</main>
                </LayoutTransition>
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
