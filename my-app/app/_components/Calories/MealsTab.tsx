const MacroMicroTab = () => {
  const macrosData = [
    {
      meal: "Petit-déjeuner",
      carbs: 100,
      proteins: 35,
      fats: 20,
      calories: 740,
    },
    {
      meal: "Collation matin",
      carbs: 50,
      proteins: 15,
      fats: 10,
      calories: 350,
    },
    { meal: "Déjeuner", carbs: 130, proteins: 55, fats: 30, calories: 1050 },
    {
      meal: "Collation après-midi",
      carbs: 70,
      proteins: 25,
      fats: 20,
      calories: 590,
    },
    {
      meal: "Dîner (post-entraînement)",
      carbs: 100,
      proteins: 70,
      fats: 20,
      calories: 780,
    },
  ];

  const total = macrosData.reduce(
    (acc, meal) => ({
      carbs: acc.carbs + meal.carbs,
      proteins: acc.proteins + meal.proteins,
      fats: acc.fats + meal.fats,
      calories: acc.calories + meal.calories,
    }),
    { carbs: 0, proteins: 0, fats: 0, calories: 0 },
  );

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-4 shadow-lg">
      <h1 className="mb-6 text-center text-xl font-bold text-gray-800 md:text-2xl">
        Répartition des macronutriments
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Repas
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Glucides (g)
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Protéines (g)
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Lipides (g)
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Total Calories
              </th>
            </tr>
          </thead>
          <tbody>
            {macrosData.map((meal, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {meal.meal}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {meal.carbs}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {meal.proteins}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {meal.fats}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {meal.calories}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-200 font-bold">
              <td className="border border-gray-300 px-4 py-2">Total</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {total.carbs}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {total.proteins}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {total.fats}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {total.calories}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default MacroMicroTab;
