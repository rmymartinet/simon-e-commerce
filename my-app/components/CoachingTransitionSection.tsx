"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { textSplitLinesScrollTrigger } from "@/utils/common/textAnimation";
import TitleComponent from "./TitleComponent";
import AreaChartComponent from "./chart/AreaChart";
import DonutChartComponent from "./chart/DonutChart";

const CoachingSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    textSplitLinesScrollTrigger(titleRef as React.RefObject<HTMLElement>);
    textSplitLinesScrollTrigger(textRef as React.RefObject<HTMLElement>);
  }, []);

  return (
    <>
      {/* 🔁 Transition section avec les charts */}
      <section className="relative mt-[20vh] flex w-full flex-col items-center justify-center gap-10 px-4 text-center">
        <div className="z-50 max-w-4xl">
          <TitleComponent
            title="Progresser durablement, ça ne s'improvise pas."
            subtitle="En plus des exercices, c’est un suivi humain, une stratégie sur-mesure et une vraie motivation qui feront la différence."
            titleIndication="coaching"
          />
        </div>

        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
          <AreaChartComponent />
          <DonutChartComponent />
        </div>
      </section>
    </>
  );
};

export default CoachingSection;
