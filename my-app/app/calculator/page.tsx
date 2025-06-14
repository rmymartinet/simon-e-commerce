"use client";

import { RefObject, useRef } from "react";
import TitleComponent from "@/components/TitleComponent";
import FormCalories from "@/components/Calories/FormCalories";
import AnimatedQuestions from "@/components/AnimatedQuestions";
import { useGSAP } from "@gsap/react";
import { animateBlockReveal } from "@/utils/Animation";
import CoachingsProgramsButtons from "@/components/CoachingsProgramsButtons";

export default function Calorie() {
  const containerRef = useRef(null);
  const calculatorContentRef = useRef(null);
  const questions = [
    "Comment perdre du poids ?",
    "Comment perdre du gras ?",
    "Comment gagner du muscle ?",
    "Perdre du gras et gagner du muscle ?",
    "Que manger pour maigrir ?",
    "Combien de calories manger ?",
    "Combien de protéines consommer ?",
    "Quel entraînement pour perdre du gras ?",
    "Faut-il faire du cardio ou de la musculation ?",
    "Comment éviter l’effet yoyo ?",
    "Quels aliments éviter pour sécher ?",
    "Faut-il manger le soir pour progresser ?",
    "Puis-je perdre du poids sans sport ?",
    "Comment suivre mes progrès efficacement ?",
    "Quelle routine alimentaire adopter ?",
    "Comment retrouver la motivation ?",
  ];

  useGSAP(() => {
    if (calculatorContentRef.current) {
      animateBlockReveal(calculatorContentRef as unknown as RefObject<HTMLDivElement>, 0.5);
    }
  }, []);


  return (
    <div
      ref={containerRef}
      className="mt-[25vh] flex min-h-screen flex-col items-center justify-center gap-20 overflow-hidden"
    >
      <TitleComponent
        titleIndication="Calories"
        title="Calcul des besoins caloriques journaliers (TDEE)."
        subtitle=" Ce calculateur de macro est un outil unique qui permet de calculer tes
          apports caloriques personnalisés en fonction de tes dépenses
          énergiques et de ton alimentation."
      />
   <div ref={calculatorContentRef} className="flex flex-col gap-4 items-center">
   <div className="flex gap-4">
 <CoachingsProgramsButtons variant="whiteBg"/>
     </div>
      <FormCalories />
      <div className="flex w-full flex-col items-center px-4">
        <TitleComponent
          title="Vous voulez gagner du temps ?"
          subtitle=" Vous vous êtes sûrement posé ces questions"
          isTextSplitLines={false}
        />
        <div className="flex gap-4">
  <CoachingsProgramsButtons variant="whiteBg"/>
</div>
        <AnimatedQuestions questions={questions} />
      </div>
   </div>
    </div>
  );
}
