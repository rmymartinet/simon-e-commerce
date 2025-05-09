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
      yPercent: 200,
      filter: "blur(70px)",
    });
    gsap.to(containerRef.current, {
      yPercent: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-full border border-[--border-color] bg-[--bg-color]"
    >
      <div className="relative grid grid-cols-2 justify-items-center gap-10 px-2 py-1 lg:px-4 lg:py-2">
        <div
          ref={bgFilterRef}
          className="absolute z-10 h-full w-1/2 rounded-full bg-violet-600"
        ></div>
        <button
          className={`z-[99] cursor-pointer font-semibold md:text-lg`}
          onClick={() => setFilterName("programmes")}
        >
          Programmes
        </button>
        <button
          className={`z-[99] cursor-pointer font-semibold md:text-lg`}
          onClick={() => setFilterName("coaching")}
        >
          Coaching
        </button>
      </div>
    </div>
  );
};

export default Filter;
