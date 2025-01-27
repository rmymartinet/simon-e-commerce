"use client";

import { FilterProps } from "@/types/types";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const Filter = ({ filterName, setFilterName }: FilterProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bgFilterRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (filterName === "coaching") {
      gsap.to(bgFilterRef.current, {
        left: "50%",
        right: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(bgFilterRef.current, {
        left: 0,
        right: "50%",
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [filterName]);

  useGSAP(() => {
    gsap.set(containerRef.current, {
      xPercent: -200,
    });
    gsap.to(containerRef.current, {
      xPercent: 0,
      delay: 2,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative self-start overflow-hidden rounded-full border"
    >
      <div className="relative grid grid-cols-2 justify-items-center gap-10 px-4 py-2">
        <div
          ref={bgFilterRef}
          className="absolute z-10 h-full w-1/2 rounded-full bg-white"
        ></div>
        <button
          className={`z-[99] cursor-pointer ${filterName === "programmes" ? "text-black" : "text-white"} text-lg font-semibold`}
          onClick={() => setFilterName("programmes")}
        >
          Programmes
        </button>
        <button
          className={`z-[99] cursor-pointer ${filterName === "coaching" ? "text-black" : "text-white"} text-lg font-semibold`}
          onClick={() => setFilterName("coaching")}
        >
          Coaching
        </button>
      </div>
    </div>
  );
};

export default Filter;
