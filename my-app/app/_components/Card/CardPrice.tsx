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
}: CardPriceProps) => {
  return (
    <div
      className={`relative flex flex-col rounded-3xl px-10 py-7 ${
        bgColor
          ? "scale-105 bg-[#10002B] text-white"
          : "bg-[#ECE0F5] text-black"
      }`}
    >
      {bgColor && (
        <>
          <div className="absolute -top-4 left-1/2 w-max -translate-x-1/2 rounded-xl bg-[#9D4EDD] px-4 text-lg text-white md:left-[80%]">
            Plus populaire
          </div>
        </>
      )}
      <div className="mb-20 flex justify-between">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="flex flex-col gap-4">
          {mounth && (
            <span className="flex w-max items-center justify-center rounded-full px-4 py-2 shadow-inner">
              {mounth}
            </span>
          )}
        </div>
      </div>
      <Price price={price} mounth={mounth} />
      <div className="grid grid-rows-cardPrice">
        <p className="mt-10 text-center md:text-start">{text}</p>
        <button className="bg-button mb-10 w-full self-end rounded-xl px-4 py-4 text-center text-lg font-semibold text-white">
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
