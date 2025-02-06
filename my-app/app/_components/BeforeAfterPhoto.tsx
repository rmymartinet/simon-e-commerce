"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { imagesUrls, names } from "../data/beforeAfterPhotoData";

gsap.registerPlugin(useGSAP);

const BeforeAfterPhoto = () => {
  const chgRef = useRef<(HTMLDivElement | null)[]>([]);
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
    <div className="relative mt-[20vh] flex w-full flex-col items-center justify-center p-4">
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
      <div className="relative flex h-full w-full flex-wrap justify-evenly gap-10 overflow-hidden rounded-xl">
        {names.map((_, index) => {
          const url = imagesUrls[index % imagesUrls.length];
          return (
            <div
              key={index}
              ref={(el) => {
                chgRef.current[index] = el;
              }}
              className="grid h-[350px] w-[300px] cursor-pointer grid-cols-2 overflow-hidden rounded-xl"
            >
              <div className="flex flex-col items-center bg-black font-semibold text-white">
                <div className="flex w-full flex-col gap-2 py-2">
                  <span className="border-b border-slate-400 pb-2 text-center text-xl">
                    {url.firstMoutnh}
                  </span>
                  <span className="text-center text-xl">Résultats:</span>
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
                <div className="flex w-full flex-col gap-2 py-2">
                  <span className="border-b border-slate-400 pb-2 text-center text-xl">
                    {url.lastMoutnh}
                  </span>
                  <span className="text-center text-xl">{url.result}</span>
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
