import { coachingIncludes9Month, programIncludes } from "../data/cardPriceData";
import AvailableOffers from "./AvailableOffers";

const AvailableOfferContainer = () => {
  return (
    <section className="mt-[20vh] flex w-screen flex-col items-center gap-20 overflow-hidden">
      <div className="flex items-center justify-center overflow-hidden text-sm font-bold">
        <div className="program-title-gradient-l h-[2px] w-60 rounded-full"></div>
        <div className="relative">
          <div className="bg-pg-title absolute left-1/2 top-1/2 -z-10 h-4 w-[9rem] -translate-x-1/2 -translate-y-1/2 blur-lg"></div>
          <p className="px-4 text-lg text-[#f690ff]">Offres</p>
        </div>
        <div className="program-title-gradient-r h-[2px] w-60 rounded-full"></div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-center text-3xl font-bold">
          Trouvez l’offre qui vous correspond{" "}
        </h1>
        <p className="text-center text-lg font-semibold text-subtle">
          Choisissez entre programmes autonomes et coaching personnalisé.{" "}
        </p>
      </div>
      <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2">
        <AvailableOffers
          title="Programmes"
          follow="Sans suivi"
          subtitle="Adapté à votre niveau"
          features={programIncludes}
        />
        <AvailableOffers
          title="Coaching"
          follow="Avec suivi"
          subtitle="Suivi sur mesure"
          features={coachingIncludes9Month}
        />
      </div>
    </section>
  );
};

export default AvailableOfferContainer;
