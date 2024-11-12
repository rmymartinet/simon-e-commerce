"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

const BeforeAfterPhoto = () => {
  const chgRef = useRef<(HTMLDivElement | null)[]>([]);
  const namesRef = useRef<HTMLHeadingElement>(null);
  const names = ["Romain", "Rémy", "Théo", "ANouk"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });

    chgRef.current.forEach((el, index) => {
      tl.fromTo(
        el,
        {
          rotate: 70,
          x: 2000,
          y: 2000,
        },
        {
          rotate: 0,
          x: 0,
          y: 0,
          duration: 1,
          ease: "power2.inOut",
          onStart: () => {
            setIndex(index);
            gsap.fromTo(
              namesRef.current,
              { y: 100, opacity: 0 },
              { y: 0, opacity: 1, duration: 1, ease: "power2.inOut" }
            );
          },
        }
      );
      tl.to(el, {
        delay: 2,
        rotate: -70,
        x: -2000,
        y: 1000,
        duration: 1,
        ease: "power2.inOut",
        onStart: () => {
          gsap.to(namesRef.current, {
            opacity: 0,
            duration: 1,
          });
        },
      });
    });
  }, [names.length]);

  return (
    <div className="overflow-hidden h-screen flex flex-col items-center justify-center p-6 relative bg-white">
      <div className="absolute top-0 left-0 m-6 inline-block gap-4">
        <h1 className="text-6xl">Changer comme</h1>
        <div className="overflow-hidden pb-4">
          <h1 ref={namesRef} className="text-6xl">
            {names[index]}
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center w-full h-full">
        {names.map((name, index) => (
          <div
            key={index}
            ref={(el) => {
              chgRef.current[index] = el;
            }}
            className="absolute w-[40vw] h-[40vh] grid grid-cols-2 justify-items-center items-end"
          >
            {name}
            <div className="bg-red-400">
              <span>0 mois</span>
            </div>
            <div className="bg-red-400">
              <span>6 mois</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeforeAfterPhoto;
