"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const BeforeAfterPhoto = () => {
  const chgRef = useRef<(HTMLDivElement | null)[]>([]);
  const names = ["Romain", "Rémy", "Théo", "Anouk"];
  const imagesUrls = ["/images/beforeafter/1.jpg", "/images/beforeafter/2.jpg"];
  const namesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 });

    namesRef.current.forEach((el, i) => {
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
          }
        ),
          tl.to(el, {
            y: -100,
            opacity: 0,
            ease: "power2.out",
          });
      }
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 relative pb-40 ">
      <div className="top-0 left-0 m-6 inline-flex gap-4 relative mb-40">
        <h1 className="text-6xl">Changer comme</h1>
        <div className="overflow-hidden h-20 w-72 relative pb-4">
          {names.map((name, idx) => (
            <div
              key={idx}
              ref={(el) => {
                namesRef.current[idx] = el;
              }}
              className="absolute text-6xl"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-10  items-center justify-center w-full h-full ">
        {names.map((name, index) => {
          const imagePair = imagesUrls.slice(index * 2, index * 2 + 2);
          return (
            <div
              key={index}
              ref={(el) => {
                chgRef.current[index] = el;
              }}
              className=" w-[18vw] grid grid-cols-2  rounded-xl overflow-hidden"
            >
              {imagesUrls.map((url, imageIndex) => (
                <div className="relative" key={imageIndex}>
                  <div className="absolute glassmorph text-white font-semibold w-full h-1/3 flex justify-center items-center">
                    6 mois
                  </div>
                  <Image
                    src={url}
                    alt={`Image ${imageIndex}`}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BeforeAfterPhoto;
