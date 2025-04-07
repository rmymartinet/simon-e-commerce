import { Step4_ResultProps } from "@/types/types";
import React, { useState } from "react";

const Step4_Result = ({
  goalsTraining,
  goalsRest,
  totalCaloriesTraining,
  totalCaloriesRest,
  goals,
  isTrainingDay,
  setIsTrainingDay,
}: Step4_ResultProps) => {
  const [mealsPerDay, setMealsPerDay] = useState(3);

  // ✅ Utilise isTrainingDay local, pas includeTraining
  const macros = isTrainingDay ? goalsTraining : goalsRest;
  const totalCalories = isTrainingDay
    ? totalCaloriesTraining
    : totalCaloriesRest;

  if (!macros || totalCalories === 0) {
    return (
      <div className="relative flex w-screen flex-col gap-4 rounded-xl border border-[--border-color] bg-[--card-bg] p-8 text-center text-red-400 lg:w-full">
        Pour obtenir un résultat, veuillez remplir les étapes précédentes.
      </div>
    );
  }

  const perMeal = {
    carbs: (macros.carbs / mealsPerDay).toFixed(1),
    proteins: (macros.proteins / mealsPerDay).toFixed(1),
    fats: (macros.fats / mealsPerDay).toFixed(1),
    calories: (totalCalories / mealsPerDay).toFixed(0),
  };

  const totalCarbs = isTrainingDay
    ? goals && goals.carbs !== undefined
      ? (totalCaloriesTraining * goals.carbs) / 100 / 4
      : 0
    : goals && goals.carbs !== undefined
      ? (totalCaloriesRest * goals.carbs) / 100 / 4
      : 0;

  const totalProteins = isTrainingDay
    ? goals && goals.proteins !== undefined
      ? (totalCaloriesTraining * goals.proteins) / 100 / 4
      : 0
    : goals && goals.proteins !== undefined
      ? (totalCaloriesRest * goals.proteins) / 100 / 4
      : 0;

  const totalFats = isTrainingDay
    ? goals && goals.fats !== undefined
      ? (totalCaloriesTraining * goals.fats) / 100 / 9
      : 0
    : goals && goals.fats !== undefined
      ? (totalCaloriesRest * goals.fats) / 100 / 9
      : 0;

  return (
    <div className="relative flex w-screen flex-col gap-4 rounded-xl border border-[--border-color] bg-[--card-bg] p-8 lg:w-full">
      <div className="mb-10 flex flex-col items-center gap-4 text-center">
        <h2 className="text-2xl">
          <span className="font-bold text-violet-400">Étape 4</span>: ton
          résultat personnalisé
        </h2>
        <p className="lg:max-w-[40vw]">
          Voici tes besoins caloriques et ta répartition en macronutriments,
          adaptés aux jours d’entraînement et de repos. Tu peux aussi ajuster le
          nombre de repas pour obtenir une répartition pratique à suivre au
          quotidien.
        </p>
      </div>
      {/* Toggle entraînement ou repos */}
      <div className="mb-6 flex items-center gap-6">
        <label className="flex items-center gap-2 font-semibold">
          <input
            type="radio"
            name="dayType"
            checked={isTrainingDay}
            onChange={() => setIsTrainingDay(true)}
          />
          Jour d&apos;entraînement
        </label>
        <label className="flex items-center gap-2 font-semibold">
          <input
            type="radio"
            name="dayType"
            checked={!isTrainingDay}
            onChange={() => setIsTrainingDay(false)}
          />
          Jour de repos
        </label>
      </div>

      {/* Tableau macros totales */}
      <table className="mb-8 w-full table-auto border-collapse text-center">
        <thead>
          <tr className="bg-yellow-400 text-white">
            <th className="p-3">Glucides (g)</th>
            <th className="p-3">Protéines (g)</th>
            <th className="p-3">Lipides (g)</th>
            <th className="p-3">Total (kcal)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-50 font-semibold">
            <td className="p-3">{totalCarbs.toFixed(2)}</td>
            <td className="p-3">{totalProteins.toFixed(2)}</td>
            <td className="p-3">{totalFats.toFixed(2)}</td>
            <td className="p-3">{totalCalories.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* Sélection des repas */}
      <div className="mb-6 text-center">
        <label className="mr-4 font-semibold">Nombre de repas par jour :</label>
        <select
          value={mealsPerDay}
          onChange={(e) => setMealsPerDay(Number(e.target.value))}
          className="rounded border p-2"
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <option key={num} value={num}>
              {num} repas
            </option>
          ))}
        </select>
      </div>

      {/* Tableau macros par repas */}
      <table className="w-full table-auto border-collapse text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">Glucides / repas</th>
            <th className="p-3">Protéines / repas</th>
            <th className="p-3">Lipides / repas</th>
            <th className="p-3">Calories / repas</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-50">
            <td className="p-3">{perMeal.carbs}</td>
            <td className="p-3">{perMeal.proteins}</td>
            <td className="p-3">{perMeal.fats}</td>
            <td className="p-3">{perMeal.calories}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Step4_Result;
