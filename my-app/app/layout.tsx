"use client";

import { useEffect } from "react";
import Footer from "./_components/Footer/Footer";
import NavBar from "./_components/Nav/NavBar";
import { AnimationProvider } from "./AnimationContext";
import { usePathname } from "next/navigation";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { CheckoutProvider } from "./context/CheckoutContext";
import useWindowWidth from "@/hooks/useWindowWidth";
import MobileNav from "./_components/Nav/MobileNav";
import MobileCart from "./_components/Cart/MobileCart";

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

  const { width } = useWindowWidth();

  return (
    <html lang="en">
      <body id="main-container" className="antialiased">
        <CartProvider>
          <CheckoutProvider>
            <AnimationProvider>
              {isDiplayNavBar && width < 1024 ? <MobileNav /> : <NavBar />}
              {isDiplayNavBar && width < 1024 && (
                <MobileCart
                  position="fixed"
                  xPostion="right-5"
                  yPostion="top-10"
                />
              )}
              {children}
              {pathname !== "/studio" && <Footer />}
            </AnimationProvider>
          </CheckoutProvider>
        </CartProvider>
      </body>
    </html>
  );
}
