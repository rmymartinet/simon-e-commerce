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
  const imgRef = useRef<HTMLImageElement>(null);

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

    gsap.to(imgRef.current, {
      scale: 1,
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top bottom",
        end: "bottom center",
      },
    });
  }, []);

  const { width } = useWindowWidth();

  return (
    <div className="mt-[20vh] flex w-full flex-col gap-20 px-4">
      <div className="mb-10 flex flex-col md:mb-20">
        <h1 className="text-pretty break-words text-3xl md:text-4xl lg:max-w-5xl lg:text-start lg:text-7xl">
          Un suivi nutritionnel personnalisé adapté à vos besoins
        </h1>
        <p className="font-medium text-muted md:text-3xl">
          Nous échangeons ensemble pour définir vos besoins, vos objectifs et
          toutes les spécificités de votre mode de vie. Chaque détail compte
          pour un accompagnement efficace et adapté.
        </p>
        <div className="mt-20 self-center">
          <Button href="/pricing" />
        </div>
      </div>
      <div className="flex flex-col gap-20 lg:grid lg:grid-cols-2">
        {width > 1024 && (
          <div className="">
            <p>( A effectuer )</p>
            <span className="max-w-lg text-light lg:text-[20vw]">01</span>
          </div>
        )}
        <div className="flex flex-col gap-8">
          <div className="flex justify-between">
            <p className="text-sm">Processus</p>
            <p className="text-sm">Mise en place</p>
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
      <div className="">
        {width > 1024 ? (
          <div className="grid grid-cols-2 items-center">
            <span className="max-w-lg text-light lg:text-[20vw]">02</span>
            <p className="text-7xl">
              ( Communiquer moi vos repas en temps réel )
            </p>
          </div>
        ) : (
          <div className="mb-10">
            <p className="text-3xl md:text-4xl">Repas en temps réel </p>
            <p className="font-medium text-muted md:text-3xl lg:text-center">
              Grâce à l’application Food, recevez vos repas et partagez vos
              ajustements en toute simplicité.
            </p>
          </div>
        )}
        <div className="h-[110vh]">
          <Image
            ref={imgRef}
            src="/images/food_app/iphone_food_app.png"
            alt="Food app"
            width={2000}
            height={2000}
            quality={100}
            className="h-full w-full scale-75 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default CoachingNutrition;
