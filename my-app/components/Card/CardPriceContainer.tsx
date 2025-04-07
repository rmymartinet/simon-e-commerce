import { coachingData, programData } from "@/app/data/cardPriceContainerData";
import CardPrice from "./CardPrice";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { BetterAuthSession } from "@/types/types";

gsap.registerPlugin(useGSAP);

const CardPriceContainer = ({
  filterName,
  session,
}: {
  filterName: string;
  session: BetterAuthSession | null;
}) => {
  const cardContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cardContainerChildren = cardContainerRef.current?.children;

    if (cardContainerChildren) {
      gsap.set(cardContainerChildren, {
        yPercent: 100,
        filter: "blur(70px)",
      });

      gsap.to(cardContainerChildren, {
        yPercent: 0,
        duration: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        stagger: 0.1,
      });
    }
  }, []);

  return (
    <div className="w-screen">
      {filterName === "programmes" && (
        <div
          ref={cardContainerRef}
          className="relative flex w-full flex-col items-center justify-items-center gap-4 px-4 md:gap-0 lg:grid lg:grid-cols-3 lg:gap-4"
        >
          {programData.map((data, index) => (
            <CardPrice
              key={data.titlePlan}
              productData={data}
              filterName={filterName}
              session={session}
              isHighlighted={index === 1}
            />
          ))}
        </div>
      )}
      {filterName === "coaching" && (
        <div className="relative flex w-full flex-col items-center justify-items-center gap-4 px-4 md:gap-0 lg:grid lg:grid-cols-3 lg:gap-4">
          {coachingData.map((data, index) => (
            <CardPrice
              key={data.titlePlan}
              productData={data}
              filterName={filterName}
              session={session}
              isHighlighted={index === 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardPriceContainer;
