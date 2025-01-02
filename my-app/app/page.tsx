"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import BeforeAfterPhoto from "./_components/BeforeAfterPhoto";
import Header from "./_components/Header/Header";
import Youtube from "./_components/program/Youtube";
import NutritionGrid from "./_components/coaching/NutritionGrid";
import ProgramOverview from "./_components/program/ProgramOverview";
import CoachingOverview from "./_components/coaching/CoachingOverview";
import AppDetails from "./_components/coaching/AppDetails";
import CoachingNutrition from "./_components/coaching/CoachingNutrition";
import AppOverview from "./_components/coaching/AppOverview";
import EvolvingProgram from "./_components/program/EvolvingProgram";
import AvailableOfferContainer from "./_components/AvailableOfferContainer";
import NutritionAdvice from "./_components/program/NutritionAdvice";

gsap.registerPlugin(useGSAP);

export default function Home() {
  return (
    <section className="flex flex-col items-center">
      <Header />
      <AvailableOfferContainer />
      <ProgramOverview />
      <EvolvingProgram />
      <NutritionAdvice />
      <Youtube />
      <CoachingOverview />
      <AppOverview />
      <AppDetails />
      <CoachingNutrition />
      <NutritionGrid />
      <BeforeAfterPhoto />
      <AvailableOfferContainer />
    </section>
  );
}
