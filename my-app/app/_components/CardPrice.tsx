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
      className={`flex flex-col px-10 py-7 rounded-3xl relative ${
        bgColor ? "border-4 border-[#B06FF9] bg-white" : "bg-white"
      }`}
    >
      {/* <div className="absolute footer-gradient top-0 left-0 w-full h-full -z-10"></div> */}
      <div className="flex justify-between mb-20">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="flex flex-col gap-4">
          {mounth && (
            <span className="flex items-center justify-center py-2 px-4 rounded-full w-max  shadow-inner">
              {mounth}
            </span>
          )}
        </div>
      </div>

      <Price price={price} mounth={mounth} />
      <div className="grid grid-rows-cardPrice">
        <p className="text-center md:text-start mt-10">{text}</p>
        <button className="bg-[#B06FF9] py-4 px-4 w-full text-white text-center rounded-2xl self-end mb-10">
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
