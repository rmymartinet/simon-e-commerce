export const calculateBMR_KatchMcArdle = (
  weightKg: number,
  bodyFatPercent: number,
) => {
  const leanMass = weightKg * (1 - bodyFatPercent / 100);
  return 370 + 21.6 * leanMass;
};
