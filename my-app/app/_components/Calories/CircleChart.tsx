import { CircleChartProps } from "@/types/types";

const CircleChart = ({ data }: CircleChartProps) => {
  const { carbs, proteins, fats } = data;

  const carbsPercentage = 50;
  const proteinsPercentage = 30;
  const fatsPercentage = 20;

  console.log(carbsPercentage, proteinsPercentage, fatsPercentage);

  return (
    <figure className="relative flex h-full w-full items-start justify-center">
      <figcaption className="absolute bottom-0 grid grid-cols-3 items-center justify-items-center gap-10">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-xl bg-[#f28e2c]"></span>
          <div className="flex gap-2">
            <p>Glucides</p>
            <p>{carbs} g</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-xl bg-[#e15759]"></span>
          <div className="flex gap-2">
            <p>Protéines</p>
            <p>{proteins} g</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-xl bg-[#76b7b2]"></span>
          <div className="flex gap-2">
            <p>Lipides</p>
            <p>{fats} g</p>
          </div>
        </div>
      </figcaption>

      <div
        className="relative h-[80%] w-[80%] rounded-full"
        style={{
          background: `radial-gradient(
        circle closest-side,
        white 0,
        white 47.57%,
        transparent 47.57%,
        transparent 67%,
        white 0
      ),
      conic-gradient(
        #f28e2c 0% ${carbsPercentage}%,
        #e15759 ${carbsPercentage}% ${carbsPercentage + proteinsPercentage}%, 
        #76b7b2 ${carbsPercentage + proteinsPercentage}% ${carbsPercentage + proteinsPercentage + fatsPercentage}%, 
        #d3d3d3 ${carbsPercentage + proteinsPercentage + fatsPercentage}% 100%
      )`,
        }}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-2xl font-semibold">2500</h1>
        </div>
      </div>
    </figure>
  );
};

export default CircleChart;
