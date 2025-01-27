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

function PrincingComponents({ session }: { session: Session | null }) {
  const [filterName, setFilterName] = useState("programmes");

  return (
    <>
      <div className="flex w-full flex-col justify-center">
        <div className="mb-10 flex flex-col">
          <h1 className="text-4xl lg:text-8xl">Tarifs simples</h1>
          <h1 className="text-4xl lg:text-8xl">Conçus pour vous.</h1>
        </div>
        <p className="text-center text-xl font-medium md:text-start lg:mt-4">
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
          title="Accès Premium"
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
