"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsBucketFill } from "react-icons/bs";

const NavBar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const navLinksRef = useRef<(HTMLLIElement | null)[]>([]);

  const handleScroll = () => {
    // Si on remonte la page et qu'on n'est pas tout en haut, rendre la barre sticky
    if (window.scrollY < lastScrollY && window.scrollY !== 0) {
      setIsSticky(true);
    }
    // Si on est tout en haut, enlever sticky et le fond
    else if (window.scrollY === 0) {
      setIsSticky(false);
    }
    // Si on descend la page, enlever sticky
    else {
      setIsSticky(false);
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
    if (isSticky) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }
  }, [isSticky]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  const navLinks = [
    { title: "Home", link: "/" },
    { title: "Offres", link: "/pricing" },
    { title: "Infos", link: "/infos" },
    { title: "Blog", link: "/blog" },
  ];

  return (
    <nav
      ref={navRef}
      className={`w-screen px-10 flex justify-between text-xl z-50 mt-6 fixed top-0
      `}
    >
      <p className="font-semibold text-white">S'M Coaching</p>
      <ul className="flex gap-6 test text-white py-2 px-6 rounded-full border border-slate-400 shadow-inner">
        {navLinks.map((link, index) => (
          <li
            key={index}
            className={`cursor-pointer ${
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
      <div className="flex gap-8 items-center">
        <BsBucketFill color="white" />
        <button className="text-white">Log in</button>
      </div>
    </nav>
  );
};

export default NavBar;
