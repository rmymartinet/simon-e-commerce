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
      <div className="flex flex-col items-center justify-center gap-20">
        <div className="mb-10 flex flex-col items-center gap-4">
          <h1 className="md:text-title text-center text-5xl font-bold">
            Des solutions conçues pour vous
          </h1>
          <p className="text-center text-lg font-medium text-subtle md:text-start">
            Choisissez entre nos programmes en autonomie ou notre suivi
            personnalisé
          </p>
        </div>
        <Filter filterName={filterName} setFilterName={setFilterName} />
        <CardPriceContainer filterName={filterName} session={session} />
      </div>
      {filterName === "programmes" && (
        <FeaturesContainer
          title="Bonus inclus dans tous nos programmes"
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
          title="Bonus inclus dans tous nos coachings"
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
      <Faq filterName={filterName} />
    </>
  );
}

export default PrincingComponents;
