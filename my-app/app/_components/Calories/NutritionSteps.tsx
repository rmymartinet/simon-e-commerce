import StepCard from "./StepCard";
import MacroMicroTab from "./MacroMicroTab";
import RationTab from "./RationTab";
import MealsTab from "./MealsTab";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useWindowWidth from "@/app/hooks/useWindowWidth";
gsap.registerPlugin(ScrollTrigger);

const NutritionSteps = () => {
  const lineRef = useRef(null);
  const containerRef = useRef(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      step: "1",
      title: "Répartissez vos macros et micronutriments sur la journée",
      content:
        "Adaptez cette répartition à votre objectif (perte de poids, prise de masse, maintien) tout en tenant compte de votre emploi du temps et de votre mode de vie. Planifiez également vos repas pré- et post-entraînement pour optimiser vos performances. Pensez à intégrer des collations uniquement si elles sont compatibles avec votre quotidien.",
      children: <MacroMicroTab />,
    },
    {
      step: "2",
      title: "Réalisez des rations alimentaires équilibrées pour chaque repas",
      content:
        "Identifiez les aliments qui permettent d’atteindre vos besoins en macronutriments (glucides, protéines, lipides) et micronutriments pour chaque repas. Exemple : si votre petit-déjeuner doit contenir 200 g de glucides, sélectionnez des aliments pour atteindre ce total tout en respectant vos besoins en protéines et lipides.",
      children: <RationTab />,
    },
    {
      step: "3",
      title: "Réalisez vos menus",
      content:
        "Cette étape allie plaisir et pratique. Optez pour des recettes que vous aimez tout en restant aligné avec vos objectifs nutritionnels. Ajustez vos repas habituels pour tendre vers un équilibre alimentaire. Apprenez à préparer vos plats maison pour plus de contrôle ou anticipez avec du meal-prep.",
      children: <MealsTab />,
    },
  ];

  useEffect(() => {
    gsap.to(lineRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        scrub: 1,
      },
      height: "100%",
      duration: 1,
    });

    stepsRef.current.forEach((step) => {
      gsap.to(step, {
        scrollTrigger: {
          trigger: step,
          start: "top bottom",
          scrub: 1,
        },
        scale: 1,
        duration: 0.5,
      });
    });
  }, []);

  const { width } = useWindowWidth();

  return (
    <div
      ref={containerRef}
      className="relative mt-20 flex flex-col items-center gap-10"
    >
      <div
        ref={lineRef}
        className="absolute left-1/2 top-20 h-0 w-[1px] -translate-x-1/2 rounded-full bg-[#E0AAFF]"
      />
      <h1 className="text-6xl">Et maintenant ?</h1>
      <div className="flex w-screen flex-col items-center gap-20 lg:px-20">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div
              ref={(el) => {
                stepsRef.current[index] = el;
              }}
              className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 scale-0 bg-[#E0AAFF] opacity-50 blur-[100px]"
            ></div>
            <StepCard
              step={step.step}
              title={step.title}
              content={step.content}
            >
              {width > 498 && <div>{step.children}</div>}
            </StepCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionSteps;
