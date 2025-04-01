"use client";

import { useEffect, useRef } from "react";
import FormCalories from "../_components/Calories/FormCalories";
import { useAnimation } from "../context/AnimationContext";
import gsap from "gsap";
import OffersOverview from "../_components/OffersOverview";

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
      className="mt-[30vh] flex min-h-screen flex-col items-center justify-center gap-20 overflow-hidden"
    >
      <div className="mb-8 flex w-full flex-col flex-wrap items-center justify-center gap-2">
        <span className="mb-10 text-sm uppercase text-gray-500">Calories</span>
        <h1 className="text-center text-xl font-semibold md:text-5xl">
          Calcul des besoins caloriques journaliers (TDEE).
        </h1>
        <p>
          Ce calculateur de macro est un outil unique qui permet de calculer tes
          apports caloriques personnalisés en fonction de tes dépenses
          énergiques et de ton alimentation.
        </p>
      </div>
      <FormCalories />
      <div className="flex w-full flex-col px-4">
        <h1 className="text-3xl md:text-4xl lg:text-7xl">
          Vous voulez gagner du temps ?
        </h1>
        <p className="font-medium text-muted md:text-xl">
          Vous vous êtes sûrement posé ces questions
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4">
          {questions.map((quesiton, index) => (
            <div
              key={index}
              className="flex w-full items-center gap-10 border-b border-muted py-8"
            >
              <p className="text-muted lg:text-3xl">0{index + 1}</p>
              <p className="lg:text-4xl">{quesiton}</p>{" "}
            </div>
          ))}
        </div>
      </div>
      <OffersOverview />
    </div>
  );
}
