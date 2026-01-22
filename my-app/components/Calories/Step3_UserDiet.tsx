import { Step3UserDietProps } from "@/types/types";
import React, { useState, useEffect, useCallback, useMemo } from "react";

// Types
type MacroType = "carbs" | "proteins" | "fats";
type MacroValue = { carbs: number; proteins: number; fats: number };

// Constantes
const PRESET_DIETS: Record<string, MacroValue> = {
  "Alimentation équilibrée (ANSES)": { carbs: 45, proteins: 20, fats: 35 },
  "Zone Diet": { carbs: 40, proteins: 30, fats: 30 },
  "Pauvre en graisse": { carbs: 60, proteins: 25, fats: 15 },
  "Pauvre en sucre": { carbs: 25, proteins: 40, fats: 35 },
  "Régime cétogène": { carbs: 5, proteins: 20, fats: 75 },
  Hyperprotéinée: { carbs: 35, proteins: 50, fats: 15 },
  "Avec mon ratio personnalisé": { carbs: 0, proteins: 0, fats: 0 },
} as const;

const MACRO_LABELS: Record<MacroType, string> = {
  carbs: "Glucides",
  proteins: "Protéines",
  fats: "Lipides",
};

// Composant pour l'input de macro
const MacroInput = React.memo(
  ({
    macro,
    value,
    onChange,
    disabled,
  }: {
    macro: MacroType;
    value: number;
    onChange: (value: number) => void;
    disabled: boolean;
  }) => (
    <div className="flex flex-col items-center">
      <label className="mb-1 font-medium text-gray-300">
        {MACRO_LABELS[macro]}
      </label>
      <input
        type="number"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-20 rounded-xl border-2 border-gray-700 bg-gray-800/50 p-2 text-center text-white focus:border-violet-400 focus:outline-none"
        disabled={disabled}
      />
      <span className="text-xs text-gray-500">%</span>
    </div>
  ),
);

const Step3_UserDiet = ({ setGoals }: Step3UserDietProps) => {
  const [selectedDiet, setSelectedDiet] = useState<keyof typeof PRESET_DIETS>(
    "Alimentation équilibrée (ANSES)",
  );

  const [macros, setMacros] = useState<MacroValue>(PRESET_DIETS[selectedDiet]);

  // Vérification de la somme des macros
  const totalMacros = useMemo(
    () => Object.values(macros).reduce((sum, value) => sum + value, 0),
    [macros],
  );

  const isCustomDiet = selectedDiet === "Avec mon ratio personnalisé";

  // Mise à jour des macros lors du changement de régime
  useEffect(() => {
    setMacros(PRESET_DIETS[selectedDiet]);
    setGoals(PRESET_DIETS[selectedDiet]);
  }, [selectedDiet, setGoals]);

  // Gestion du changement de macro
  const handleMacroChange = useCallback(
    (macro: MacroType, value: number) => {
      if (!isCustomDiet) return;

      setMacros((prev) => {
        const newMacros = {
          ...prev,
          [macro]: value,
        };

        // Vérification que la somme ne dépasse pas 100%
        const total = Object.values(newMacros).reduce(
          (sum, val) => sum + val,
          0,
        );
        if (total > 100) return prev;

        setGoals(newMacros);
        return newMacros;
      });
    },
    [isCustomDiet, setGoals],
  );

  return (
    <div className="relative flex w-full flex-col gap-4 rounded-xl border border-[--border-color] bg-[--card-bg] p-5 sm:p-8">
      <div className="mb-6 flex flex-col items-center gap-4 text-center sm:mb-10">
        <h2 className="text-xl sm:text-2xl">
          <span className="font-bold text-violet-400">Étape 3</span> :
          Sélectionne ton programme alimentaire
        </h2>
      </div>

      <label>
        <span className="mb-2 block font-semibold">
          Choisis ton régime alimentaire :
        </span>
        <select
          className="w-full rounded-xl border-2 border-gray-700 bg-gray-800/50 p-3 text-white focus:border-violet-400 focus:outline-none"
          value={selectedDiet}
          onChange={(e) =>
            setSelectedDiet(e.target.value as keyof typeof PRESET_DIETS)
          }
        >
          {Object.keys(PRESET_DIETS).map((diet) => (
            <option key={diet} value={diet}>
              {diet}
            </option>
          ))}
        </select>
      </label>

      <div className="mt-6 grid grid-cols-3 gap-4">
        {(Object.keys(MACRO_LABELS) as MacroType[]).map((macro) => (
          <MacroInput
            key={macro}
            macro={macro}
            value={macros[macro]}
            onChange={(value) => handleMacroChange(macro, value)}
            disabled={!isCustomDiet}
          />
        ))}
      </div>

      {isCustomDiet && (
        <div
          className={`mt-4 text-center ${
            totalMacros !== 100 ? "text-red-400" : "text-emerald-400"
          }`}
        >
          Total: {totalMacros}%{" "}
          {totalMacros !== 100 && "(doit être égal à 100%)"}
        </div>
      )}
    </div>
  );
};

MacroInput.displayName = "MacroInput";

export default Step3_UserDiet;
