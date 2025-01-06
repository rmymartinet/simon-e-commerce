"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  PiInstagramLogoFill,
  PiLinkedinLogoFill,
  PiYoutubeLogoFill,
} from "react-icons/pi";
import { FaCartShopping } from "react-icons/fa6";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AiFillTikTok } from "react-icons/ai";
import useAuth from "@/hooks/useAuth";
import { IoClose } from "react-icons/io5";
import MobileCart from "../Cart/MobileCart";
import { IoPerson } from "react-icons/io5";
import { set } from "sanity";

gsap.registerPlugin(useGSAP);

const MobileNav = () => {
  const navRef = useRef<HTMLDivElement | null>(null);
  const navLinksRef = useRef<(HTMLLIElement | null)[]>([]);
  const navRightRef = useRef<HTMLDivElement | null>(null);
  const [isClicked, setIsClicked] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsPanelRef = useRef<HTMLDivElement | null>(null);
  const socialIconRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { title: "Home", link: "/" },
    { title: "Offres", link: "/pricing" },
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

  useEffect(() => {
    gsap.set(navRef.current, { xPercent: -100 });
    gsap.set(socialIconRefs.current, { y: 100 });
  }, []);

  useEffect(() => {
    gsap.to(navRef.current, {
      xPercent: isClicked ? 0 : -100,
      duration: 1,
      ease: "power2.out",
    });
    gsap.to(navLinksRef.current, {
      x: isClicked ? 0 : -100,
      duration: 0.5,
      stagger: 0.1,
    });

    gsap.to(socialIconRefs.current, {
      y: isClicked ? 0 : 100,
      duration: 0.5,
      stagger: 0.1,
    });
  }, [isClicked]);

  useEffect(() => {
    gsap.set(settingsPanelRef.current, { scale: 0 });
    gsap.to(settingsPanelRef.current, {
      scale: isSettingsOpen ? 1 : 0,
      transformOrigin: "top left",
      duration: 0.5,
      ease: "power2.out",
    });
  }, [isSettingsOpen]);

  const handleSettingsAccount = () => {
    setIsSettingsOpen((prev) => !prev);
  };

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  const lastLinkTitle = navLinks.length - 1;
  console.log(lastLinkTitle);

  return (
    <section>
      <button
        onClick={handleClick}
        className="fixed left-5 top-10 z-[9999999] flex flex-col gap-2"
      >
        {!isClicked ? (
          <>
            <div className="h-[2px] w-10 rounded-full bg-white"></div>
            <div className="h-[2px] w-10 rounded-full bg-white"></div>
          </>
        ) : (
          <IoClose className="text-3xl" />
        )}
      </button>
      <nav
        ref={navRef}
        className="fixed inset-0 z-[999999] flex h-screen w-screen flex-col bg-black px-10 text-white"
      >
        <div className="flex h-full flex-col items-center justify-center py-4">
          <div
            ref={navRightRef}
            className="mt-40 flex w-full items-center justify-between gap-6 text-xl"
          >
            <div className="relative flex items-center gap-8">
              <div onClick={handleSettingsAccount}>
                <IoPerson className="text-3xl" />
              </div>
              <div
                ref={settingsPanelRef}
                className="absolute -bottom-[100px] flex w-max flex-col gap-2 rounded-xl bg-white p-6"
              >
                <Link
                  onClick={() => setIsClicked(false)}
                  href={isAuthenticated ? `/dashboard` : "/login"}
                  className="text-sm font-medium text-black"
                >
                  {isAuthenticated ? "Mon compte" : "Connexion"}
                </Link>
                <p className="text-sm font-medium text-black">Déconnexion</p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsClicked(false);
              }}
              className="z-50 grid place-content-center"
            >
              <MobileCart position="relative" />
            </button>
          </div>
          <ul className="flex h-full flex-col justify-center gap-10 px-40">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className={`cursor-pointer text-5xl font-semibold uppercase ${link.title === "Calories" ? "text-[#c4b5fd]" : "text-white"}`}
                onClick={() => setIsClicked(false)}
                ref={(el) => {
                  navLinksRef.current[index] = el;
                }}
              >
                <Link href={link.link}>{link.title}</Link>
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
    </section>
  );
};

export default MobileNav;
