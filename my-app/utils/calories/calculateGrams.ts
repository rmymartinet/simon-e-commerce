export const calculateGrams = (totalCalories: number) => {
  const percentages = {
    carbs: {
      min: totalCalories * 0.45,
      max: totalCalories * 0.65,
    },
    proteins: {
      min: totalCalories * 0.1,
      max: totalCalories * 0.35,
    },
    fats: {
      min: totalCalories * 0.2,
      max: totalCalories * 0.35,
    },
  };

  return {
    carbs: {
      min: Number((percentages.carbs.min / 4).toFixed(0)),
      max: Number((percentages.carbs.max / 4).toFixed(0)),
    },
    proteins: {
      min: Number((percentages.proteins.min / 4).toFixed(0)),
      max: Number((percentages.proteins.max / 4).toFixed(0)),
    },
    fats: {
      min: Number((percentages.fats.min / 9).toFixed(0)),
      max: Number((percentages.fats.max / 9).toFixed(0)),
    },
  };
};
