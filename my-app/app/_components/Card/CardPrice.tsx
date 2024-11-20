import { CardPriceProps } from "@/types/types";
import { FaBowlFood } from "react-icons/fa6";
import { GiNotebook, GiStairsGoal, GiWeightLiftingUp } from "react-icons/gi";
import { GrGroup } from "react-icons/gr";
import { IoMdBook } from "react-icons/io";
import { IoCheckmarkOutline } from "react-icons/io5";
import { RiYoutubeFill } from "react-icons/ri";
import Price from "./Price";

const icons = {
  book: <IoMdBook />,
  goal: <GiStairsGoal />,
  follower: <GiWeightLiftingUp />,
  food: <FaBowlFood />,
  video: <RiYoutubeFill />,
  notebook: <GiNotebook />,
  group: <GrGroup />,
};

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
        bgColor ? "border-4 border-[#B06FF9] bg-white" : "bg-white"
      }`}
    >
      {/* <div className="absolute footer-gradient top-0 left-0 w-full h-full -z-10"></div> */}
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
        <button className="mb-10 w-full self-end rounded-2xl bg-[#B06FF9] px-4 py-4 text-center text-white">
          Acheter
        </button>

        <ul className="flex flex-col gap-3">
          <p className="text-slate-300">Inclus:</p>
          {includes?.map((include, index) => (
            <li className="flex items-center gap-2">
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
