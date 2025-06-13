import { useGSAP } from "@gsap/react";
import { textSplitLines } from "@/utils/common/textAnimation";
import gsap from "gsap";
import { useRef } from "react";
import Image from "next/image";
import TitleComponent from "../TitleComponent";
import { Button } from "../ui/button";
import BackgroundRadialColor from "../BackgroundRadialColor";

gsap.registerPlugin(useGSAP);

const ProgramOverview = () => {
  const titlesContainerRef = useRef<HTMLDivElement>(null);
  const programContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    textSplitLines(titlesContainerRef as React.RefObject<HTMLElement>);

    gsap.from(programContainerRef.current, {
      y: 400,
      filter: "blur(70px)",
      duration: 1,
      ease: "power2.Out",
      opacity: 0,
    });
  }, []);

  return (
    <section
      ref={programContainerRef}
      className="flex w-screen max-w-[90vw] flex-col items-center overflow-hidden rounded-3xl px-4 py-20"
    >
      <BackgroundRadialColor />
      <TitleComponent
        title="Des programmes sur mesure selon ton niveau"
        titleIndication="programmes"
        subtitle="Que tu sois débutant, intermédiaire ou avancé, tu peux progresser à ton rythme avec un plan adapté à ton niveau, à ta disponibilité, et à ton objectif."
      />

      <div className="mt-20 flex flex-col gap-10 md:grid md:grid-cols-3">
        {[
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
        ].map(({ level, src, alt }) => (
          <div
            key={level}
            className="relative flex h-[500px] md:h-[700px] w-[400px]  flex-col items-center justify-between gap-4 py-6"
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
            <Button variant="blackBg">Voir le programme</Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProgramOverview;
