"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import FormCalories from "../_components/Calories/FormCalories";
import NutritionSteps from "../_components/Calories/NutritionSteps";
import Question from "../_components/Calories/Questions";
import AvailableOffers from "../_components/AvailableOffers";
import { coachingIncludes9Mounth, programIncludes } from "../data/cardPrice";
import { useAnimation } from "../AnimationContext";
import gsap from "gsap";

export default function Calorie() {
  const [genre, setGenre] = useState("female");
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [targetWeight, setTargetWeight] = useState(0);
  const [activities, setActivities] = useState("");
  const [goals, setGoals] = useState("");
  const [weightChange, setWeightChange] = useState(0.5);
  const { isAnimating } = useAnimation();
  const containerRef = useRef(null);

  const calculateBMR = (
    weight: number,
    height: number,
    age: number,
    genre: string,
  ) => {
    const femaleBMR = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    const maleBMR = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    return genre === "female" ? femaleBMR : maleBMR;
  };

  const calculateTotalCalories = (
    BMR: number,
    activities: string,
    goals: string,
    weightChange: number,
  ) => {
    const TDEE = BMR * Number(activities);
    const dailyAdjustment = (weightChange * 7700) / 7;

    let adjustedCalories;

    switch (goals) {
      case "maintien":
        adjustedCalories = TDEE; // Pas de changement pour maintenir le poids
        break;
      case "gain":
        adjustedCalories = TDEE + dailyAdjustment;
        break;
      case "perte":
        adjustedCalories = TDEE - dailyAdjustment;
        break;
      default:
        adjustedCalories = TDEE; // Valeur par défaut si l'objectif n'est pas reconnu
    }

    return adjustedCalories;
  };

  const calculateGrams = (totalCalories: number) => {
    const percentages = {
      carbs: {
        min: totalCalories * 0.45,
        max: totalCalories * 0.65,
      },
      proteins: {
        min: totalCalories * 0.1,
        max: totalCalories * 0.35,
      },
      fats: {
        min: totalCalories * 0.2,
        max: totalCalories * 0.35,
      },
    };

    return {
      carbs: {
        min: Number((percentages.carbs.min / 4).toFixed(0)),
        max: Number((percentages.carbs.max / 4).toFixed(0)),
      },
      proteins: {
        min: Number((percentages.proteins.min / 4).toFixed(0)),
        max: Number((percentages.proteins.max / 4).toFixed(0)),
      },
      fats: {
        min: Number((percentages.fats.min / 9).toFixed(0)),
        max: Number((percentages.fats.max / 9).toFixed(0)),
      },
    };
  };

  const BMR = useMemo(
    () => calculateBMR(weight, height, age, genre),
    [weight, height, age, genre],
  );
  const totalCalories = useMemo(
    () => calculateTotalCalories(BMR, activities, goals, weightChange),
    [BMR, activities, goals, weightChange],
  );
  const grams = useMemo(() => calculateGrams(totalCalories), [totalCalories]);

  const data = {
    grams,
    totalCalories: Number(totalCalories.toFixed(0)),
    BMR: Number(BMR.toFixed(2)),
  };

  const inputState = {
    setGenre,
    age,
    setAge,
    height,
    setHeight,
    weight,
    setWeight,
    targetWeight,
    setTargetWeight,
    activities,
    setActivities,
    goals,
    setGoals,
    setWeightChange,
    weightChange,
  };

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
      className="mt-40 flex min-h-screen flex-col items-center justify-center gap-20 overflow-hidden"
    >
      <FormCalories data={data} inputData={inputState} />
      <NutritionSteps />
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center text-4xl lg:text-5xl">
            Vous voulez gagner du temps ?
          </h1>
          <span className="text-center text-slate-400">
            Vous vous êtes sûrement posé ces questions
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 px-20 text-sm">
          <Question question="Comment perdre du poids ?" />
          <Question question="Comment perdre du gras ?" />
          <Question question="Comment gagner du muscle ?" />
          <Question question="Perdre du gras et gagner du muscle ?" />
          <Question question="Que manger pour maigrir ?" />
          <Question question="Combien de calories manger ?" />
          <Question question="Combien de protéines consommer ?" />
        </div>
        <div className="mt-20 flex flex-col gap-10 lg:flex-row lg:gap-40">
          <AvailableOffers
            title="Programmes"
            follow="Sans suivi"
            subtitle="Adapté à votre niveau"
            features={programIncludes}
          />
          <AvailableOffers
            title="Coaching"
            follow="Avec suivi"
            subtitle="Suivi sur mesure"
            features={coachingIncludes9Mounth}
          />
        </div>
      </div>
    </div>
  );
}
