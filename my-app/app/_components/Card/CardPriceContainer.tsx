import {
  coachingIncludes3Mounth,
  coachingIncludes6Mounth,
  coachingIncludes9Mounth,
  programIncludes,
} from "../../data/cardPrice";
import CardPrice from "./CardPrice";

interface CardPriceContainerProps {
  filterName: string;
}

const CardPriceContainer = ({ filterName }: CardPriceContainerProps) => {
  return (
    <>
      {filterName === "programmes" && (
        <div className="flex flex-col gap-10 lg:grid lg:w-[80%] lg:grid-cols-3">
          <CardPrice
            title="Débutant"
            price="99"
            text="Un programme simple pour bien démarrer et poser les bases d’une nouvelle routine. Idéal pour débuter en douceur"
            includes={programIncludes}
          />
          <CardPrice
            title="Intermédiaire"
            price="99"
            text="Consolidez vos acquis et progressez à votre rythme. Une approche équilibrée pour des résultats visibles"
            discount="Économisez 16%"
            includes={programIncludes}
          />
          <CardPrice
            title="Avancé"
            bgColor
            price="99"
            text="Pour ceux qui veulent aller plus loin : un programme complet pour des objectifs ambitieux"
            discount="Économisez 23%"
            includes={programIncludes}
          />
        </div>
      )}
      {filterName === "coaching" && (
        <div className="flex flex-col gap-10 px-2 md:px-20 lg:grid lg:w-[80%] lg:grid-cols-3 lg:px-0">
          <CardPrice
            title="Essai"
            mounth="3 mois"
            price="129"
            text="Testez nos services et observez les premiers changements. Parfait pour initier votre transformation de style de vie."
            includes={coachingIncludes3Mounth}
          />
          <CardPrice
            title="Standard"
            mounth="6 mois"
            price="109"
            text="Ancrez des habitudes saines et obtenez des résultats durables. Le meilleur équilibre entre durée et efficacité."
            discount="Economisez 16%"
            includes={coachingIncludes6Mounth}
          />
          <CardPrice
            title="Intensif"
            bgColor
            mounth="9 mois"
            price="99"
            text="Transformez-vous totalement avec un suivi intensif. L'engagement ultime pour un changement profond et pérenne."
            discount="Economisez 23%"
            includes={coachingIncludes9Mounth}
          />
        </div>
      )}
    </>
  );
};

export default CardPriceContainer;
