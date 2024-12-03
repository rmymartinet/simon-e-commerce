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
    <div className="mx-auto rounded-lg border-2 border-gray-200 bg-white p-4 shadow-lg">
      <h1 className="mb-6 text-center text-xl font-bold text-gray-800 md:text-2xl">
        Répartition des macronutriments
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left text-sm text-gray-700 md:text-base">
                Repas
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-700 md:text-base">
                Glucides (g)
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-700 md:text-base">
                Protéines (g)
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-700 md:text-base">
                Lipides (g)
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-700 md:text-base">
                Total Calories
              </th>
            </tr>
          </thead>
          <tbody>
            {macrosData.map((meal, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                  {meal.meal}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-600">
                  {meal.carbs}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-600">
                  {meal.proteins}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-600">
                  {meal.fats}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-600">
                  {meal.calories}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-200 font-bold">
              <td className="border border-gray-300 px-4 py-2 text-sm">
                Total
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center text-sm">
                {total.carbs}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center text-sm">
                {total.proteins}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center text-sm">
                {total.fats}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center text-sm">
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
