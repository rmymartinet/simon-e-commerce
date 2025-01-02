import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import ColorShadowButton from "../ColorShadowButton";
import { data } from "@/app/data/nutritionAdviceData";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const NutritionAdvice = () => {
  const numsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    numsRefs.current.forEach((num) => {
      gsap.to(num, {
        scrollTrigger: {
          trigger: num,
          start: "top 80%",
          end: "bottom 80%",
          scrub: 1,
          once: false,
        },
        scale: 1.4,
        duration: 1,
        border: "1px solid violet",
      });
    });
  }, []);

  return (
    <div className="mt-[20vh] flex w-screen flex-col items-center gap-20">
      <div className="mb-20 flex flex-col items-center px-4 text-center md:mb-[10vh]">
        <h1 className="text-xl font-bold lg:text-3xl">
          Une nutrition adaptée pour des résultats durables
        </h1>
        <p className="font-medium text-subtle md:text-lg">
          Manger intelligemment, c’est 50% du chemin vers vos objectifs
        </p>
        <ColorShadowButton title="Voir les offres" color="#f690ff" />
      </div>
      <div className="relative flex flex-col items-center gap-20">
        {data.map((item, index) => (
          <div
            className="flex flex-col-reverse items-center gap-20 px-2 lg:grid lg:grid-cols-2 lg:px-40"
            key={index}
          >
            <div className="flex flex-col gap-2 text-center lg:text-start">
              <h1 className="text-2xl font-bold">{item.title}</h1>
              <p className="text-pretty break-words text-lg text-muted">
                {item.description}
              </p>
            </div>
            <div
              ref={(el) => {
                numsRefs.current[index] = el;
              }}
              className="grid h-10 w-10 place-content-center justify-self-end rounded-full border-card p-6"
            >
              <strong>{index + 1} </strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionAdvice;
