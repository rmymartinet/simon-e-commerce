import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { FaCheck } from "react-icons/fa6";
import gsap from "gsap";
import PurpleLight from "../PurpleLight";
import { checkData } from "@/app/data/coachingNutritionData";

gsap.registerPlugin(useGSAP);

const CoachingNutrition = () => {
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const checkRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wordsRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 2,
      repeat: -1,
      repeatDelay: 1,
    });

    wordsRefs.current.forEach((word) => {
      tl.to(word, {
        color: "#6e7681", // Mot passe à blanc
        duration: 1,
        ease: "power2.out",
      }).to(word, {
        color: "#4ade80", // Retour à la couleur initiale
        duration: 1,
        ease: "power2.out",
      });
    });

    gsap.to(textRefs.current, {
      color: "white",
      delay: 2,
      stagger: 2,
      duration: 1,
      ease: "power2.out",
      repeat: -1,
      repeatDelay: 2,
    });

    gsap.to(checkRefs.current, {
      delay: 2,
      stagger: 2,
      duration: 1,
      scale: 1.1,
      ease: "power2.out",
      repeat: -1,
      repeatDelay: 2,
      color: "green",
    });
  }, []);

  return (
    <section className="relative mt-[20vh] flex w-screen flex-col items-center gap-20">
      <PurpleLight
        yposition="top-0"
        xposition="right-0"
        height="h-full"
        width="w-[30%]"
      />
      <div className="mb-10 flex flex-col items-center">
        <h1 className="text-xl font-bold lg:text-3xl">
          Un suivi nutritionnel personnalisé
        </h1>
        <p className="px-2 text-center font-medium text-subtle lg:text-lg">
          Une approche sur-mesure, ajustée à votre mode de vie et à vos
          préférences alimentaires
        </p>
      </div>
      <div className="flex flex-col items-center justify-items-end gap-20 lg:grid lg:grid-cols-2">
        <div className="text-pretty break-words text-center text-lg text-white md:text-start lg:w-[40vw] lg:text-2xl">
          <p className="px-2 text-muted">
            Chacun a des besoins nutritionnels différents. Que vous cherchiez à{" "}
            <span
              ref={(el) => {
                wordsRefs.current[0] = el;
              }}
            >
              perdre du poids
            </span>
            , à développer votre{" "}
            <span
              ref={(el) => {
                wordsRefs.current[1] = el;
              }}
            >
              masse musculaire
            </span>{" "}
            ou à adopter une alimentation plus{" "}
            <span
              ref={(el) => {
                wordsRefs.current[2] = el;
              }}
            >
              équilibrée
            </span>
            , je vous accompagne avec des conseils adaptés à{" "}
            <span
              ref={(el) => {
                wordsRefs.current[3] = el;
              }}
            >
              vos besoins
            </span>{" "}
            et votre mode de vie.
          </p>
        </div>
        <div className="card relative flex h-[40vh] w-max flex-col items-center overflow-hidden rounded-xl p-6 pr-20">
          <div className="radial-bg absolute -bottom-[200px] -right-[0px] h-full w-full rotate-[180deg]"></div>

          <h1 className="z-10 text-2xl font-bold">
            Un suivi optimisé pour vous{" "}
          </h1>
          <div className="z-10 mt-10 flex flex-col gap-4 self-start">
            {checkData.map((data, index) => (
              <div key={index} className="flex items-center gap-4 text-white">
                <div
                  ref={(el) => {
                    checkRefs.current[index] = el;
                  }}
                  className="grid place-content-center rounded-full border-card p-2"
                >
                  <FaCheck />
                </div>
                <p
                  ref={(el) => {
                    textRefs.current[index] = el;
                  }}
                  className="text-md font-semibold"
                >
                  {data}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachingNutrition;
