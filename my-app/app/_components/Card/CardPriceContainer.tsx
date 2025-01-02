import { coachingData, programData } from "@/app/data/cardPriceContainerData";
import Stars from "../Stars";
import CardPrice from "./CardPrice";

const CardPriceContainer = ({ filterName }: { filterName: string }) => {
  return (
    <>
      {filterName === "programmes" && (
        <div className="relative flex flex-col place-content-center items-center gap-4 px-4 md:gap-0 md:px-0 lg:grid lg:grid-cols-3">
          <div className="animate-bg-purple absolute bottom-0 right-0 -z-10 h-full w-full"></div>
          <Stars
            yposition="-top-10"
            xposition="left-0"
            height="h-20"
            weight="w-full"
            isTop={false}
          />
          <Stars
            yposition="-bottom-10"
            xposition="left-0"
            height="h-20"
            weight="w-full"
            isTop={false}
          />
          <Stars
            yposition="top-0"
            xposition="-right-10"
            height="h-full"
            weight="w-20"
            isTop={true}
          />

          <Stars
            yposition="top-0"
            xposition="-left-10"
            height="h-full"
            weight="w-20"
            isTop={true}
          />

          {programData.map((data) => (
            <CardPrice
              key={data.titlePlan}
              productData={data}
              filterName={filterName}
            />
          ))}
        </div>
      )}
      {filterName === "coaching" && (
        <div className="relative flex flex-col place-content-center items-center gap-4 px-4 md:px-0 lg:grid lg:grid-cols-3 lg:gap-0">
          <div className="animate-bg-purple absolute bottom-0 right-0 -z-10 h-full w-full"></div>
          <Stars
            yposition="-top-10"
            xposition="left-0"
            height="h-20"
            weight="w-full"
            isTop={false}
          />
          <Stars
            yposition="-bottom-10"
            xposition="left-0"
            height="h-20"
            weight="w-full"
            isTop={false}
          />
          <Stars
            yposition="top-0"
            xposition="-right-10"
            height="h-full"
            weight="w-20"
            isTop={true}
          />

          <Stars
            yposition="top-0"
            xposition="-left-10"
            height="h-full"
            weight="w-20"
            isTop={true}
          />
          {coachingData.map((data) => (
            <CardPrice
              key={data.titlePlan}
              productData={data}
              filterName={filterName}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CardPriceContainer;
