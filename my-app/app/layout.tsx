"use client";

import { useEffect } from "react";
import Footer from "./_components/Footer/Footer";
import NavBar from "./_components/Nav/NavBar";
import { AnimationProvider } from "./AnimationContext";
import "./globals.css";
import LoadingPage from "./_components/LoadingPage";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  return (
    <html lang="en">
      <body id="main-container" className="antialiased">
        <AnimationProvider>
          <LoadingPage />
          <NavBar />
          {children}
          <Footer />
        </AnimationProvider>
      </body>
    </html>
  );
}
