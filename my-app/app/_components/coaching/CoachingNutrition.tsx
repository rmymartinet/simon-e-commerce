import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { coachingNutritionData } from "@/app/data/coachingNutritionData";
import Accordion from "../Accordion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useWindowWidth from "@/hooks/useWindowWidth";
import Link from "next/link";
import { Button } from "../ui/button";

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
    <div className="flex w-full flex-col gap-20 bg-foreground px-4 pb-40 text-background">
      <div className="mb-10 flex flex-col items-center text-start md:mb-20 md:text-center">
        <h1 className="text-pretty break-words text-3xl md:text-4xl lg:max-w-6xl">
          Un suivi nutritionnel personnalisé adapté à vos besoins
        </h1>
        <p className="font-medium text-[--subtext] md:max-w-5xl md:text-xl">
          Nous échangeons ensemble pour définir vos besoins, vos objectifs et
          toutes les spécificités de votre mode de vie. Chaque détail compte
          pour un accompagnement efficace et adapté.
        </p>
        <div className="mt-20 self-center">
          <Button variant={"blackBg"}>
            <Link href="/pricing">Découvrir</Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-20 lg:grid lg:grid-cols-2">
        {width > 1024 && (
          <span className="max-w-lg text-[#E0E0E0] lg:text-[35vw]">01</span>
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
            <span className="max-w-lg text-light lg:text-[35vw]">02</span>
            <div>
              {" "}
              <h2 className="text-4xl">
                Communiquez moi vos repas en temps réel
              </h2>
              <p className="max-w-5xl font-medium text-muted md:text-xl">
                Je vous transmets votre plan alimentaire directement dans
                l’application Food. Vous pouvez ensuite l’ajuster selon votre
                rythme de vie, et je m’assure derrière que tout est bien
                optimisé pour vous. Un suivi flexible et personnalisé, au plus
                proche de vos besoins
              </p>
            </div>
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
      </div>
    </div>
  );
};

export default CoachingNutrition;
