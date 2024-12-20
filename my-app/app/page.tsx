"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import BeforeAfterPhoto from "./_components/BeforeAfterPhoto";
import Header from "./_components/Header/Header";
import AvailableOffers from "./_components/AvailableOffers";
import { coachingIncludes9Mounth, programIncludes } from "./data/cardPrice";
import Youtube from "./_components/program/Youtube";
import NutritionGrid from "./_components/coaching/NutritionGrid";
import ProgramOverview from "./_components/program/ProgramOverview";
import EvolvingProgram from "./_components/program/ProgramLife";
import ProgramNutrition from "./_components/program/NutritionAdvice";
import CoachingOverview from "./_components/coaching/CoachingOverview";
import AppDetails from "./_components/coaching/AppDetails";
import CoachingNutrition from "./_components/coaching/CoachingNutrition";
import AppOverview from "./_components/coaching/AppOverview";

gsap.registerPlugin(useGSAP);

export default function Home() {
  return (
    <section className="flex flex-col items-center">
      <Header />
      <div className="mt-[20vh] flex flex-col gap-10 lg:grid lg:grid-cols-2">
        <AvailableOffers
          title="Programmes"
          follow="Sans suivi"
          subtitle="Adapté à votre niveau"
          features={programIncludes}
        />
        <AvailableOffers
          title="Coaching"
          follow="Avec suivi"
          subtitle="Suivi sur mesure"
          features={coachingIncludes9Mounth}
        />
      </div>
      <ProgramOverview />
      <EvolvingProgram />
      <ProgramNutrition />
      <Youtube />
      <CoachingOverview />
      <AppOverview />
      <AppDetails />
      <CoachingNutrition />
      <NutritionGrid />
      <BeforeAfterPhoto />
      <div className="relative mt-[20vh] flex flex-col gap-10 lg:grid lg:grid-cols-2">
        <AvailableOffers
          title="Programmes"
          follow="Sans suivi"
          subtitle="Adapté à votre niveau"
          features={programIncludes}
        />
        <AvailableOffers
          title="Coaching"
          follow="Avec suivi"
          subtitle="Suivi sur mesure"
          features={coachingIncludes9Mounth}
        />
      </div>
    </section>
  );
}
