"use client";

import { useEffect, useRef } from "react";
import FormCalories from "../_components/Calories/FormCalories";
import { useAnimation } from "../context/AnimationContext";
import gsap from "gsap";
import TitleComponent from "../_components/TitleComponent";
import AnimatedQuestions from "../_components/AnimatedQuestions";
import { Button } from "../_components/ui/button";

export default function Calorie() {
  const { isAnimating } = useAnimation();
  const containerRef = useRef(null);

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

  useEffect(() => {
    if (!isAnimating) {
      gsap.fromTo(
        containerRef.current,
        {
          y: 100,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
      );
    }
  }, [isAnimating]);

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
      <Button variant="blackBg">Découvrir nos offres</Button>
      <FormCalories />
      <div className="flex w-full flex-col items-center px-4">
        <TitleComponent
          title="Vous voulez gagner du temps ?"
          subtitle=" Vous vous êtes sûrement posé ces questions"
          isTextSplitLines={false}
        />
        <div className="mt-10">
          <Button variant="blackBg">Découvrir nos offres</Button>
        </div>
        <AnimatedQuestions questions={questions} />
      </div>
    </div>
  );
}
