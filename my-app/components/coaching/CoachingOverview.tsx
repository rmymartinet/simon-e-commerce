import { useGSAP } from "@gsap/react";
import { textSplitLinesScrollTrigger } from "@/utils/common/textAnimation";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { IoAddOutline } from "react-icons/io5";
import OfferCard from "./OfferCard";
import Counter from "./Counter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import TitleComponent from "../TitleComponent";

gsap.registerPlugin(ScrollTrigger);

const CoachingOverview = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const countContainerRef = useRef<HTMLDivElement>(null);

  const [programsCount, setProgramsCount] = useState(0);
  const [successRate, setSuccessRate] = useState(0);
  const [coachingCount, setCoachingCount] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: countContainerRef.current,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        setIsCounting(true);
      },
    });
  }, []);

  useEffect(() => {
    if (!isCounting) return;

    const programsInterval = setInterval(() => {
      if (programsCount < 250) {
        setProgramsCount((prev) => prev + 1);
      }
    }, 3);

    const successInterval = setInterval(() => {
      if (successRate < 85) {
        setSuccessRate((prev) => prev + 1);
      }
    }, 3);

    const coachingInterval = setInterval(() => {
      if (coachingCount < 200) {
        setCoachingCount((prev) => prev + 1);
      }
    }, 3);

    return () => {
      clearInterval(programsInterval);
      clearInterval(successInterval);
      clearInterval(coachingInterval);
    };
  }, [programsCount, successRate, coachingCount, isCounting]);

  useGSAP(() => {
    textSplitLinesScrollTrigger(titleRef as React.RefObject<HTMLElement>);
    textSplitLinesScrollTrigger(textRef as React.RefObject<HTMLElement>);
  }, []);
  return (
    <section
      id="coaching"
      className="mx-auto mt-20 flex w-screen max-w-[90vw] flex-col items-center overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-20 text-black md:mt-[20vh] md:gap-10"
    >
      <TitleComponent
        title="Un coaching sur-mesure"
        titleIndication="coaching"
        subtitle="Un coach à tes côtés, à chaque étape. Bénéficie d’un suivi personnalisé, d’un accompagnement quotidien et d’ajustements en temps réel. Ensemble, on va plus loin : je suis là pour te guider, te booster et t’aider à rester sur la bonne voie."
      />
      <Button variant="blackBg" className="mt-4">
        <Link href="/pricing?filter=coaching">Découvrir les offres</Link>
      </Button>

      <div className="mt-20 flex max-w-7xl flex-col place-content-center place-items-center gap-10 md:grid md:grid-cols-3 md:gap-40">
        <Counter
          target={250}
          countSign="+"
          title="Programmes personnalisés"
          subtitle="plans d'entraînement conçus sur mesure pour répondre aux besoins spécifiques de chaque profil : niveau, objectif, emploi du temps et contraintes physiques."
        />
        <Counter
          target={85}
          countSign="%"
          title="Taux de réussite"
          subtitle="de mes clients atteignent leurs objectifs en moins de 3 mois grâce à un plan clair, un suivi rigoureux et une méthode adaptée à leur niveau."
        />
        <Counter
          target={200}
          countSign="+"
          title="Coaching & Suivis réalisés"
          subtitle="personnes accompagnées de manière individuelle avec un suivi adapté, des ajustements réguliers et un vrai lien humain, au-delà du simple programme."
        />
      </div>

      {/* Bloc “Virtual Gym + + + Food App” */}

      <div className="my-20">
        <h2 className="max-w-7xl text-center text-xl font-bold md:text-4xl">
          <FaQuoteLeft className="inline-block text-2xl" /> Avec Virtual Gym et
          Food App, tu auras tous tes plans d&apos;entrainement et ta nutrition
          sous la main. Je pourrais voir en temps réel ta progression et ajuster
          mes conseils en conséquence.{" "}
          <FaQuoteRight className="inline-block text-2xl" />
        </h2>
      </div>
      <div className="mt-20 grid grid-cols-1 items-center justify-items-center gap-4 text-[--subtitle] sm:grid-cols-3">
        <span className="text-xl font-semibold text-black sm:text-2xl">
          Virtual Gym
        </span>
        <div className="rounded-full border-2 border-black bg-green-400 p-1">
          <IoAddOutline className="text-2xl text-black" />
        </div>
        <span className="text-xl font-semibold text-black sm:text-2xl">
          Food App
        </span>
      </div>

      {/* Conteneur d’images (deux colonnes en desktop, une en mobile) */}
      <div className="relative mt-10 grid w-full max-w-6xl grid-cols-1 place-items-center gap-4 overflow-hidden rounded-2xl shadow-lg md:grid-cols-2">
        <Image
          src="/images/virtualgym_app/home_screen.png"
          alt="Virtual Gym App"
          width={1000}
          height={1000}
          className="h-full w-full rounded-lg object-cover"
          quality={100}
        />
        <Image
          src="/images/food_app/iphone_food_app.png"
          alt="Food App"
          width={2000}
          height={2000}
          className="h-full w-full rounded-lg object-cover"
          quality={100}
        />
      </div>

      {/* Bloc “Quel offre choisir ?” */}
      <div className="mt-20 flex flex-col items-center gap-10 px-4 sm:px-10 md:px-20">
        <div className="max-w-4xl text-center">
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Quel offre choisir ?
          </h1>
          <p className="mb-8 text-pretty text-base sm:text-lg">
            3, 6 ou 9 mois : tout dépend de ton point de départ et jusqu&apos;où
            tu veux aller. Un programme plus long, c&apos;est plus de suivi,
            plus d&apos;ajustements, et plus de temps pour transformer tes
            habitudes durablement. Commence simplement, progresse solidement, ou
            vise haut : c&apos;est à toi de choisir.
          </p>
        </div>

        {/* Grille des OfferCard : 1 colonne en mobile, 2 en MD, 3 en LG */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <OfferCard
            month="3"
            price="À moins de 5€/jour"
            description="Testez nos services et observez les premiers changements. Parfait pour initier votre transformation de style de vie."
            features={[
              "Accès aux applications Virtuagym et Food",
              "Ajustements bi-mensuels",
              "Planification de la récupération",
              "Support prioritaire 24/7",
              "Séances de coaching en visio mensuelles",
            ]}
            urlLink={`/pricing?filter=coaching&month=3`}
            buttonText="Découvrir"
          />
          <OfferCard
            month="6"
            price="À moins de 4,50 €/jour"
            description="Ancrez des habitudes saines et obtenez des résultats durables. Le meilleur équilibre entre durée et efficacité."
            features={[
              "Accès aux applications Virtuagym et Food",
              "Ajustements bi-mensuels",
              "Planification de la récupération",
              "Support prioritaire 24/7",
              "Séances de coaching en visio mensuelles",
              "Accès à des ressources exclusives",
            ]}
            urlLink={`/pricing?filter=coaching&month=6`}
            buttonText="Découvrir"
          />
          <OfferCard
            month="9"
            price="À moins de 4€/jour"
            description="Testez nos services et observez les premiers changements. Parfait pour initier votre transformation de style de vie."
            features={[
              "Accès aux applications Virtuagym et Food",
              "Programme d’entraînement évolutif",
              "Évaluation trimestrielle complète",
              "Conseils nutrition avancés et réévaluations régulières",
              "Séances de coaching en visio (hebdomadaires au besoin)",
              "Accès à des ressources exclusives",
              "Support prioritaire 24/7",
              "Plan de maintien personnalisé en fin de programme",
            ]}
            urlLink={`/pricing?filter=coaching&month=9`}
            buttonText="Découvrir"
          />
        </div>
      </div>
    </section>
  );
};

export default CoachingOverview;
