import { coachingData, programData } from "@/app/data/cardPriceContainerData";
import Stars from "../Stars";
import CardPrice from "./CardPrice";
import { Session } from "next-auth";

const CardPriceContainer = ({
  filterName,
  session,
}: {
  filterName: string;
  session: Session | null;
}) => {
  return (
    <div className="w-screen">
      {filterName === "programmes" && (
        <div className="relative flex flex-col place-content-center items-center justify-items-center gap-4 md:gap-0 md:px-0 lg:flex-row lg:gap-4">
          {programData.map((data) => (
            <CardPrice
              key={data.titlePlan}
              productData={data}
              filterName={filterName}
              session={session}
            />
          ))}
        </div>
      )}
      {filterName === "coaching" && (
        <div className="relative flex flex-col justify-center gap-4 md:gap-0 md:px-0 lg:flex-row lg:gap-4">
          {coachingData.map((data) => (
            <CardPrice
              key={data.titlePlan}
              productData={data}
              filterName={filterName}
              session={session}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardPriceContainer;
