"use client";

import FooterLinks from "./FooterLinks";
import { usePathname } from "next/navigation";
import { FaArrowUp } from "react-icons/fa6";
import Button from "../Button";

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
        <footer className="relative mt-40 flex min-h-screen w-full flex-col justify-between">
          <div className="mb-20 mt-20 h-[1px] w-full bg-muted"></div>
          <div className="flex flex-col justify-between px-4">
            <div className="mb-[20vh] flex flex-col justify-between gap-20 lg:flex-row lg:gap-0">
              <div className="relative flex h-max flex-col gap-6">
                <h1 className="text-2xl font-medium md:text-3xl">
                  Commencer dès maintenant
                </h1>
                <Button href="/pricing" />
              </div>
              <FooterLinks />
            </div>
          </div>
          <div className="flex justify-between px-4 pb-4 text-sm md:text-lg">
            <p className="uppercase">sm coaching ©2025</p>
            <p className="">Tout droit reservé</p>
            <button
              className="flex items-center gap-2"
              onClick={handleBackToTop}
            >
              <p>Remonter</p>
              <FaArrowUp size={12} />
            </button>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
