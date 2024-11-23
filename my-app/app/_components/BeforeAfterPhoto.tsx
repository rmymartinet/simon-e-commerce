"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const BeforeAfterPhoto = () => {
  const chgRef = useRef<(HTMLDivElement | null)[]>([]);
  const names = ["Romain", "Léa", "Nathan", "Justine"];
  const imagesUrls = [
    {
      name: "romain",
      firstMoutnh: "1mois",
      lastMoutnh: "6mois",
      result: "- 4kg",
      before: "/images/before_after/romain/1.jpg",
      after: "/images/before_after/romain/2.jpg",
    },
    {
      name: "lea",
      firstMoutnh: "1mois",
      lastMoutnh: "4mois",
      result: "+ 3kg",
      before: "/images/before_after/lea/1.jpg",
      after: "/images/before_after/lea/2.jpg",
    },
    {
      name: "nathan",
      firstMoutnh: "1mois",
      lastMoutnh: "8mois",
      result: "+ 12kg",
      before: "/images/before_after/nathan/1.png",
      after: "/images/before_after/nathan/2.png",
    },
    {
      name: "justine",
      firstMoutnh: "1mois",
      lastMoutnh: "5mois",
      result: "- 8kg",
      before: "/images/before_after/justine/1.png",
      after: "/images/before_after/justine/2.png",
    },
  ];

  const namesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 });

    namesRef.current.forEach((el) => {
      if (el) {
        tl.fromTo(
          el,
          { opacity: 0, y: 100, rotate: 10 },
          {
            opacity: 1,
            rotate: 0,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
        );
        tl.to(el, {
          y: -100,
          opacity: 0,
          ease: "power2.out",
        });
      }
    });
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center p-6">
      <div className="relative mb-20 w-full justify-center gap-4 md:inline-flex lg:mb-40">
        <h1 className="text-4xl lg:text-6xl">Changer comme</h1>
        <div className="relative h-20 w-40 overflow-hidden pb-4 lg:w-72">
          {names.map((name, idx) => (
            <div
              key={idx}
              ref={(el) => {
                namesRef.current[idx] = el;
              }}
              className="absolute text-4xl lg:text-6xl"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
      <div className="flex h-full w-full flex-wrap items-center justify-center gap-10 lg:flex-nowrap">
        {names.map((_, index) => {
          const url = imagesUrls[index % imagesUrls.length];
          return (
            <div
              key={index}
              ref={(el) => {
                chgRef.current[index] = el;
              }}
              className="grid h-[300px] w-[300px] grid-cols-2 overflow-hidden rounded-xl"
            >
              <div className="flex flex-col items-center bg-black font-semibold text-white">
                <div className="py-2">
                  <span className="text-xl">{url.firstMoutnh}</span>
                </div>
                {url.before && (
                  <Image
                    src={url.before}
                    alt={`Image avant ${url.name}`}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col items-center bg-black font-semibold text-white">
                <div className="py-2">
                  <span className="text-xl">{url.lastMoutnh}</span>
                </div>
                {url.after && (
                  <Image
                    src={url.after}
                    alt={`Image après ${url.name}`}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BeforeAfterPhoto;
