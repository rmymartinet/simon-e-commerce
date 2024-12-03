import { FaBurn } from "react-icons/fa";

const CaloriesCard = ({
  showResults,
  totalCalories,
  grams,
}: {
  showResults: boolean;
  totalCalories: number;
  grams: {
    carbs: { min: number; max: number };
    proteins: { min: number; max: number };
    fats: { min: number; max: number };
  };
}) => {
  return (
    <div className="col-span-2 flex flex-col gap-16 rounded-xl bg-white p-8">
      <div className="flex">
        <div className="flex items-center gap-4">
          <FaBurn size={20} />
          <span className="flex w-max items-center justify-center rounded-full px-4 py-2 shadow-inner">
            Total des calories
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-10 md:gap-10">
        <div className="flex-2 flex flex-col gap-4 text-lg">
          <span className="w-max text-xl font-medium text-button">
            {showResults && totalCalories} calories/jours
          </span>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-xl bg-[#f28e2c]"></span>
            <p>
              Entre {showResults && grams.carbs.min} et{" "}
              {showResults && grams.carbs.max} g de glucides/jours
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-xl bg-[#e15759]"></span>
            <p>
              Entre {showResults && grams.proteins.min} et{" "}
              {showResults && grams.proteins.max} g de protéines/jours
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-xl bg-[#76b7b2]"></span>
            <p>
              Entre {showResults && grams.fats.min} et{" "}
              {showResults && grams.fats.max} g de lipides/jours
            </p>
          </div>
        </div>
        <p className="text-pretty text-slate-400">
          Ces données fournissent une base solide, mais d’autres facteurs comme
          votre métier, vos objectifs, vos jours d’entraînement, la fatigue et
          les fluctuations quotidiennes doivent également être pris en compte
          pour un suivi optimal.
        </p>
      </div>
    </div>
  );
};

export default CaloriesCard;
