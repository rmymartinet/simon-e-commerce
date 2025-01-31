"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  PiInstagramLogoFill,
  PiLinkedinLogoFill,
  PiYoutubeLogoFill,
} from "react-icons/pi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AiFillTikTok } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { usePathname } from "next/navigation";
import useWindowWidth from "@/hooks/useWindowWidth";
import { Session } from "next-auth";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "@/app/context/CartContext";

gsap.registerPlugin(useGSAP);

const MobileNavComponent = ({ session }: { session: Session | null }) => {
  const navRef = useRef<HTMLDivElement | null>(null);
  const navLinksRef = useRef<(HTMLDivElement | null)[]>([]);
  const navRightRef = useRef<HTMLDivElement | null>(null);
  const [isClicked, setIsClicked] = useState(false);
  const socialIconRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const navActionRef = useRef<HTMLButtonElement | null>(null);
  const shoppingIconRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const cart = useCart();

  const pathname = usePathname();
  const { width } = useWindowWidth();
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isDisplayNavBar =
    !/^\/studio/.test(pathname) &&
    pathname !== "/success" &&
    pathname !== "/cancel";

  const numberOfProducts = cart.cart.length;

  const navLinks = [
    { title: "Home", link: "/" },
    { title: "Tarifs", link: "/pricing" },
    { title: "Infos", link: "/infos" },
    // { title: "Blog", link: "/blog" },
    { title: "Calories", link: "/calories" },
  ];

  const socialIcons = [
    {
      icon: <PiYoutubeLogoFill size={24} />,
      label: "YouTube",
      link: "https://www.youtube.com/channel/UC9ZJ3JY2JQzr3v7e7vJ1J8A",
    },
    {
      icon: <PiInstagramLogoFill size={24} />,
      label: "Instagram",
      link: "https://www.instagram.com/simonmrtz/",
    },
    {
      icon: <PiLinkedinLogoFill size={24} />,
      label: "LinkedIn",
      link: "https://www.instagram.com/simonmrtz/",
    },
    {
      icon: <AiFillTikTok size={24} />,
      label: "TikTok",
      link: "https://www.tiktok.com/@simonmrtnt",
    },
  ];

  useGSAP(() => {
    gsap.set(socialIconRefs.current, { y: 100 });
  }, []);

  useGSAP(() => {
    gsap.to(navRef.current, {
      yPercent: !isClicked ? 0 : 150,
      delay: !isClicked ? 0.3 : 0,
      duration: 0.8,
      ease: "power4.inOut",
    });

    gsap.to(lineRefs.current, {
      width: !isClicked ? 0 : "100%",
      delay: !isClicked ? 0 : 0.5,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.1,
    });

    gsap.to(navLinksRef.current, {
      y: !isClicked ? -50 : 0,
      delay: !isClicked ? 0 : 0.5,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.1,
    });

    gsap.to(socialIconRefs.current, {
      y: !isClicked ? -50 : 0,
      delay: !isClicked ? 0 : 0.5,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.1,
    });

    gsap.to(shoppingIconRef.current, {
      x: !isClicked ? 0 : -100,
      delay: !isClicked ? 0.8 : 0.2,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.to(menuRef.current, {
      x: !isClicked ? 0 : 100,
      delay: !isClicked ? 0.8 : 0.2,
      duration: 0.8,
      ease: "power2.out",
    });
  }, [isClicked]);

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <>
      {isDisplayNavBar && width <= 1024 && (
        <>
          <div className="opacity-1 fixed top-10 z-[9999] flex w-full items-center justify-between gap-2 px-4">
            <Link href="/checkout">
              <div
                ref={shoppingIconRef}
                className="relative flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-full border"
              >
                <button className="z-50 grid place-content-center">
                  <FaCartShopping color="white" />
                </button>
                {numberOfProducts > 0 && (
                  <div className="absolute -bottom-3 -right-2 grid h-4 w-4 place-content-center rounded-full bg-button-gradient p-3 text-sm font-bold text-white">
                    {numberOfProducts}
                  </div>
                )}
              </div>
            </Link>
            <button onClick={handleClick} className="flex flex-col gap-2">
              <div
                ref={menuRef}
                className="flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-full border"
              >
                <div className="h-[2px] w-4 rounded-full bg-white"></div>
                <div className="h-[2px] w-4 rounded-full bg-white"></div>
              </div>
            </button>
          </div>
          <nav
            ref={navRef}
            className="fixed inset-0 z-[999999] flex h-[100dvh] w-screen -translate-y-[150%] flex-col bg-black px-10 text-white"
          >
            <button
              ref={navActionRef}
              onClick={handleClick}
              className="flex flex-col gap-2"
            >
              {isClicked && (
                <div className="fixed right-4 top-10 grid h-10 w-10 flex-col place-content-center rounded-full border">
                  <IoClose className="text-xl" />
                </div>
              )}
            </button>
            <div className="flex h-full flex-col items-center justify-center py-4">
              <div
                ref={navRightRef}
                className="mb-8 mt-24 flex w-full items-center justify-between gap-6 text-xl"
              >
                <Link
                  href={session ? "/dashboard" : "/sign-in"}
                  className="relative flex items-center gap-8"
                >
                  <button onClick={() => setIsClicked(false)}>
                    <IoPerson className="text-xl" />
                  </button>
                </Link>
                <Link href="/checkout">
                  <div className="relative">
                    <button className="z-50 grid place-content-center">
                      <FaCartShopping color="white" className="text-xl" />
                    </button>
                    {numberOfProducts > 0 && (
                      <div className="absolute -bottom-3 -right-4 grid h-4 w-4 place-content-center rounded-full bg-button-gradient p-3 text-sm font-bold text-white">
                        {numberOfProducts}
                      </div>
                    )}
                  </div>
                </Link>
              </div>
              <ul className="flex h-full w-screen flex-col justify-center gap-10">
                {navLinks.map((link, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer overflow-hidden px-4 uppercase ${link.title === "Calories" ? "text-[#c4b5fd]" : "text-white"}`}
                    onClick={() => setIsClicked(false)}
                  >
                    <Link className="overflow-hidden" href={link.link}>
                      <div
                        ref={(el) => {
                          navLinksRef.current[index] = el;
                        }}
                        className="flex items-end justify-between"
                      >
                        <p className="text-2xl">{link.title}</p>
                        <p className="text-2xl">0{index + 1}</p>
                      </div>
                    </Link>
                    <div
                      ref={(el) => {
                        lineRefs.current[index] = el;
                      }}
                      className="mt-2 h-[1px] w-0 bg-muted"
                    ></div>
                  </li>
                ))}
              </ul>
              <div className="program-button-container flex w-full items-center justify-between gap-6 rounded-lg border border-[#3a3a3a]">
                <div className="padding flex w-full justify-between gap-6 overflow-hidden">
                  {socialIcons.map((icon, index) => (
                    <Link
                      href={icon.link}
                      key={index}
                      ref={(el) => {
                        socialIconRefs.current[index] = el;
                      }}
                      className="grid place-content-center"
                      title={icon.label}
                      onClick={() => setIsClicked(false)}
                    >
                      {icon.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default MobileNavComponent;
