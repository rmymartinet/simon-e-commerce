"use client";

import React, { useState } from "react";
import Filter from "../_components/Filter";
import CardPriceContainer from "../_components/Card/CardPriceContainer";
import FeedBackContainer from "../_components/FeedBack/FeedBackContainer";
import Faq from "../_components/Faq";
import { Session } from "next-auth";
import TitleComponent from "./TitleComponent";

function PrincingComponents({ session }: { session: Session | null }) {
  const [filterName, setFilterName] = useState("programmes");
  const titleRef = React.useRef<HTMLDivElement>(null);
  const subtitleRef = React.useRef<HTMLParagraphElement>(null);

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <TitleComponent
          titleRef={titleRef}
          subtitleRef={subtitleRef}
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
