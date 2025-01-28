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

gsap.registerPlugin(useGSAP);

const MobileNavComponent = ({ session }: { session: Session | null }) => {
  const navRef = useRef<HTMLDivElement | null>(null);
  const navLinksRef = useRef<(HTMLDivElement | null)[]>([]);
  const navRightRef = useRef<HTMLDivElement | null>(null);
  const [isClicked, setIsClicked] = useState(false);
  const socialIconRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const navActionRef = useRef<HTMLButtonElement | null>(null);

  const pathname = usePathname();
  const { width } = useWindowWidth();
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isDisplayNavBar =
    !/^\/studio/.test(pathname) &&
    pathname !== "/success" &&
    pathname !== "/cancel";

  const navLinks = [
    { title: "Home", link: "/" },
    { title: "Tarifs", link: "/pricing" },
    { title: "Infos", link: "/infos" },
    { title: "Blog", link: "/blog" },
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
    gsap.set(navActionRef.current, { opacity: 1 });
    gsap.set(socialIconRefs.current, { y: 100 });
  }, []);

  useGSAP(() => {
    gsap.to(navRef.current, {
      yPercent: !isClicked ? 0 : 100,
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

    gsap.to(navActionRef.current, {
      opacity: 1,
      duration: 0.5,
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
  }, [isClicked]);

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <>
      {isDisplayNavBar && width <= 1024 && (
        <>
          <button
            ref={navActionRef}
            onClick={handleClick}
            className="opacity-1 fixed right-5 top-10 z-[99999999] flex flex-col gap-2"
          >
            {!isClicked ? (
              <div className="flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-full border">
                <div className="h-[2px] w-4 rounded-full bg-white"></div>
                <div className="h-[2px] w-4 rounded-full bg-white"></div>
              </div>
            ) : (
              <div className="flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-full border">
                <IoClose className="text-xl" />
              </div>
            )}
          </button>
          <nav
            ref={navRef}
            className="fixed inset-0 z-[999999] flex h-[100dvh] w-screen -translate-y-[100%] flex-col bg-black px-10 text-white"
          >
            <div className="flex h-full flex-col items-center justify-center py-4">
              <div
                ref={navRightRef}
                className="mt-40 flex w-full items-center justify-between gap-6 text-xl"
              >
                <Link
                  href={session ? "/dashboard" : "/sign-in"}
                  className="relative flex items-center gap-8"
                >
                  <button onClick={() => setIsClicked(false)}>
                    <IoPerson className="text-3xl" />
                  </button>
                </Link>

                <Link href="/checkout">
                  <button
                    className="z-50 grid place-content-center"
                    onClick={() => setIsClicked(false)}
                  >
                    <FaCartShopping color="white" />
                  </button>
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
                        <p className="text-5xl">{link.title}</p>
                        <p className="text-2xl">0{index + 1}</p>
                      </div>
                    </Link>
                    <div
                      ref={(el) => {
                        lineRefs.current[index] = el;
                      }}
                      className="mt-4 h-[1px] w-0 bg-muted"
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
