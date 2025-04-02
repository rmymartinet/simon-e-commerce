"use client";

import FooterLinks from "./FooterLinks";
import { usePathname } from "next/navigation";
import { FaArrowUp } from "react-icons/fa6";

const Footer = () => {
  const pathname = usePathname();

  // Déplacer la logique dans le composant
  const isDisplayNavBar =
    !/^\/studio/.test(pathname) &&
    pathname !== "/success" &&
    pathname !== "/cancel" &&
    pathname !== "/checkout";

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isDisplayNavBar && (
        <footer className="relative mt-40 flex min-h-[100dvh] flex-col justify-between px-4">
          <div className="mt-4 flex w-full flex-col gap-20 text-sm md:grid md:grid-cols-3">
            {/* <div className="flex flex-col gap-4 uppercase">
              <p className="text-gray-400">operating wordwide</p>
              <span className="break-after-all whitespace-normal uppercase">
                we connect ideas and people through immersive digital
                narratives. explore visual worlds crafted to captivate and
                resonate.
              </span>
              <p className="underline">contact@smartinet-coaching.com</p>
            </div> */}
            <div className="flex flex-col gap-4 uppercase">
              <p className="text-gray-400">Coaching personnalisé — en ligne</p>
              <span className="break-after-all whitespace-normal uppercase">
                on t&apos;aide à transformer ton corps et ta discipline, grâce à
                une méthode claire, humaine et adaptée à ton rythme.
              </span>
              <p className="underline">contact@smartinet-coaching.com</p>
            </div>
            <div className="m-auto flex gap-40">
              <FooterLinks />
            </div>
            <div className="flex flex-col gap-4 uppercase md:justify-self-end">
              <p className="text-gray-400">all right reserved 2025</p>
              <div className="flex items-center gap-2">
                <button onClick={() => handleBackToTop()} className="uppercase">
                  back on top
                </button>
                <FaArrowUp size={12} />
              </div>
              <p>privacy policy</p>
            </div>
          </div>
          <div className="relative mt-20 text-center text-[13vw] leading-none md:mt-0 md:text-[14vw]">
            <h1 className="slice slice-top font-extrabold uppercase leading-none text-white">
              smcoaching
            </h1>
            <h1 className="slice slice-mid font-extrabold uppercase leading-none text-white">
              smcoaching
            </h1>
            <h1 className="font-extrabold uppercase leading-none text-white">
              smcoaching
            </h1>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
