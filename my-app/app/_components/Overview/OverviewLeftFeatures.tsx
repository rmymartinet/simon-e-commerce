import { revealRotateEl } from "@/app/utils/Animation";
import { OverviewLeftAndRightFeaturesProps } from "@/types/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import CircleChart from "../Circlechart";
import Iphone from "./Iphone";

gsap.registerPlugin(useGSAP);

const OverviewLeftFeatures = ({
  isCoaching,
  title,
  text,
}: OverviewLeftAndRightFeaturesProps) => {
  const data = {
    carbs: 250,
    proteins: 300,
    fats: 240,
  };

  const containerRef = useRef(null);

  useGSAP(() => {
    revealRotateEl(containerRef);
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-white h-[65vh] w-full rounded-2xl lg:col-start-2-end-3 grid p-6 gap-20"
      style={{
        gridTemplateRows: "250px max-content",
      }}
    >
      {!isCoaching && <CircleChart data={data} />}
      {isCoaching && <Iphone imagesUrl="/images/calorie.png" />}
      <div className="flex flex-col gap-2 self-center">
        <h1 className="text-4xl">{title}</h1>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default OverviewLeftFeatures;
