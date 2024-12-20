import { MdOutlineWaterDrop } from "react-icons/md";

const WaterCard = () => {
  return (
    <div className="card flex w-full flex-col items-center gap-10 rounded-xl bg-white p-4">
      <div className="flex items-center gap-4">
        <MdOutlineWaterDrop size={20} />
        <span className="flex w-max items-center justify-center rounded-full px-4 py-2 shadow-inner">
          Total d&apos;eau à consommer par jour
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-10">
        <div className="flex -rotate-180 items-center justify-center">
          <div className="relative h-[50px] w-[40px] overflow-hidden rounded-t-full border-4 border-black">
            <div className="wave"></div>
          </div>
        </div>
        <div>
          <p className="font-medium">Consommez 2 à 3 litres par jours</p>
        </div>
      </div>
    </div>
  );
};

export default WaterCard;
