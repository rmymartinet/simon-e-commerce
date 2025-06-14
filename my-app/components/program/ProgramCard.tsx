// app/programs/ProgramCards.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import {  animateBlockRevealOnScroll } from "@/utils/Animation";

const PROGRAMS = [
  {
    level: "Débutant",
    src: "/images/card_program/beginner.png",
    alt: "Débutant",
  },
  {
    level: "Intermédiaire",
    src: "/images/card_program/intermediate.png",
    alt: "Intermédiaire",
  },
  {
    level: "Confirmé",
    src: "/images/card_program/advanced.png",
    alt: "Confirmé",
  },
];

const ProgramCards = () => {
  // Tableau de refs pour chaque carte
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    cardRefs.current.forEach((ref, idx) => {
      if (ref) animateBlockRevealOnScroll({ current: ref }, 0.2 * idx);
    });
  }, []);

  return (
    <div className="mt-20 flex flex-col gap-10 md:grid md:grid-cols-3">
      {PROGRAMS.map(({ level, src, alt }, idx) => (
        <div
          key={level}
          ref={(el) => {
            if (el) {
              cardRefs.current[idx] = el;
            }
          }}
          className="relative flex h-[500px] md:h-[700px] w-[400px] flex-col items-center justify-between gap-4 py-6"
        >
          <h3 className="text-center text-4xl font-semibold uppercase text-white">
            {level}
          </h3>
          <Image
            src={src}
            alt={alt}
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            width={350}
            height={350}
            quality={100}
            priority
          />
          <Button variant="whiteBg" className="w-max">Voir le programme</Button>
        </div>
      ))}
    </div>
  );
};

export default ProgramCards;