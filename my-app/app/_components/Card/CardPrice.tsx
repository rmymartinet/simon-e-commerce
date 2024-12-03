import { CardPriceProps } from "@/types/types";
import { IoCheckmarkOutline } from "react-icons/io5";
import Price from "./Price";

const CardPrice = ({
  title,
  mounth,
  price,
  text,
  includes,
  bgColor,
  dayPrice,
}: CardPriceProps) => {
  return (
    <div
      className={`relative flex flex-col rounded-3xl px-10 py-7 ${
        bgColor
          ? "scale-105 bg-[#10002B] text-white"
          : "bg-[#F8F8F8] text-black"
      }`}
    >
      {bgColor && (
        <>
          <div className="popular-box absolute -right-10 -top-4 w-max -translate-x-1/2 rounded-full p-2 font-semibold">
            Meilleur choix
          </div>
        </>
      )}
      <div className="mb-20 flex justify-between">
        <h1 className="text-4xl font-semibold">{title}</h1>
        <div className="flex flex-col gap-4">
          {mounth && (
            <span className="flex w-max items-center justify-center rounded-full px-4 py-2 shadow-inner">
              Durée {mounth}
            </span>
          )}
        </div>
      </div>
      <Price price={price} mounth={mounth} dayPrice={dayPrice} />
      <div className="grid grid-rows-cardPrice">
        <p className="mt-10 text-center md:text-start">{text}</p>
        <button className="mb-10 w-full self-end rounded-xl bg-button px-4 py-4 text-center text-lg font-semibold text-white">
          Acheter
        </button>
        <ul className="flex flex-col gap-3">
          <p className="text-slate-300">Inclus:</p>
          {includes?.map((include, index) => (
            <li key={index} className="flex items-center gap-2">
              <IoCheckmarkOutline />
              {include}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardPrice;
