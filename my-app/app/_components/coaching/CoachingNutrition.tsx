import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { coachingNutritionData } from "@/app/data/coachingNutritionData";
import Accordion from "../Accordion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import useWindowWidth from "@/hooks/useWindowWidth";
import Button from "../Button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CoachingNutrition = () => {
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    lineRefs.current.forEach((el) => {
      gsap.to(el, {
        width: "100%",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          once: true,
        },
      });
    });
  }, []);

  const { width } = useWindowWidth();

  return (
    <div className="mt-[20vh] flex w-full flex-col gap-20 px-4">
      <div className="mb-10 flex flex-col gap-20 md:mb-20">
        <p className="max-w-5xl text-pretty break-words text-3xl lg:text-7xl">
          Un suivi nutritionnels personnalisé adpaté à vos besoins
        </p>
        <div className="self-center">
          <Button href="/pricing" />
        </div>
      </div>
      <div className="flex flex-col gap-20 lg:grid lg:grid-cols-2">
        {width > 1024 && (
          <div className="border-2 border-red-400">
            <p>( A effectuer )</p>
            <span className="max-w-lg text-light lg:text-[20vw]">01</span>
          </div>
        )}
        <div className="flex flex-col gap-8">
          <div className="flex justify-between">
            <p className="text-xl">Processus</p>
            <p className="text-xl">Mise en place</p>
          </div>
          <div>
            {coachingNutritionData.map((item, index) => (
              <div key={index}>
                <div className="h-[2px] bg-[#27262a]">
                  <div
                    ref={(el) => {
                      lineRefs.current[index] = el;
                    }}
                    className="h-full w-0 bg-muted"
                  ></div>
                </div>
                <Accordion
                  index={index}
                  title={item.title}
                  text={item.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2">
        {width > 1024 && (
          <div>
            <p className="text-3xl">( Communiquer en tant reel )</p>
            <span className="max-w-lg text-light lg:text-[20vw]">02</span>
          </div>
        )}
        <div>
          <Image
            src=""
            alt="Food app"
            width={400}
            height={400}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default CoachingNutrition;
