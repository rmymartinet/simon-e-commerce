"use client";

import NavBar from "./Desktop/NavBar";
import MobileNav from "./Mobile/MobileNav";
import useWindowWidth from "@/hooks/useWindowWidth";

export default function ConditionalNav() {
  const { width } = useWindowWidth();
  const isMobile = width <= 1024; 

  return isMobile ? <MobileNav /> : <NavBar />;
}
