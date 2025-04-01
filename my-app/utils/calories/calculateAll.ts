import { calculateBMR } from "./calculateBMR";
import { calculateBMR_KatchMcArdle } from "./calculateBMR_KatchMcArdle";
import { calculateGrams } from "./calculateGrams";
import { calculateTotalCalories } from "./calculateTotalCalories";
import { calculateTrainingCaloriesPerDay } from "./calculateTrainingCaloriesPerDay";

type Params = {
  weight: number;
  height: number;
  age: number;
  genre: string;
  weightChange: number;
  activities: number;
  bodyFatMode: string;
  bodyFatPercentage?: number;
  trainingDays: number;
  sessionDuration: number;
  intensity: number;
  isTrainingDay?: boolean; // true par défaut
};

export const calculateAll = ({
  weight,
  height,
  age,
  genre,
  weightChange,
  activities,
  bodyFatMode,
  bodyFatPercentage,
  trainingDays,
  sessionDuration,
  intensity,
  isTrainingDay = true,
}: Params) => {
  // 🔢 BMR (Mifflin ou Katch-McArdle)
  const BMR =
    bodyFatMode === "manual" && typeof bodyFatPercentage === "number"
      ? calculateBMR_KatchMcArdle(weight, bodyFatPercentage)
      : calculateBMR(weight, height, age, genre);

  // 🔥 Calories entraînement
  const trainingCalories = calculateTrainingCaloriesPerDay(
    trainingDays,
    sessionDuration,
    intensity,
    weight,
  );

  // 🔄 Calcul des TDEE (avec et sans entraînement)
  const tdee = calculateTotalCalories(
    BMR,
    weightChange,
    trainingCalories,
    activities,
  );

  // ✅ Retour en fonction du mode sélectionné
  return {
    BMR,
    totalMaintien: isTrainingDay
      ? tdee.avecEntrainement.maintien
      : tdee.sansEntrainement.maintien,
    totalPerte: isTrainingDay
      ? tdee.avecEntrainement.perte
      : tdee.sansEntrainement.perte,
    totalGain: isTrainingDay
      ? tdee.avecEntrainement.gain
      : tdee.sansEntrainement.gain,

    totalMaintienTraining: tdee.avecEntrainement.maintien,
    totalPerteTraining: tdee.avecEntrainement.perte,
    totalGainTraining: tdee.avecEntrainement.gain,

    totalMaintienRest: tdee.sansEntrainement.maintien,
    totalPerteRest: tdee.sansEntrainement.perte,
    totalGainRest: tdee.sansEntrainement.gain,

    grams: {
      training: calculateGrams(tdee.avecEntrainement.maintien),
      rest: calculateGrams(tdee.sansEntrainement.maintien),
    },
  };
};
