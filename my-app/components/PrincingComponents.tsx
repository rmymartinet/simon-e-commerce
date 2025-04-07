"use client";

import React, { useState } from "react";

import { Session } from "next-auth";
import TitleComponent from "./TitleComponent";
import Filter from "./Filter";
import CardPriceContainer from "./Card/CardPriceContainer";
import FeedBackContainer from "./FeedBack/FeedBackContainer";
import Faq from "./Faq";

function PrincingComponents({ session }: { session: Session | null }) {
  const [filterName, setFilterName] = useState("programmes");

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <TitleComponent
          titleIndication="Tarifs"
          title="Tarifs simples. Conçus pour vous."
          subtitle="Programme sans suivi. Coaching avec suivi."
        />
      </div>
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <CardPriceContainer filterName={filterName} session={session} />
      <FeedBackContainer />
      <Faq filterName={filterName} />
    </>
  );
}

export default PrincingComponents;
