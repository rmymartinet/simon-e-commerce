"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { LiaArrowAltCircleRight } from "react-icons/lia";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import useWindowWidth from "@/hooks/useWindowWidth";
import { useCart } from "@/app/context/CartContext";
import { FaEdit } from "react-icons/fa";
import { useAuth } from "@/app/context/AuthContext";

gsap.registerPlugin(useGSAP);

const NavComponent = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<(HTMLDivElement | HTMLLIElement | null)[]>([]);
  const pathname = usePathname();
  const { width } = useWindowWidth();
  const cart = useCart();
  const { session } = useAuth();

  const numberOfProducts = cart.cart.length;

  const isDisplayNavBar =
    pathname !== "/success" &&
    pathname !== "/cancel";

  const navLinks = [
    { title: "Home", link: "/" },
    { title: "Programmes", link: "/programs" },
    { title: "Coachings", link: "/coachings" },
    { title: "Votre coach", link: "/votre-coach" },
    { title: "Blog", link: "/blog" },
    { title: "Calculateurs", link: "/calculator" },
  ];

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeaveNav = () => {
    setHoveredIndex(null);
  };

  useGSAP(() => {
    const items = navItemsRef.current;
    if (!items.length) return;

    if (hoveredIndex !== null) {
      gsap.to(items, {
        opacity: (i) => (i === hoveredIndex ? 1 : 0.3),
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(items, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [hoveredIndex]);

  return (
    <>
      {isDisplayNavBar && width > 1024 && (
        <nav onMouseLeave={handleMouseLeaveNav}>
          <div
            ref={navRef}
            className="fixed left-5 top-5 z-[9999] flex items-center overflow-hidden text-xl text-white mix-blend-difference"
          >
            <ul className="flex rounded-full">
              {navLinks.map((link, index) => (
                <li
                  key={index}
                  className="cursor-pointer px-4"
                  onMouseEnter={() => handleMouseEnter(index)}
                  ref={(el) => {
                    navItemsRef.current[index] = el;
                  }}
                >
                  <Link href={link.link}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="fixed right-5 top-5 z-[9999] flex items-center gap-6 text-xl text-white mix-blend-difference">
            {session && (
              <div
                className="flex cursor-pointer items-center gap-2"
                onMouseEnter={() => handleMouseEnter(navLinks.length)}
                ref={(el) => {
                  navItemsRef.current[navLinks.length] = el;
                }}
              >
                <FaEdit />
                <Link href="/studio">Gérer le blog</Link>
              </div>
            )}
            <div
              className="flex cursor-pointer items-center gap-2"
              onMouseEnter={() => handleMouseEnter(navLinks.length + 1)}
              ref={(el) => {
                navItemsRef.current[navLinks.length + 1] = el;
              }}
            >
              <LiaArrowAltCircleRight />
              <Link href={session ? `/auth/dashboard` : "/auth/signin"}>
                {session ? "Mon compte" : "Connexion"}
              </Link>
            </div>

            <div
              className="cursor-pointer"
              onMouseEnter={() => handleMouseEnter(navLinks.length + 2)}
              ref={(el) => {
                navItemsRef.current[navLinks.length + 2] = el;
              }}
            >
              <Link href="/checkout">
                Panier ({numberOfProducts > 0 ? ` ${numberOfProducts} ` : " 0 "}
                )
              </Link>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default NavComponent;
