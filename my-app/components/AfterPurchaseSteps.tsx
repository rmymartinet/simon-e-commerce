import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import {  animateBlockRevealOnScroll } from "@/utils/Animation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const AfterPurchaseSteps = ({ data }: { data: { title: string; description: string }[] }) => {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const [dotPositions, setDotPositions] = useState<number[]>([]);

  useGSAP(() => {
    stepRefs.current.forEach((ref) => {
      if (ref) {
        animateBlockRevealOnScroll({ current: ref }, 0.2)
      }
    });

    if (lineRef.current) {
      gsap.to(
        lineRef.current,
        {
          height: "100%",
          duration: 1,
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top center",
            end: "bottom top",
            scrub: 4,
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    const positions = stepRefs.current.map(ref => {
      if (ref) {
        // Décale de 160px (top-40) pour aligner avec la ligne
        return ref.offsetTop + ref.offsetHeight / 2 + 120;
      }
      return 0;
    });
    setDotPositions(positions);
  }, [data.length]);

  return (
    <section className="relative flex flex-col items-center py-20 mt-20">
      <h2 className="mb-12 text-3xl md:text-5xl font-bold text-center">
        Que se passe-t-il après votre achat ?
      </h2>

      {/* Ligne verticale */}
      <div className="absolute left-1/2 top-40 bottom-10 w-[2px] -translate-x-1/2 border-l-[1px] border-dashed border-gray-600 z-0" />
      <div
        ref={lineRef}
        className="absolute left-1/2 top-40 w-[2px] -translate-x-1/2 bg-[--purple-color] z-10 h-0"
       
      />

      {/* Points sur la ligne centrale */}
      {dotPositions.map((top, idx) => (
        <div
          key={`dot-${idx}`}
          className="absolute left-1/2 -translate-x-1/2 z-20"
          style={{
            top: top ? `${top}px` : undefined,
            transition: "top 0.2s"
          }}
        >
          <div className="w-3 h-3 bg-violet-600 rounded-full" />
        </div>
      ))}

      <div className="relative flex flex-col gap-32 w-full z-20 max-w-6xl px-4">
        {data.map((step, idx) => (
          <div
            key={idx}
            ref={el => { stepRefs.current[idx] = el; }}
            className="relative flex flex-col md:flex-row items-center justify-between"
          >
            {/* Bloc gauche si impair */}
            {idx % 2 !== 0 && (
              <>
                <div className="hidden md:flex w-1/2 justify-end pr-10">
                  <div className="p-8 text-right">
                  <span className=" text-violet-600 text-2xl font-bold">
                    0{idx + 1}
                  </span>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 ">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </div>
                <div className="hidden md:flex w-1/2" />

              </>
            )}

            {/* Bloc droit si pair */}
            {idx % 2 === 0 && (
              <>
                <div className="hidden md:flex w-1/2" />
                <div className="hidden md:flex w-1/2 justify-end pl-10">
                  <div className="p-8">
                  <span className="text-violet-600 text-2xl font-bold">
                    0{idx + 1}
                  </span>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </div>
              </>
            )}

            {/* Mobile version */}
            <div className="md:hidden w-full text-center mt-6 z-50 bg-[--card-bg] rounded-xl p-2">
              <div className="p-6">
              <span className="text-violet-600 text-2xl font-bold">
                    0{idx + 1}
                  </span>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AfterPurchaseSteps;