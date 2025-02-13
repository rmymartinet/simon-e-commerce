"use client";

import React, { useState } from "react";
import Filter from "../_components/Filter";
import CardPriceContainer from "../_components/Card/CardPriceContainer";
import FeaturesContainer from "../_components/Features/FeaturesContainer";
import ItemsFeatures from "../_components/Features/ItemsFeatures";
import FeedBackContainer from "../_components/FeedBack/FeedBackContainer";
import Faq from "../_components/Faq";
import { featuresCoaching, featuresProgram } from "../data/featuresData";
import { Session } from "next-auth";
import { useGSAP } from "@gsap/react";
import { textSplitLines } from "@/utils/common/textAnimation";

function PrincingComponents({ session }: { session: Session | null }) {
  const [filterName, setFilterName] = useState("programmes");
  const titleRef = React.useRef<HTMLDivElement>(null);
  const subtitleRef = React.useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (titleRef.current && subtitleRef.current) {
      textSplitLines(titleRef as React.RefObject<HTMLElement>, 2);
      textSplitLines(subtitleRef as React.RefObject<HTMLElement>, 2);
    }
  }, []);

  return (
    <>
      <div className="flex w-full flex-col justify-center">
        <div ref={titleRef} className="flex flex-col">
          <h1 className="text-3xl md:text-4xl lg:text-7xl">Tarifs simples</h1>
          <h1 className="text-3xl md:text-4xl lg:text-7xl">
            Conçus pour vous.
          </h1>
        </div>
        <p ref={subtitleRef} className="font-medium text-muted md:text-xl">
          Programme sans suivi. Coaching avec suivi.
        </p>
      </div>
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <CardPriceContainer filterName={filterName} session={session} />
      {filterName === "programmes" && (
        <FeaturesContainer
          title="Avantages supplémentaires"
          text="Progresse en toute autonomie grâce à un guide personnalisé qui s’adapte à tes objectifs. Suis un programme sur-mesure et évolue à ton rythme."
          coaching={false}
        >
          {featuresProgram.map((item, index) => (
            <ItemsFeatures
              key={index}
              logo={item.logo}
              title={item.title}
              paragraph={item.description}
            />
          ))}
        </FeaturesContainer>
      )}
      {filterName === "coaching" && (
        <FeaturesContainer
          title="Accès Membre"
          text="Débloquez un potentiel illimité avec notre abonnement. Un accompagnement personnalisé et des résultats durables, à chaque étape."
          coaching={true}
        >
          {featuresCoaching.map((item, index) => (
            <ItemsFeatures
              key={index}
              logo={item.logo}
              title={item.title}
              paragraph={item.description}
            />
          ))}
        </FeaturesContainer>
      )}
      <FeedBackContainer />
      <Faq filterName={filterName} />
    </>
  );
}

export default PrincingComponents;
