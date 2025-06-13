"use client";

import React, { useEffect, useState } from "react";

import TitleComponent from "./TitleComponent";
import Filter from "./Filter";
import FeedBackContainer from "./FeedBack/FeedBackContainer";
import Faq from "./Faq";
import { BetterAuthSession } from "@/types/types";
import { useSearchParams } from "next/navigation";

function PrincingComponents({
  session,
}: {
  session: BetterAuthSession | null;
}) {
  const searchParams = useSearchParams();
  const defaultFilter = searchParams.get("filter") || "programmes";
  const [filterName, setFilterName] = useState(defaultFilter);

  useEffect(() => {
    const param = searchParams.get("filter");
    if (param) setFilterName(param);
  }, [searchParams]);

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
