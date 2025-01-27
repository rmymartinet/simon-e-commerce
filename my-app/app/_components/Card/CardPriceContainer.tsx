import { coachingData, programData } from "@/app/data/cardPriceContainerData";
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
        <div className="relative flex w-full flex-col items-center justify-items-center gap-4 px-4 md:gap-0 lg:grid lg:grid-cols-3 lg:gap-4">
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
        <div className="relative flex w-full flex-col items-center justify-items-center gap-4 px-4 md:gap-0 lg:grid lg:grid-cols-3 lg:gap-4">
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
