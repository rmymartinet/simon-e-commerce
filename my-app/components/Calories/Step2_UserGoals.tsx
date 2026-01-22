import { Step2_UserGoalsProps } from "@/types/types";
import { calculateAll } from "@/utils/calories/calculateAll";
import React, { useEffect, useState, useCallback, useMemo } from "react";

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
const GoalCard = React.memo(
  ({
    title,
    selected,
    onSelect,
    value,
    options,
    disabled = false,
    customInput = false,
    onCustomChange,
    onOptionChange,
    selectedOption,
    id,
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
    selectedOption?: string;
    id: string;
  }) => (
    <div
      className={`rounded-2xl border p-6 transition-colors ${
        selected
          ? "border-violet-400 bg-violet-500/10"
          : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
      } ${disabled ? "opacity-60" : ""}`}
    >
      <label className="mb-2 flex items-center gap-2">
        <input
          type="radio"
          name="goal"
          checked={selected}
          onChange={onSelect}
          className="accent-violet-400"
        />
        <h3
          className={`text-xl font-bold ${
            selected ? "text-violet-400" : "text-white"
          }`}
        >
          {title}
        </h3>
      </label>
      <p
        className={`text-3xl font-semibold ${
          !disabled ? "text-white" : "text-gray-500"
        }`}
      >
        {disabled ? "-" : Math.round(Number(value))} kcal
      </p>
      <p className="mb-4 text-sm text-gray-400">kcal par jour</p>
      {options &&
        options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center gap-2 ${
              !disabled ? "text-gray-200" : "text-gray-500"
            }`}
          >
            <input
              type="radio"
              name={`goalcard-${id}-option`}
              value={option.value}
              checked={option.value === selectedOption}
              onChange={() => {
                if (onOptionChange) onOptionChange(option.value);
                if (!selected) onSelect(); // sélectionner la carte si radio modifiée
              }}
              disabled={!selected}
              className="accent-violet-400"
            />
            {option.label}
          </label>
        ))}
      {customInput && selected && (
        <input
          type="number"
          className="mt-2 w-full rounded-xl border-2 border-gray-700 bg-gray-800/50 p-2 text-white focus:border-violet-400 focus:outline-none"
          placeholder="Ex: 2500"
          value={value || ""}
          onChange={(e) => onCustomChange?.(Number(e.target.value))}
        />
      )}
    </div>
  ),
);

GoalCard.displayName = "GoalCard";

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

  const safeFormState = useMemo(
    () => ({
      ...formState,
      age: formState.age === "" ? 0 : formState.age,
      height: formState.height === "" ? 0 : formState.height,
      weight: formState.weight === "" ? 0 : formState.weight,
      trainingDays: formState.trainingDays === "" ? 0 : formState.trainingDays,
      sessionDuration:
        formState.sessionDuration === "" ? 0 : formState.sessionDuration,
      intensity: formState.intensity === "" ? 0 : formState.intensity,
    }),
    [
      formState.age,
      formState.height,
      formState.weight,
      formState.trainingDays,
      formState.sessionDuration,
      formState.intensity,
      formState.genre,
      formState.activities,
      formState.bodyFatMode,
    ],
  );

  // Calcul toutes les calories pour chaque carte selon SON choix propre
  const allCalories = useMemo(() => {
    if (!goals)
      return {
        perte: 0,
        gain: 0,
        maintien: 0,
        custom: customCalories || 0,
      };

    const calcPerte = calculateAll({
      ...safeFormState,
      bodyFatPercentage: 15,
      weightChange:
        perteChoice === "lente" ? 0.25 : perteChoice === "moderee" ? 0.5 : 0.75,
      isTrainingDay,
    });
    const calcGain = calculateAll({
      ...safeFormState,
      bodyFatPercentage: 15,
      weightChange:
        gainChoice === "prudente" ? 0.25 : gainChoice === "moderee" ? 0.5 : 1,
      isTrainingDay,
    });
    const calcMaintien = calculateAll({
      ...safeFormState,
      bodyFatPercentage: 15,
      weightChange: 0,
      isTrainingDay,
    });

    return {
      perte: calcPerte.totalPerte[perteChoice] ?? 0,
      gain: calcGain.totalGain[gainChoice] ?? 0,
      maintien: calcMaintien.totalMaintien ?? 0,
      custom: customCalories || 0,
    };
  }, [
    goals,
    safeFormState,
    perteChoice,
    gainChoice,
    customCalories,
    isTrainingDay,
  ]);

  // Calcul du weightChange seulement pour la carte sélectionnée
  const weightChange = useMemo(() => {
    if (selectedGoal === "perte") {
      return perteChoice === "lente"
        ? 0.25
        : perteChoice === "moderee"
          ? 0.5
          : 0.75;
    }
    if (selectedGoal === "gain") {
      return gainChoice === "prudente"
        ? 0.25
        : gainChoice === "moderee"
          ? 0.5
          : 1;
    }
    return 0;
  }, [selectedGoal, perteChoice, gainChoice]);

  // Calcul des calories et macros pour la sélection utilisateur (utile pour l’étape suivante)
  const calculateValues = useCallback(() => {
    if (!formIsValid || !goals) return;

    const {
      totalGain,
      totalGainTraining,
      totalMaintien,
      totalPerte,
      totalPerteTraining,
    } = calculateAll({
      ...safeFormState,
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
    safeFormState,
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

  return (
    <div className="relative flex w-full flex-col gap-4 rounded-xl border border-[--border-color] bg-[--card-bg] p-5 sm:p-8">
      <div className="mb-6 flex flex-col items-center gap-4 text-center sm:mb-10">
        <h2 className="text-xl sm:text-2xl">
          <span className="font-bold text-violet-400">Étape 2</span> : Choisis
          ton objectif
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2">
        <GoalCard
          title="Perte de graisse"
          selected={selectedGoal === "perte"}
          onSelect={() => setSelectedGoal("perte")}
          value={allCalories.perte}
          options={PERTE_OPTIONS}
          selectedOption={perteChoice}
          disabled={!formIsValid}
          onOptionChange={(value) => setPerteChoice(value as PerteType)}
          id="perte"
        />

        <GoalCard
          title="Prise de masse"
          selected={selectedGoal === "gain"}
          onSelect={() => setSelectedGoal("gain")}
          value={allCalories.gain}
          options={GAIN_OPTIONS}
          selectedOption={gainChoice}
          disabled={!formIsValid}
          onOptionChange={(value) => setGainChoice(value as GainType)}
          id="gain"
        />

        <GoalCard
          title="Maintien"
          selected={selectedGoal === "maintien"}
          onSelect={() => setSelectedGoal("maintien")}
          value={allCalories.maintien}
          disabled={!formIsValid}
          id="maintien"
        />

        <GoalCard
          title="Personnalisé"
          selected={selectedGoal === "custom"}
          onSelect={() => setSelectedGoal("custom")}
          value={allCalories.custom}
          customInput={true}
          onCustomChange={setCustomCalories}
          disabled={!formIsValid}
          id="custom"
        />
      </div>
    </div>
  );
};

export default Step2_UserGoals;
