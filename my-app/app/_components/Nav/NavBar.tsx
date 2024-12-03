"use client";

import { useAnimation } from "@/app/AnimationContext";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BsBucketFill } from "react-icons/bs";
import {
  PiInstagramLogoFill,
  PiLinkedinLogoFill,
  PiYoutubeLogoFill,
} from "react-icons/pi";

const NavBar = () => {
  const [isSticky, setIsSticky] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const navLinksRef = useRef<(HTMLLIElement | null)[]>([]);
  const { isAnimating } = useAnimation();

  const path = usePathname();

  const navLinks = [
    { title: "Home", link: "/" },
    { title: "Offres", link: "/pricing" },
    { title: "Infos", link: "/infos" },
    { title: "Blog", link: "/blog" },
  ];

  const isHomePage = path === "/";

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // Si on descend la page, enlever sticky
      setIsSticky(false);
    } else {
      // Si on remonte la page, rendre la barre sticky
      setIsSticky(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    console.log(lastScrollY);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    if (isSticky) {
      gsap.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      });
    } else {
      gsap.to(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, [isSticky]);

  useEffect(() => {
    if (!isAnimating) {
      gsap.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.Out",
      });
    } else {
      gsap.to(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.Out",
      });
    }
  }, [isAnimating]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const socialIcons = [
    { icon: <PiYoutubeLogoFill size={20} />, label: "YouTube" },
    { icon: <PiInstagramLogoFill size={20} />, label: "Instagram" },
    { icon: <PiLinkedinLogoFill size={20} />, label: "LinkedIn" },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 z-50 flex w-screen items-center justify-between px-10 py-4 text-xl opacity-0 ${isHomePage ? "text-white" : ""} transition-all duration-200 ease-linear ${isSticky && window.scrollY !== 0 ? "nav-bg" : ""}`}
    >
      <div className="flex gap-4">
        <p className="font-semibold">SM Coaching</p>
        <div className="mt-4 flex items-center gap-4 md:mt-0">
          {socialIcons.map(({ icon, label }, idx) => (
            <span key={idx} aria-label={label}>
              {icon}
            </span>
          ))}
        </div>
      </div>
      <ul
        className={`${
          isSticky && window.scrollY === 0 ? "bg-[#d1d1d12b]" : ""
        } absolute left-1/2 flex -translate-x-1/2 justify-items-center overflow-hidden rounded-full`}
      >
        {navLinks.map((link, index) => (
          <li
            key={index}
            className={`cursor-pointer rounded-full px-4 py-2 transition-all duration-200 ease-linear ${
              hoveredIndex === index ? "black-glassmorph" : ""
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
      <div className="flex items-center gap-8">
        <button className="rounded-md bg-button px-2 py-1 text-base text-white">
          Calculer vos calories
        </button>
        <BsBucketFill color={`${isHomePage ? "white" : "black"}`} />
        <button className="">Log in</button>
      </div>
    </nav>
  );
};

export default NavBar;
