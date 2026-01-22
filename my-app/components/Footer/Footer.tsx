"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FooterLinks from "./FooterLinks";
import { FaArrowUp } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import BackgroundTransition from "../BackgroundTransition";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const pathname = usePathname();

  const isDisplayNavBar =
    !/^\/studio/.test(pathname) &&
    pathname !== "/success" &&
    pathname !== "/cancel" &&
    pathname !== "/checkout" &&
    pathname !== "/auth/signin" &&
    pathname !== "/auth/signup" &&
    pathname !== "/auth/reset-password" &&
    pathname !== "/auth/forget-password" &&
    pathname !== "/auth/compte" &&
    !pathname.startsWith("/compte");

  const footerContainerRef = useRef<HTMLDivElement>(null);
  const footerContentRef = useRef<HTMLDivElement>(null);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isDisplayNavBar && (
        <footer
          ref={footerContainerRef}
          className="relative flex min-h-[100dvh] flex-col justify-between overflow-hidden"
        >
          <BackgroundTransition orientation={180} yPosition="top-0" />
          <div className="pointer-events-none absolute -top-80 h-0 w-full">
            <div className="h-[100vh] w-full bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.25),_transparent_60%)]" />
          </div>
          <div
            ref={footerContentRef}
            className="flex min-h-[100dvh] flex-col justify-between px-4"
          >
            <div className="mt-4 flex w-full flex-col gap-20 text-sm md:grid md:grid-cols-3">
              <div className="flex flex-col gap-4 uppercase">
                <p className="text-gray-400">
                  Coaching personnalisé — en ligne
                </p>
                <span className="break-after-all whitespace-normal uppercase">
                  on t&apos;aide à transformer ton corps et ta discipline, grâce
                  à une méthode claire, humaine et adaptée à ton rythme.
                </span>
                <a
                  href="mailto:contact@smartinet-coaching.com"
                  className="underline"
                >
                  contact@smartinet-coaching.com
                </a>
              </div>
              <div className="m-auto flex gap-40">
                <FooterLinks />
              </div>
              <div className="flex flex-col gap-4 uppercase md:justify-self-end">
                <p className="text-gray-400">all right reserved 2025</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleBackToTop()}
                    className="uppercase"
                  >
                    Retour en haut
                  </button>
                  <FaArrowUp size={12} />
                </div>
                <p>privacy policy</p>
              </div>
            </div>
            <div className="relative mt-20 text-center text-[13vw] leading-none md:mt-0 md:text-[14vw]">
              <h1 className="font-extrabold uppercase leading-none text-primary">
                smcoaching
              </h1>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
