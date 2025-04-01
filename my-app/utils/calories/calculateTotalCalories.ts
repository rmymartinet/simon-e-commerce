export const calculateTotalCalories = (
  BMR: number,
  weightChange: number,
  trainingCalories: number = 0,
  activities: number,
) => {
  const tdee_base = BMR * activities;
  const tdee_entrainement = tdee_base + trainingCalories;
  const tdee_repos = tdee_base;

  const perte = (total: number) => ({
    principale: total - (weightChange * 7700) / 7,
    lente: total - ((weightChange * 7700) / 7) * 0.85,
    moderee: total - ((weightChange * 7700) / 7) * 0.8,
    rapide: total - ((weightChange * 7700) / 7) * 0.75,
  });

  const gain = (total: number) => ({
    principale: total + (weightChange * 7700) / 7,
    prudente: total + ((weightChange * 7700) / 7) * 1.05,
    moderee: total + ((weightChange * 7700) / 7) * 1.1,
    extreme: total + ((weightChange * 7700) / 7) * 1.2,
  });

  return {
    avecEntrainement: {
      maintien: tdee_entrainement,
      perte: perte(tdee_entrainement),
      gain: gain(tdee_entrainement),
    },
    sansEntrainement: {
      maintien: tdee_repos,
      perte: perte(tdee_repos),
      gain: gain(tdee_repos),
    },
  };
};
