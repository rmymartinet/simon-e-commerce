"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FooterLinks from "./FooterLinks";
import { FaArrowUp } from "react-icons/fa6";
import { usePathname } from "next/navigation";

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
    pathname !== "/auth/forgot-password" &&
    !pathname.startsWith("/dashboard");

  const footerContainerRef = useRef<HTMLDivElement>(null);
  const footerContentRef = useRef<HTMLDivElement>(null);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // useEffect(() => {
  //   if (!footerContainerRef.current || !footerContentRef.current) return;
  //   // Supprimer les anciens triggers liés à ce footer
  //   ScrollTrigger.getAll().forEach((trigger) => {
  //     if (trigger.trigger === footerContainerRef.current) {
  //       trigger.kill();
  //     }
  //   });

  //   // Position initiale
  //   gsap.set(footerContentRef.current, { y: -400 });

  //   // Nouvelle animation + scroll plus fluide et déclenché plus tôt
  //   gsap.fromTo(
  //     footerContentRef.current,
  //     { y: -400 },
  //     {
  //       y: 0,
  //       ease: "power4.out", // plus doux
  //       duration: 2,
  //       scrollTrigger: {
  //         trigger: footerContainerRef.current,
  //         start: "top+=200 bottom", // démarre plus tôt
  //         end: "top top",
  //         scrub: 1.5, // plus smooth
  //         anticipatePin: 1, // aide à lisser les débuts de scroll
  //       },
  //     },
  //   );

  //   return () => {
  //     // Nettoyage de l'animation
  //     gsap.killTweensOf(footerContentRef.current);
  //     gsap.killTweensOf(footerContainerRef.current);
  //     ScrollTrigger.refresh(); // rafraîchit les triggers
  //   };
  // }, []);

  return (
    <>
      {isDisplayNavBar && (
        <footer
          ref={footerContainerRef}
          className="-z-50 flex min-h-[100dvh] flex-col justify-between overflow-hidden bg-red-400 text-primary"
        >
          <div
            ref={footerContentRef}
            className="flex min-h-[100dvh] flex-col justify-between bg-secondary px-4 text-primary"
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
                <p className="underline">contact@smartinet-coaching.com</p>
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
                    back on top
                  </button>
                  <FaArrowUp size={12} />
                </div>
                <p>privacy policy</p>
              </div>
            </div>
            <div className="relative mt-20 text-center text-[13vw] leading-none md:mt-0 md:text-[14vw]">
              <h1 className="slice slice-top font-extrabold uppercase leading-none text-primary">
                smcoaching
              </h1>
              <h1 className="slice slice-mid font-extrabold uppercase leading-none text-primary">
                smcoaching
              </h1>
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
