import Script from "next/script";
import Footer from "@/components/Footer/Footer";
import LocomotiveScrollWrapper from "@/components/LocomotiveScrollWrapper";
import ConditionalNav from "@/components/Nav/ConditionalNav";
import Providers from "./providers";
import "../app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Smartinet Coaching</title>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
          strategy="afterInteractive"
        ></Script>
      </head>
      <body id="main-container" className="antialiased">
        <Providers>
          <ConditionalNav />
          <main className="pb-20">{children}</main>
        </Providers>
        <Footer />
        <LocomotiveScrollWrapper />
      </body>
    </html>
  );
}
