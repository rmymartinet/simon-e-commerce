import { AnimationProvider } from "./AnimationContext";
import { CartProvider } from "./context/CartContext";
import { CheckoutProvider } from "./context/CheckoutContext";
import { SessionProvider } from "next-auth/react";
import ConditionalNav from "./_components/Nav/ConditionalNav";
import Footer from "./_components/Footer/Footer";
import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useEffect(() => {
  //   (async () => {
  //     const LocomotiveScroll = (await import("locomotive-scroll")).default;
  //     new LocomotiveScroll();
  //   })();
  // }, []);

  return (
    <SessionProvider>
      <CartProvider>
        <CheckoutProvider>
          <AnimationProvider>
            <html lang="en">
              <body id="main-container" className="antialiased">
                <ConditionalNav />
                {children}
                <Footer />
              </body>
            </html>
          </AnimationProvider>
        </CheckoutProvider>
      </CartProvider>
    </SessionProvider>
  );
}
