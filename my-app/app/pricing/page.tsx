"use client";

import { useState } from "react";
import CardPriceContainer from "../_components/Card/CardPriceContainer";
import Faq from "../_components/Faq";
import FeaturesContainer from "../_components/Features/FeaturesContainer";
import ItemsFeatures from "../_components/Features/ItemsFeatures";
import FeedBackContainer from "../_components/FeedBack/FeedBackContainer";
import Filter from "../_components/Filter";
import { featuresCoaching, featuresProgram } from "../data/features";

export default function Pricing() {
  const [filterName, setFilterName] = useState("programmes");

  return (
    <div className="relative mt-32 flex min-h-screen flex-col items-end justify-center gap-40 px-2 md:px-20 lg:px-0">
      <div className="absolute left-0 top-0 -z-10 h-full w-full"></div>
      <div className="flex flex-col items-center justify-center gap-40">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center text-4xl md:text-6xl">
            Une solution pour chaques besoins
          </h1>
          <p className="text-center text-xl text-slate-400 md:text-start">
            Choisissez la solution qui vous conviens le mieux.
          </p>
        </div>
        <Filter filterName={filterName} setFilterName={setFilterName} />
        <CardPriceContainer filterName={filterName} />
      </div>
      {filterName === "programmes" && (
        <FeaturesContainer
          title="Inclus avec votre programme"
          text="sans suivi"
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
          title="Vos avantages en coaching personnalisé"
          text="avec suivi"
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
      <Faq />
    </div>
  );
}
