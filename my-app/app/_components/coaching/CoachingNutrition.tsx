import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { coachingNutritionData } from "@/app/data/coachingNutritionData";
import Accordion from "../Accordion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

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

  return (
    <div className="flex w-full flex-col gap-20 bg-foreground pb-40 text-background md:px-40">
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
      <div className="flex flex-col items-center gap-20">
        <div className="z-50 flex flex-col gap-8">
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
      <div className="flex flex-col-reverse items-center gap-10 md:grid md:grid-cols-2 md:gap-20 lg:gap-32">
        <div className="flex flex-col items-start gap-6 text-left">
          <h2 className="text-3xl font-bold md:text-4xl">
            Repas en temps réel
          </h2>
          <p className="text-base leading-relaxed text-[--subtext] md:text-lg">
            Grâce à l’application{" "}
            <span className="font-semibold text-white">Food</span>, tu reçois
            ton plan nutritionnel{" "}
            <span className="font-semibold text-white">
              directement sur ton téléphone
            </span>
            . Tu peux ensuite me partager tes repas, tes ressentis ou tes
            ajustements en un clic.
          </p>
          <p className="text-base leading-relaxed text-[--subtext] md:text-lg">
            Je vois tout en direct, et je peux adapter ton programme
            nutritionnel au fil des jours. C’est un{" "}
            <span className="font-semibold text-white">
              suivi 100% personnalisé
            </span>
            , sans prise de tête.
          </p>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-sm rounded-2xl border border-[--border-color] bg-white p-4 shadow-xl">
            <Image
              src="/images/food_app/iphone_food_app.png"
              alt="Aperçu repas en direct"
              width={1000}
              height={1000}
              quality={100}
              className="h-auto w-full rounded-xl object-contain"
            />
            <p className="absolute bottom-2 right-4 text-xs italic text-[--subtext]">
              Mockup de l’application Food
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachingNutrition;
