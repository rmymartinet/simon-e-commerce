"use client";

import { FilterProps } from "@/types/types";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const Filter = ({ filterName, setFilterName }: FilterProps) => {
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

  return (
    <div className="card relative overflow-hidden rounded-full p-2">
      <div className="relative grid grid-cols-2 justify-items-center gap-10 p-4">
        <div
          ref={bgFilterRef}
          className="bg-button-gradient absolute z-10 h-full w-1/2 rounded-full"
        ></div>
        <button
          className={`z-[99] cursor-pointer text-textOpacity ${filterName === "programmes" ? "font-bold text-white" : "font-medium"}`}
          onClick={() => setFilterName("programmes")}
        >
          Programmes
        </button>
        <button
          className={`z-[99] cursor-pointer text-slate-600 ${filterName === "coaching" ? "font-bold text-white" : "font-medium"}`}
          onClick={() => setFilterName("coaching")}
        >
          Coaching
        </button>
      </div>
    </div>
  );
};

export default Filter;
