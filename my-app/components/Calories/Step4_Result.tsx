import { Step4_ResultProps } from "@/types/types";
import React, { useState, useMemo } from "react";

// Types
type MacroValues = {
  carbs: number;
  proteins: number;
  fats: number;
  calories: number;
};

// Composant pour le tableau de macros
const MacroTable = React.memo(({
  title,
  data,
  headers
}: {
  title: string;
  data: MacroValues;
  headers: string[];
}) => (
  <table className="w-full table-auto border-collapse text-center">
    <thead>
      <tr className={title === "Total" ? "bg-yellow-400" : "bg-gray-500"}>
        {headers.map((header) => (
          <th key={header} className="p-3 text-white">
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      <tr className="bg-gray-50 font-semibold text-black">
        <td className="p-3">{data.carbs.toFixed(2)}</td>
        <td className="p-3">{data.proteins.toFixed(2)}</td>
        <td className="p-3">{data.fats.toFixed(2)}</td>
        <td className="p-3">{data.calories.toFixed(2)}</td>
      </tr>
    </tbody>
  </table>
));

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

  // Calcul des macros et calories en fonction du type de jour
  const { macros, totalCalories } = useMemo(() => ({
    macros: isTrainingDay ? goalsTraining : goalsRest,
    totalCalories: isTrainingDay ? totalCaloriesTraining : totalCaloriesRest
  }), [isTrainingDay, goalsTraining, goalsRest, totalCaloriesTraining, totalCaloriesRest]);

  // Calcul des macros totales
  const totalMacros = useMemo(() => {
    if (!goals || !totalCalories) return { carbs: 0, proteins: 0, fats: 0, calories: 0 };

    const carbs = (totalCalories * goals.carbs) / 100 / 4;
    const proteins = (totalCalories * goals.proteins) / 100 / 4;
    const fats = (totalCalories * goals.fats) / 100 / 9;

    return {
      carbs,
      proteins,
      fats,
      calories: totalCalories
    };
  }, [goals, totalCalories]);

  // Calcul des macros par repas
  const perMealMacros = useMemo(() => ({
    carbs: Number((totalMacros.carbs / mealsPerDay).toFixed(1)),
    proteins: Number((totalMacros.proteins / mealsPerDay).toFixed(1)),
    fats: Number((totalMacros.fats / mealsPerDay).toFixed(1)),
    calories: Number((totalCalories / mealsPerDay).toFixed(0))
  }), [totalMacros, mealsPerDay, totalCalories]);

  if (!macros || totalCalories === 0) {
    return (
      <div className="relative flex w-screen flex-col gap-4 rounded-xl border border-[--border-color] bg-[--card-bg] p-8 text-center text-red-400 lg:w-full">
        Pour obtenir un résultat, veuillez remplir les étapes précédentes.
      </div>
    );
  }

  return (
    <div className="relative flex w-screen flex-col gap-4 rounded-xl border border-[--border-color] bg-[--card-bg] p-8 lg:w-full">
      <div className="mb-10 flex flex-col items-center gap-4 text-center">
        <h2 className="text-2xl">
          <span className="font-bold text-violet-400">Étape 4</span>: ton
          résultat personnalisé
        </h2>
        <p className="lg:max-w-[40vw]">
          Voici tes besoins caloriques et ta répartition en macronutriments,
          adaptés aux jours d&apos;entraînement et de repos. Tu peux aussi ajuster le
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
      <div className="mb-8">
        <MacroTable
          title="Total"
          data={totalMacros}
          headers={["Glucides (g)", "Protéines (g)", "Lipides (g)", "Total (kcal)"]}
        />
      </div>

      {/* Sélection des repas */}
      <div className="mb-6 text-center">
        <label className="mr-4 font-semibold">Nombre de repas par jour :</label>
        <select
          value={mealsPerDay}
          onChange={(e) => setMealsPerDay(Number(e.target.value))}
          className="rounded border p-2 text-black"
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <option key={num} value={num}>
              {num} repas
            </option>
          ))}
        </select>
      </div>

      {/* Tableau macros par repas */}
      <MacroTable
        title="Par repas"
        data={perMealMacros}
        headers={["Glucides / repas", "Protéines / repas", "Lipides / repas", "Calories / repas"]}
      />
    </div>
  );
};

MacroTable.displayName = 'MacroTable';

export default Step4_Result;
