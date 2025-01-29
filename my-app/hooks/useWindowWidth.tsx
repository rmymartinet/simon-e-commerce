"use client";

import { useLayoutEffect, useState } from "react";

export default function useWindowWidth() {
  const [width, setWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWidth(window.innerWidth);

      handleResize();
      setIsMounted(true);

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return { width, isMounted };
}
