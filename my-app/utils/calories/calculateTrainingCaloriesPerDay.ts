export const calculateTrainingCaloriesPerDay = (
  trainingDays: number,
  sessionDuration: number,
  intensity: number,
  weight: number,
) => {
  // Intensité ~ MET estimé (valeurs moyennes)
  const MET = Math.max(1, Math.min(15, intensity)); // au cas où on reçoit une valeur hors norme
  const caloriesPerSession = ((MET * weight * 3.5) / 200) * sessionDuration;
  const averagePerDay = (caloriesPerSession * trainingDays) / 7;
  return averagePerDay;
};
