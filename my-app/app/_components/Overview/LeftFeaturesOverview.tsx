import { revealRotateEl } from "@/app/utils/Animation";
import { OverviewLeftAndRightFeaturesProps } from "@/types/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import CircleChart from "../Calories/CircleChart";
import Iphone from "../Iphone";

gsap.registerPlugin(useGSAP);

const LeftFeaturesOverview = ({
  isCoaching,
  title,
  text,
}: OverviewLeftAndRightFeaturesProps) => {
  const data = {
    carbs: 400,
    proteins: 160,
    fats: 130,
  };
  const containerRef = useRef(null);
  const foodRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    revealRotateEl(containerRef);

    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power2.out", duration: 1 },
    });

    foodRef.current.forEach((el) => {
      tl.fromTo(
        el,
        {
          x: 500,
        },
        {
          x: 0,
          opacity: 1,
        },
        "-=1",
      ).to(el, {
        x: -500,
        delay: 2,
        opacity: 0,
      });
    });
  }, []);

  const foodImages = [
    "/images/food_app/1.png",
    "/images/food_app/2.png",
    "/images/food_app/3.png",
  ];

  return (
    <div
      ref={containerRef}
      className={`${!isCoaching ? "grid grid-rows-2 md:grid-rows-featuresCard" : "grid grid-rows-2"}} w-full overflow-hidden rounded-2xl bg-white p-6 lg:col-start-2-end-3`}
    >
      {!isCoaching && <CircleChart data={data} />}
      {isCoaching && (
        <div className="relative flex h-[50vh] w-full flex-col">
          {foodImages.map((url, index) => (
            <div
              ref={(el) => {
                foodRef.current[index] = el;
              }}
              className="absolute h-full w-full opacity-0"
              key={index}
            >
              <Iphone imagesUrl={url} />
            </div>
          ))}
        </div>
      )}
      <div className="mt-10 flex flex-col gap-4">
        <h1 className="text-3xl">{title}</h1>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default LeftFeaturesOverview;
