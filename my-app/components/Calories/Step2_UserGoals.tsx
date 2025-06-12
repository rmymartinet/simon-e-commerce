import { Step2_UserGoalsProps } from "@/types/types";
import { calculateAll } from "@/utils/calories/calculateAll";
import React, { useEffect, useState, useCallback, useMemo } from "react";

/**
 * !TODO REVOIR BODYFAT PERCENTAGE
 */

// Types pour les objectifs
type GoalType = "perte" | "gain" | "maintien" | "custom";
type PerteType = "lente" | "moderee" | "rapide";
type GainType = "prudente" | "moderee" | "extreme";

// Constantes pour les options
const PERTE_OPTIONS: { value: string; label: string }[] = [
  { value: "lente", label: "Lente (−15%)" },
  { value: "moderee", label: "Modérée (−20%)" },
  { value: "rapide", label: "Rapide (−25%)" },
];

const GAIN_OPTIONS: { value: string; label: string }[] = [
  { value: "prudente", label: "Prudente (+5%)" },
  { value: "moderee", label: "Modérée (+10%)" },
  { value: "extreme", label: "Extrême (+20%)" },
];

// Composant pour les cartes d'objectif
const GoalCard = React.memo(({ 
  title, 
  selected, 
  onSelect, 
  value, 
  options, 
  disabled = false,
  customInput = false,
  onCustomChange,
  onOptionChange
}: { 
  title: string;
  selected: boolean;
  onSelect: () => void;
  value: number | string;
  options?: { value: string; label: string }[];
  disabled?: boolean;
  customInput?: boolean;
  onCustomChange?: (value: number) => void;
  onOptionChange?: (value: string) => void;
}) => (
  <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-md">
    <label className="mb-2 flex items-center gap-2">
      <input
        type="radio"
        name="goal"
        checked={selected}
        onChange={onSelect}
      />
      <h3 className="text-xl font-bold text-blue-700">{title}</h3>
    </label>
    <p className={`${!disabled ? "text-black" : "text-[--subtext]"} text-3xl font-semibold`}>
      {disabled ? "-" : Math.round(Number(value))} kcal
    </p>
    <p className="mb-4 text-sm text-gray-500">kcal par jour</p>
    {options && options.map((option) => (
      <label
        key={option.value}
        className={`flex items-center gap-2 ${!disabled ? "text-black" : "text-[--subtext]"}`}
      >
        <input
          type="radio"
          name={`${title.toLowerCase()}-option`}
          value={option.value}
          checked={option.value === value}
          onChange={() => {
            onSelect();
            onOptionChange?.(option.value as string);
          }}
          disabled={!selected}
        />
        {option.label}
      </label>
    ))}
    {customInput && selected && (
      <input
        type="number"
        className="mt-2 w-full rounded border border-gray-300 p-2"
        placeholder="Ex: 2500"
        value={value || ""}
        onChange={(e) => onCustomChange?.(Number(e.target.value))}
      />
    )}
  </div>
));

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
  const [selectedGoal, setSelectedGoal] = useState<GoalType>("perte");
  const [perteChoice, setPerteChoice] = useState<PerteType>("lente");
  const [gainChoice, setGainChoice] = useState<GainType>("prudente");
  const [customCalories, setCustomCalories] = useState<number | null>(null);

  // Calcul du changement de poids basé sur les choix
  const weightChange = useMemo(() => {
    if (selectedGoal === "perte") {
      return perteChoice === "lente" ? 0.25 : perteChoice === "moderee" ? 0.5 : 0.75;
    }
    if (selectedGoal === "gain") {
      return gainChoice === "prudente" ? 0.25 : gainChoice === "moderee" ? 0.5 : 1;
    }
    return 0;
  }, [selectedGoal, perteChoice, gainChoice]);

  // Calcul des calories et macros
  const calculateValues = useCallback(() => {
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

    let total = 0;
    let training = 0;
    let rest = 0;

    if (selectedGoal === "perte") {
      total = totalPerte[perteChoice];
      training = totalPerteTraining[perteChoice];
      rest = totalPerte[perteChoice];
    } else if (selectedGoal === "gain") {
      total = totalGain[gainChoice];
      training = totalGainTraining[gainChoice];
      rest = totalGain[gainChoice];
    } else if (selectedGoal === "maintien") {
      total = totalMaintien;
      training = totalMaintien;
      rest = totalMaintien;
    } else if (selectedGoal === "custom" && customCalories) {
      total = customCalories;
      training = customCalories;
      rest = customCalories;
    }

    setTotalCalories(Math.round(total));
    setTotalCaloriesTraining(Math.round(training));
    setTotalCaloriesRest(Math.round(rest));

    const calculateMacros = (calories: number) => ({
      carbs: (calories * (goals.carbs / 100)) / 4,
      proteins: (calories * (goals.proteins / 100)) / 4,
      fats: (calories * (goals.fats / 100)) / 9,
    });

    setTrainingMacros(calculateMacros(training));
    setRestMacros(calculateMacros(rest));
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
    setTotalCalories,
    setTotalCaloriesTraining,
    setTotalCaloriesRest,
    setTrainingMacros,
    setRestMacros,
  ]);

  useEffect(() => {
    calculateValues();
  }, [calculateValues]);

  // Calcul des valeurs pour chaque objectif
  const calculatedValues = useMemo(() => {
    if (!formIsValid) return {
      perte: 0,
      gain: 0,
      maintien: 0,
      custom: customCalories || 0
    };

    const {
      totalGain,
      totalMaintien,
      totalPerte,
    } = calculateAll({
      ...formState,
      bodyFatPercentage: 15,
      weightChange,
      isTrainingDay,
    });

    return {
      perte: totalPerte[perteChoice],
      gain: totalGain[gainChoice],
      maintien: totalMaintien,
      custom: customCalories || 0
    };
  }, [formIsValid, formState, weightChange, isTrainingDay, perteChoice, gainChoice, customCalories]);

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
          niveau d&apos;intensité de ton objectif pour un déficit ou un surplus
          progressif ou plus rapide
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2">
        <GoalCard
          title="Perte de graisse"
          selected={selectedGoal === "perte"}
          onSelect={() => setSelectedGoal("perte")}
          value={calculatedValues.perte}
          options={PERTE_OPTIONS}
          disabled={!formIsValid}
          onOptionChange={(value) => setPerteChoice(value as PerteType)}
        />

        <GoalCard
          title="Prise de masse"
          selected={selectedGoal === "gain"}
          onSelect={() => setSelectedGoal("gain")}
          value={calculatedValues.gain}
          options={GAIN_OPTIONS}
          disabled={!formIsValid}
          onOptionChange={(value) => setGainChoice(value as GainType)}
        />

        <GoalCard
          title="Maintien"
          selected={selectedGoal === "maintien"}
          onSelect={() => setSelectedGoal("maintien")}
          value={calculatedValues.maintien}
          disabled={!formIsValid}
        />

        <GoalCard
          title="Personnalisé"
          selected={selectedGoal === "custom"}
          onSelect={() => setSelectedGoal("custom")}
          value={calculatedValues.custom}
          customInput={true}
          onCustomChange={setCustomCalories}
          disabled={!formIsValid}
        />
      </div>
    </div>
  );
};

export default Step2_UserGoals;
