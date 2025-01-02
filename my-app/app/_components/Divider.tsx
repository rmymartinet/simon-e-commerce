"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const Divider = ({
  bgColor,
  className,
}: {
  bgColor?: string;
  className?: string;
}) => {
  const dividerRef = useRef(null);

  useEffect(() => {
    gsap.to(dividerRef.current, {
      scaleX: 1,
      duration: 1.2,
      delay: 0,
      ease: "power3.inOut",
    });
  }, []);

  return (
    <div
      ref={dividerRef}
      className={`h-[1px] w-full scale-x-0 ${bgColor} ${className}`}
    />
  );
};

export default Divider;
