import {
  coachingIncludes3Mounth,
  coachingIncludes6Mounth,
  coachingIncludes9Mounth,
  programIncludes,
} from "../../data/cardPrice";
import Stars from "../Stars";
import CardPrice from "./CardPrice";

export const coachingData = [
  {
    title: "Essai",
    mounth: 3,
    dayPrice: "5",
    price: "147",
    description:
      "Testez nos services et observez les premiers changements. Parfait pour initier votre transformation de style de vie.",
    priceMounthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!,
  },
  {
    title: "Standard",
    mounth: 6,
    dayPrice: "4,50",
    price: "127",
    description:
      "Ancrez des habitudes saines et obtenez des résultats durables. Le meilleur équilibre entre durée et efficacité.",
    priceMounthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!,
    mostPopular: true,
  },
  {
    title: "Intensif",
    mounth: 9,
    dayPrice: "4",
    price: "107",
    description:
      "Transformez-vous totalement avec un suivi intensif. L'engagement ultime pour un changement profond et pérenne.",
    priceMounthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!,
  },
];
export const programData = [
  {
    title: "Débutant",
    price: "77",
    description:
      "Un programme simple pour bien démarrer et poser les bases d’une nouvelle routine. Idéal pour débuter en douceur",

    priceId: process.env.NEXT_PUBLIC_STRIPE_PROGRAM_BEGINNER_PRICE_ID!,
  },
  {
    title: "Intermédiaire",
    price: "87",
    description:
      "Consolidez vos acquis et progressez à votre rythme. Une approche équilibrée pour des résultats visibles",

    priceId: process.env.NEXT_PUBLIC_STRIPE_PROGRAM_BEGINNER_PRICE_ID!,
    mostPopular: true,
  },
  {
    title: "Avancé",
    price: "97",
    description:
      "Pour ceux qui veulent aller plus loin : un programme complet pour des objectifs ambitieux",

    priceId: process.env.NEXT_PUBLIC_STRIPE_PROGRAM_BEGINNER_PRICE_ID!,
  },
];
const CardPriceContainer = ({ filterName }: { filterName: string }) => {
  return (
    <>
      {filterName === "programmes" && (
        <div className="relative flex flex-col place-content-center gap-4 px-4 md:gap-0 md:px-0 lg:grid lg:grid-cols-3">
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

          {programData.map((data, index) => (
            <CardPrice
              key={data.title}
              priceId={data.priceId}
              mostPopular={data.mostPopular}
              filterName={filterName}
              title={data.title}
              price={data.price}
              description={data.description}
              includes={programIncludes}
            />
          ))}
        </div>
      )}
      {filterName === "coaching" && (
        <div className="relative flex flex-col place-content-center lg:grid lg:grid-cols-3">
          <div className="fixed-bg-purple absolute bottom-0 right-0 -z-10 h-full w-full"></div>
          {coachingData.map((data, index) => (
            <CardPrice
              key={data.title}
              priceMounthly={data.priceMounthly}
              filterName={filterName}
              title={data.title}
              dayPrice={data.dayPrice}
              mostPopular={data.mostPopular}
              price={data.price}
              description={data.description}
              mounth={data.mounth}
              includes={
                data.mounth === 3
                  ? coachingIncludes3Mounth
                  : data.mounth === 6
                    ? coachingIncludes6Mounth
                    : coachingIncludes9Mounth
              }
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CardPriceContainer;
