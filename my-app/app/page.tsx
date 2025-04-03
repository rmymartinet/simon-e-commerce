"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import BeforeAfterPhoto from "./_components/BeforeAfterPhoto";
import Header from "./_components/Header/Header";
import Youtube from "./_components/program/Youtube";
import CoachingOverview from "./_components/coaching/CoachingOverview";
import AppDetails from "./_components/coaching/AppDetails";
import CoachingNutrition from "./_components/coaching/CoachingNutrition";
import NutritionAdvice from "./_components/program/NutritionAdvice";
import CoachingTransitionSection from "./_components/CoachingTransitionSection";

gsap.registerPlugin(useGSAP);

export default function Home() {
  return (
    <section className="flex flex-col items-center">
      <Header />
      <NutritionAdvice />
      <Youtube />
      <CoachingTransitionSection />
      <CoachingOverview />
      <AppDetails />
      <CoachingNutrition />
      <BeforeAfterPhoto />
    </section>
  );
}
