"use client";

import { useEffect } from "react";
import Footer from "./_components/Footer/Footer";
import NavBar from "./_components/Nav/NavBar";
import { AnimationProvider } from "./AnimationContext";
import { usePathname } from "next/navigation";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { CheckoutProvider } from "./context/CheckoutContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      new LocomotiveScroll();
    })();
  }, []);

  const pathname = usePathname();
  const isDiplayNavBar =
    pathname !== "/studio" &&
    pathname !== "/studio/preview" &&
    pathname !== "/success" &&
    pathname !== "/cancel";

  return (
    <html lang="en">
      <body id="main-container" className="antialiased">
        <CartProvider>
          <CheckoutProvider>
            <AnimationProvider>
              {isDiplayNavBar && <NavBar />}
              {children}
              {pathname !== "/studio" && <Footer />}
            </AnimationProvider>
          </CheckoutProvider>
        </CartProvider>
      </body>
    </html>
  );
}
