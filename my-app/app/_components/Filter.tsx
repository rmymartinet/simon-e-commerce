"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

interface FilterProps {
  filterName: string;
  setFilterName: (name: string) => void;
}

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
    <div className="relative grid grid-cols-2 justify-items-center gap-10 rounded-full shadow-inner px-4 py-4 overflow-hidden border ">
      <div
        ref={bgFilterRef}
        className="absolute bg-slate-300  w-1/2 h-full  rounded-full -z-10 shadow-md"
      ></div>
      <button
        className="text-black"
        onClick={() => setFilterName("programmes")}
      >
        Programmes
      </button>
      <button className="text-black" onClick={() => setFilterName("coaching")}>
        Coaching
      </button>
    </div>
  );
};

export default Filter;
