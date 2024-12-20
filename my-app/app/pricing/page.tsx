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
    <div className="relative mt-[30vh] flex min-h-screen w-screen flex-col items-center justify-center gap-40 overflow-hidden">
      <div className="absolute left-0 top-0 -z-10 h-full w-full"></div>
      <div className="flex flex-col items-center justify-center gap-20">
        <div className="mb-10 flex flex-col items-center gap-4">
          <h1 className="md:text-title text-center text-5xl font-bold">
            Des plans conçus pour répondre à vos besoins
          </h1>
          <p className="text-center text-lg font-semibold text-textOpacity md:text-start">
            Des solutions pensées pour chaque étape de ton parcours{" "}
          </p>
        </div>
        <Filter filterName={filterName} setFilterName={setFilterName} />
        <CardPriceContainer filterName={filterName} />
      </div>
      {filterName === "programmes" && (
        <FeaturesContainer
          title="Inclus dans tous les programmes"
          text="sans suivi"
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
          title="Inclus dans tous les coachings"
          text="avec suivi"
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
      <Faq />
    </div>
  );
}
