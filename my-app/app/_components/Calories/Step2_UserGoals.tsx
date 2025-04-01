import { Step2_UserGoalsProps } from "@/types/types";
import { calculateAll } from "@/utils/calories/calculateAll";
import React, { useEffect, useState } from "react";

/**
 * !TODO REVOIR BODYFAT PERCENTAGE
 */

const Step2_UserGoals = ({
  formState,
  setTotalCalories,
  formIsValid,
  setTotalCaloriesTraining,
  setTotalCaloriesRest,
  setTrainingMacros,
  setRestMacros,
  goals,
  isTrainingDay,
}: Step2_UserGoalsProps) => {
  const [selectedGoal, setSelectedGoal] = useState<
    "perte" | "gain" | "maintien" | "custom"
  >("perte");
  const [perteChoice, setPerteChoice] = useState<
    "lente" | "moderee" | "rapide"
  >("lente");
  const [gainChoice, setGainChoice] = useState<
    "prudente" | "moderee" | "extreme"
  >("prudente");
  const [customCalories, setCustomCalories] = useState<number | null>(null);

  const weightChange =
    selectedGoal === "perte"
      ? perteChoice === "lente"
        ? 0.25
        : perteChoice === "moderee"
          ? 0.5
          : 0.75
      : selectedGoal === "gain"
        ? gainChoice === "prudente"
          ? 0.25
          : gainChoice === "moderee"
            ? 0.5
            : 1
        : 0;

  const {
    totalGain,
    totalGainTraining,
    totalMaintien,
    totalMaintienTraining,
    totalPerte,
    totalPerteTraining,
  } = calculateAll({
    ...formState,
    bodyFatPercentage: 15,
    weightChange,
    isTrainingDay,
  });

  const perteData = isTrainingDay ? totalPerteTraining : totalPerte;
  const gainData = isTrainingDay ? totalGainTraining : totalGain;
  const maintienData = isTrainingDay ? totalMaintienTraining : totalMaintien;

  // 🔁 Recalcule les calories et macros dès qu’un paramètre change
  useEffect(() => {
    if (!formIsValid || !goals) return;

    const {
      totalGain,
      totalGainTraining,
      totalMaintien,
      totalPerte,
      totalPerteTraining,
    } = calculateAll({
      ...formState,
      bodyFatPercentage: 15,
      weightChange,
      isTrainingDay,
    });

    const perteData = totalPerte;
    const gainData = totalGain;
    const maintienData = totalMaintien;

    let total = 0;
    let training = 0;
    let rest = 0;

    if (selectedGoal === "perte") {
      total = perteData[perteChoice];
      training = totalPerteTraining[perteChoice];
      rest = totalPerte[perteChoice];
    } else if (selectedGoal === "gain") {
      total = gainData[gainChoice];
      training = totalGainTraining[gainChoice];
      rest = totalGain[gainChoice];
    } else if (selectedGoal === "maintien") {
      total = maintienData;
      training = maintienData;
      rest = maintienData;
    } else if (selectedGoal === "custom" && customCalories) {
      total = customCalories;
      training = customCalories;
      rest = customCalories;
    }

    setTotalCalories(Math.round(total));
    setTotalCaloriesTraining(Math.round(training));
    setTotalCaloriesRest(Math.round(rest));

    const calculateMacros = (
      calories: number,
      g: { carbs: number; proteins: number; fats: number },
    ) => ({
      carbs: (calories * (g.carbs / 100)) / 4,
      proteins: (calories * (g.proteins / 100)) / 4,
      fats: (calories * (g.fats / 100)) / 9,
    });

    setTrainingMacros(calculateMacros(training, goals));
    setRestMacros(calculateMacros(rest, goals));
  }, [
    formIsValid,
    formState,
    weightChange,
    isTrainingDay,
    selectedGoal,
    perteChoice,
    gainChoice,
    customCalories,
    goals,
  ]);

  return (
    <div className="relative flex w-screen flex-col gap-4 rounded-xl border border-[--border-color] bg-[--card-bg] p-8 lg:w-full">
      <div className="mb-10 flex flex-col items-center gap-4 text-center">
        <h2 className="text-2xl">
          {" "}
          <span className="font-bold text-violet-400">Étape 2</span> : choisis
          ton objectif
        </h2>
        <p className="lg:max-w-[40vw]">
          Choisis ton objectif : perdre de la graisse, prendre de la masse, ou
          simplement maintenir ton poids. Tu peux aussi entrer un total
          personnalisé si tu sais déjà ce que tu veux viser. Ensuite, ajuste le
          niveau d’intensité de ton objectif pour un déficit ou un surplus
          progressif ou plus rapide
        </p>
      </div>
      {/* Toggle Entraînement */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2">
        {/* Perte de graisse */}
        <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-md">
          <label className="mb-2 flex items-center gap-2">
            <input
              type="radio"
              name="goal"
              value="perte"
              checked={selectedGoal === "perte"}
              onChange={() => setSelectedGoal("perte")}
            />
            <h3 className="text-xl font-bold text-blue-700">
              Perte de graisse
            </h3>
          </label>
          <p
            className={`${formIsValid ? "text-black" : ""} text-3xl font-semibold`}
          >
            {!formIsValid ? "-" : Math.round(perteData[perteChoice])} kcal
          </p>
          <p className="mb-4 text-sm text-gray-500">kcal par jour</p>
          {["lente", "moderee", "rapide"].map((option) => (
            <label
              key={option}
              className={`flex items-center gap-2 ${formIsValid ? "text-black" : ""}`}
            >
              <input
                type="radio"
                name="perte-option"
                value={option}
                checked={perteChoice === option}
                onChange={() => setPerteChoice(option as typeof perteChoice)}
                disabled={selectedGoal !== "perte"}
              />
              {option === "lente"
                ? "Lente (−15%)"
                : option === "moderee"
                  ? "Modérée (−20%)"
                  : "Rapide (−25%)"}
            </label>
          ))}
        </div>

        {/* Prise de masse */}
        <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-md">
          <label className="mb-2 flex items-center gap-2">
            <input
              type="radio"
              name="goal"
              value="gain"
              checked={selectedGoal === "gain"}
              onChange={() => setSelectedGoal("gain")}
            />
            <h3 className="text-xl font-bold text-blue-700">Prise de masse</h3>
          </label>
          <p
            className={`${formIsValid ? "text-black" : ""} text-3xl font-semibold`}
          >
            {" "}
            {!formIsValid ? "-" : Math.round(gainData[gainChoice])} kcal
          </p>
          <p className="mb-4 text-sm text-gray-500">kcal par jour</p>
          {["prudente", "moderee", "extreme"].map((option) => (
            <label
              key={option}
              className={`flex items-center gap-2 ${formIsValid ? "text-black" : ""}`}
            >
              <input
                type="radio"
                name="gain-option"
                value={option}
                checked={gainChoice === option}
                onChange={() => setGainChoice(option as typeof gainChoice)}
                disabled={selectedGoal !== "gain"}
              />
              {option === "prudente"
                ? "Prudente (+5%)"
                : option === "moderee"
                  ? "Modérée (+10%)"
                  : "Extrême (+20%)"}
            </label>
          ))}
        </div>

        {/* Maintien */}
        <div className="col-span-1 rounded-xl border border-gray-300 bg-white p-6 shadow-md">
          <label className="mb-2 flex items-center gap-2">
            <input
              type="radio"
              name="goal"
              value="maintien"
              checked={selectedGoal === "maintien"}
              onChange={() => setSelectedGoal("maintien")}
            />
            <h3 className="text-xl font-bold text-blue-700">Maintien</h3>
          </label>
          <p
            className={`${formIsValid ? "text-black" : ""} text-3xl font-semibold`}
          >
            {!formIsValid ? "-" : Math.round(maintienData)} kcal
          </p>
          <p className="text-sm text-gray-500">kcal par jour</p>
        </div>

        {/* Personnalisé */}
        <div className="col-span-1 rounded-xl bg-white p-6 shadow-md">
          <label className="mb-2 flex items-center gap-2">
            <input
              type="radio"
              name="goal"
              value="custom"
              checked={selectedGoal === "custom"}
              onChange={() => setSelectedGoal("custom")}
            />
            <h3 className="text-xl font-bold text-blue-700">Personnalisé</h3>
          </label>
          <input
            type="number"
            className="mt-2 w-full rounded border border-gray-300 p-2"
            placeholder="Ex: 2500"
            value={customCalories ?? ""}
            onChange={(e) => setCustomCalories(Number(e.target.value))}
            disabled={selectedGoal !== "custom"}
          />
        </div>
      </div>
    </div>
  );
};

export default Step2_UserGoals;
