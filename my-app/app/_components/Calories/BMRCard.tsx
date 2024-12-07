import { IoMdSpeedometer } from "react-icons/io";

const BMRCard = ({ BMR }: { BMR: number }) => {
  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-xl bg-white p-4">
      <div className="flex items-center gap-4">
        <IoMdSpeedometer size={20} />
        <span className="flex w-max items-center justify-center rounded-full px-4 py-2 shadow-inner">
          MB (Métabolisme de base){" "}
        </span>
      </div>
      <p>
        <span className="font-medium">MB:</span> {BMR} kcal/jours
      </p>
      <p className="text-center text-slate-400">
        il s’agit de l’énergie minimale que votre corps dépense au repos pour
        survivre (respirer, digérer, etc.).
      </p>
    </div>
  );
};

export default BMRCard;
