import { Step3UserDietProps } from "@/types/types";
import React, { useState, useEffect } from "react";

const PRESET_DIETS = {
  "Alimentation équilibrée (ANSES)": { carbs: 45, proteins: 20, fats: 35 },
  "Zone Diet": { carbs: 40, proteins: 30, fats: 30 },
  "Pauvre en graisse": { carbs: 60, proteins: 25, fats: 15 },
  "Pauvre en sucre": { carbs: 25, proteins: 40, fats: 35 },
  "Régime cétogène": { carbs: 5, proteins: 20, fats: 75 },
  Hyperprotéinée: { carbs: 35, proteins: 50, fats: 15 },
  "Avec mon ratio personnalisé": { carbs: 0, proteins: 0, fats: 0 },
};

type DietKey = keyof typeof PRESET_DIETS;

const Step3_UserDiet = ({ setGoals }: Step3UserDietProps) => {
  const [selectedDiet, setSelectedDiet] = useState<DietKey>(
    "Alimentation équilibrée (ANSES)",
  );

  const [macros, setMacros] = useState(PRESET_DIETS[selectedDiet]);

  useEffect(() => {
    setMacros(PRESET_DIETS[selectedDiet]);
    setGoals(PRESET_DIETS[selectedDiet]);
  }, [selectedDiet]);

  const handleChange = (
    macro: "carbs" | "proteins" | "fats",
    value: number,
  ) => {
    setMacros((prev) => ({
      ...prev,
      [macro]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">
        Étape 3 : sélectionne ton programme alimentaire
      </h2>

      <label>
        <span className="mb-2 block font-semibold">
          Choisis ton régime alimentaire :
        </span>
        <select
          className="w-full rounded-md border p-2 text-black"
          value={selectedDiet}
          onChange={(e) => setSelectedDiet(e.target.value as DietKey)}
        >
          {Object.keys(PRESET_DIETS).map((diet) => (
            <option key={diet} value={diet}>
              {diet}
            </option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-3 gap-4">
        {(["carbs", "proteins", "fats"] as const).map((macro) => (
          <div key={macro} className="flex flex-col items-center">
            <label className="mb-1 font-medium">
              {macro === "carbs"
                ? "Glucides"
                : macro === "proteins"
                  ? "Protéines"
                  : "Lipides"}
            </label>
            <input
              type="number"
              min={0}
              max={100}
              value={macros[macro]}
              onChange={(e) => handleChange(macro, Number(e.target.value))}
              className="w-20 rounded border p-2 text-center"
              disabled={selectedDiet !== "Avec mon ratio personnalisé"}
            />
            <span>%</span>
          </div>
        ))}
      </div>

      <button className="self-center rounded bg-button-gradient px-6 py-2 font-bold text-white">
        CALCULER
      </button>
    </div>
  );
};

export default Step3_UserDiet;
