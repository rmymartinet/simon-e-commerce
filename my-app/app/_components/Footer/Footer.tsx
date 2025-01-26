"use client";

import useNavigation from "@/hooks/useNavigation";
import FooterContact from "./FooterContact";
import FooterLinks from "./FooterLinks";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const { handlePricingNavigation } = useNavigation();

  // Déplacer la logique dans le composant
  const isDisplayNavBar =
    !/^\/studio/.test(pathname) &&
    pathname !== "/success" &&
    pathname !== "/cancel";

  return (
    <>
      {isDisplayNavBar && (
        <footer className="relative mt-40 flex min-h-screen w-full flex-col justify-between">
          <h1 className="mt-40 text-center text-[calc(100vw/6.9)] font-bold uppercase text-[#151515]">
            sm coaching
          </h1>
          <div className="mb-20 mt-20 h-[1px] w-full bg-muted"></div>
          <div className="flex flex-col justify-between px-4">
            <div className="mb-[20vh] flex flex-col justify-between gap-20 lg:flex-row lg:gap-0">
              <div className="relative flex h-max flex-col gap-6">
                <h1 className="text-2xl font-medium md:text-3xl">
                  Commencer dès maintenant
                </h1>
                <button
                  onClick={handlePricingNavigation}
                  className="padding h-max w-max rounded-lg bg-button-gradient text-xl"
                >
                  Commencer
                </button>
              </div>
              <FooterLinks />
            </div>
          </div>
          <div className="flex justify-between px-4 pb-4 text-sm md:text-lg">
            <p className="uppercase">sm coaching ©2025</p>
            <p className="">All Rights Reserved</p>
            <p className="">Remonter</p>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
