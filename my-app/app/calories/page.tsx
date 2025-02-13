"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import FormCalories from "../_components/Calories/FormCalories";
import { useAnimation } from "../context/AnimationContext";
import gsap from "gsap";
import OffersOverview from "../_components/OffersOverview";

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
  const [showResults, setShowResults] = useState(false);

  const questions = [
    "Comment perdre du poids ?",
    "Comment perdre du gras ?",
    "Comment gagner du muscle ?",
    "Perdre du gras et gagner du muscle ?",
    "Que manger pour maigrir ?",
    "Combien de calories manger ?",
    "Combien de protéines consommer ?",
  ];

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
      className="mt-[30vh] flex min-h-screen flex-col items-center justify-center gap-20 overflow-hidden"
    >
      <FormCalories
        data={data}
        inputData={inputState}
        showResults={showResults}
        setShowResults={setShowResults}
      />
      <div className={`${showResults ? "mt-[30vh]" : ""} flex flex-col px-4`}>
        <h1 className="text-3xl md:text-4xl lg:text-7xl">
          Vous voulez gagner du temps ?
        </h1>
        <p className="font-medium text-muted md:text-xl">
          Vous vous êtes sûrement posé ces questions
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 lg:items-end">
          {questions.map((quesiton, index) => (
            <div
              key={index}
              className="flex w-full items-center gap-10 border-b border-muted py-8 lg:w-1/2"
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
