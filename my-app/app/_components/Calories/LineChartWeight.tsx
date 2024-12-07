import { LineChartWeightProps } from "@/types/types";
import "charts.css";

const LineChartWeight = ({
  startWeight,
  weightChange,
  targetWeight,
}: LineChartWeightProps) => {
  const isLosingWeight = startWeight > targetWeight;
  const weeksToReachTarget = Math.ceil(
    Math.abs(startWeight - targetWeight) / weightChange,
  );

  // Calcul du poids minimal ou maximal à afficher dans le graphique
  const minWeight = isLosingWeight
    ? startWeight - 4 * weightChange
    : startWeight;
  const maxWeight = isLosingWeight
    ? startWeight
    : startWeight + 4 * weightChange;

  // Générer les données pour 4 semaines
  const weeks = Array.from({ length: 4 }, (_, i) => ({
    week: i + 1,
    start: isLosingWeight
      ? startWeight - i * weightChange
      : startWeight + i * weightChange,
    end: isLosingWeight
      ? startWeight - (i + 1) * weightChange
      : startWeight + (i + 1) * weightChange,
  }));

  return (
    <section className="mt-4 flex rounded-xl bg-white p-10 pb-16">
      <div id="line-example-1" className="relative">
        {/* Labels des semaines alignés en dessous */}
        <div className="flex flex-col gap-2 pb-4">
          <h1 className="text-xl font-medium">
            Évolution Théorique du Poids{" "}
            <span className="text-base font-normal text-slate-400">
              (Basé sur 4 semaines)
            </span>
          </h1>
          <p className="text-pretty">
            Pour des valeurs précises et adaptées à vos besoins, explorez nos
            programmes personnalisés.<br></br>
            Pour atteindre votre poids cible il vous faudra{" "}
            <span className="font-medium text-button">
              {weeksToReachTarget} semaines
            </span>
          </p>
        </div>

        {/* Graphique */}
        <table
          className="charts-css line show-data-axes show-4-secondary-axes show-primary-axis"
          style={
            {
              "--start-value": minWeight,
              "--end-value": maxWeight,
            } as React.CSSProperties
          }
        >
          <tbody>
            {weeks.map(({ week, start, end }) => (
              <tr key={week}>
                <td
                  style={
                    {
                      "--start": (start - minWeight) / (maxWeight - minWeight),
                      "--end": (end - minWeight) / (maxWeight - minWeight),
                    } as React.CSSProperties
                  }
                >
                  <span className="data rounded-full bg-button px-2 py-1 font-semibold text-white">
                    {end.toFixed(1)} kg
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Labels des semaines alignés en dessous */}
        <div className="absolute -bottom-10 flex w-full justify-around">
          {weeks.map(({ week }) => (
            <p key={week} className="text-center font-medium">
              Semaine {week}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LineChartWeight;
