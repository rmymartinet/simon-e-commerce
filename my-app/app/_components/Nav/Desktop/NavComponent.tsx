"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  PiInstagramLogoFill,
  PiLinkedinLogoFill,
  PiYoutubeLogoFill,
} from "react-icons/pi";
import { FaCartShopping } from "react-icons/fa6";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AiFillTikTok } from "react-icons/ai";
import { useCart } from "@/app/context/CartContext";
import CartSideBar from "../../Cart/CartSideBar";
import { Session } from "next-auth";
gsap.registerPlugin(useGSAP);

const NavComponent = ({ session }: { session: Session | null }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const navLinksRef = useRef<(HTMLLIElement | null)[]>([]);
  const navRightRef = useRef<HTMLDivElement | null>(null);

  const navLinks = [
    { title: "Home", link: "/" },
    { title: "Offres", link: "/pricing" },
    { title: "Infos", link: "/infos" },
    { title: "Blog", link: "/blog" },
  ];

  const { isOpen, setIsOpen } = useCart();

  const handleOpenCart = () => {
    setIsOpen(true);
  };

  useGSAP(() => {
    if (isOpen == false) {
      gsap.to(navRightRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(navRightRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [isOpen]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

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

  return (
    <nav>
      <div
        ref={navRef}
        className={`padding program-button-container fixed left-1/2 top-5 z-[9999] flex -translate-x-1/2 items-center overflow-hidden rounded-button border border-[#3a3a3a] text-xl`}
      >
        <ul className="flex rounded-full">
          {navLinks.map((link, index) => (
            <li
              key={index}
              className={`relative cursor-pointer px-4 transition-all duration-200 ease-linear ${
                hoveredIndex === index ? "scale-105" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              ref={(el) => {
                navLinksRef.current[index] = el;
              }}
            >
              <Link href={link.link}>{link.title}</Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <div className="ml-6 flex items-center gap-8">
            <Link
              href="/calorie"
              className="bg-button bg-button-gradient text-base font-medium text-white"
            >
              Calories
            </Link>
          </div>
        </div>
      </div>
      <CartSideBar />
      <div
        ref={navRightRef}
        className={`padding program-button-container fixed right-5 top-5 z-[9999] flex items-center gap-6 rounded-button border border-[#3a3a3a] text-xl`}
      >
        <div className="flex items-center gap-8 rounded-full bg-[#eee]">
          <Link
            href={session ? `/dashboard` : "/sign-in"}
            className="rounded-[0.675rem] bg-[#eee] px-[0.875rem] py-[0.625rem] text-base font-medium text-black"
          >
            {session ? "Mon compte" : "Connexion"}
          </Link>
        </div>
        <button
          onClick={handleOpenCart}
          className="z-50 grid place-content-center"
        >
          <FaCartShopping color="white" />
        </button>
      </div>
      <div
        className={`padding program-button-container fixed left-5 top-5 z-[9999] flex items-center gap-6 rounded-button border border-[#3a3a3a]`}
      >
        <div className="padding flex gap-6">
          {socialIcons.map((icon, index) => (
            <Link
              href={icon.link}
              key={index}
              className="grid place-content-center"
              title={icon.label}
            >
              {icon.icon}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavComponent;
