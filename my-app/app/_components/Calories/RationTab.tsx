import React from "react";

const RationTab = () => {
  const nutritionData = [
    {
      aliment: "Flocons d’avoine",
      poids: 60,
      glucides: 40,
      proteines: 5,
      lipides: 4,
      fibres: 4,
      calories: 240,
      micronutriments: "Magnésium 80mg, Fer 1.5mg, Zinc 1mg",
    },
    {
      aliment: "Lait écrémé",
      poids: 200,
      glucides: 10,
      proteines: 7,
      lipides: 0.5,
      fibres: 0,
      calories: 70,
      micronutriments: "Calcium 240mg, Vitamine D 1.5µg, Vitamine B12 0.5µg",
    },
    {
      aliment: "Banane",
      poids: 100,
      glucides: 22,
      proteines: 1,
      lipides: 0.3,
      fibres: 2.6,
      calories: 90,
      micronutriments: "Potassium 358mg, Vitamine C 8.7mg",
    },
    {
      aliment: "Beurre d’amande",
      poids: 15,
      glucides: 5,
      proteines: 3,
      lipides: 7,
      fibres: 2,
      calories: 100,
      micronutriments: "Magnésium 50mg, Calcium 60mg",
    },
  ];

  return (
    <div className="overflow-x-auto rounded-lg bg-white text-sm shadow-lg">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-b px-4 py-2 text-left">Aliment</th>
            <th className="border-b px-4 py-2 text-left">Poids (g)</th>
            <th className="border-b px-4 py-2 text-left">Glucides (g)</th>
            <th className="border-b px-4 py-2 text-left">Protéines (g)</th>
            <th className="border-b px-4 py-2 text-left">Lipides (g)</th>
            <th className="border-b px-4 py-2 text-left">Fibres (g)</th>
            <th className="border-b px-4 py-2 text-left">Calories</th>
            <th className="border-b px-4 py-2 text-left">Micronutriments</th>
          </tr>
        </thead>
        <tbody>
          {nutritionData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border-b px-4 py-2">{item.aliment}</td>
              <td className="border-b px-4 py-2 text-center">{item.poids}</td>
              <td className="border-b px-4 py-2 text-center">
                {item.glucides}
              </td>
              <td className="border-b px-4 py-2 text-center">
                {item.proteines}
              </td>
              <td className="border-b px-4 py-2 text-center">{item.lipides}</td>
              <td className="border-b px-4 py-2 text-center">{item.fibres}</td>
              <td className="border-b px-4 py-2 text-center">
                {item.calories}
              </td>
              <td className="border-b px-4 py-2">{item.micronutriments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RationTab;
