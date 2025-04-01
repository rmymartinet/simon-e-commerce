export const calculateBMR = (
  weight: number,
  height: number,
  age: number,
  genre: string,
) => {
  const femaleBMR = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  const maleBMR = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  return genre === "female" ? femaleBMR : maleBMR;
};
