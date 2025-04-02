"use client";

import React, { useState } from "react";
import Filter from "../_components/Filter";
import CardPriceContainer from "../_components/Card/CardPriceContainer";
import FeedBackContainer from "../_components/FeedBack/FeedBackContainer";
import Faq from "../_components/Faq";
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
      <div className="flex w-full flex-col items-center justify-center">
        <div
          ref={titleRef}
          className="flex flex-col items-center justify-center"
        >
          <div className="mb-10 uppercase">
            <p className="text-sm">Tarif</p>
          </div>

          <h1 className="text-3xl md:text-6xl">
            Tarifs simples. Conçus pour vous.
          </h1>
          <p
            ref={subtitleRef}
            className="mt-4 font-medium text-muted md:text-xl"
          >
            Programme sans suivi. Coaching avec suivi.
          </p>
        </div>
      </div>
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <CardPriceContainer filterName={filterName} session={session} />
      <FeedBackContainer />
      <Faq filterName={filterName} />
    </>
  );
}

export default PrincingComponents;
