"use client";

import BeforeAfterPhoto from "@/components/BeforeAfterPhoto";
import AppDetails from "@/components/coaching/AppDetails";
import CoachingNutrition from "@/components/coaching/CoachingNutrition";
import CoachingOverview from "@/components/coaching/CoachingOverview";
import CoachingTransitionSection from "@/components/CoachingTransitionSection";
import Header from "@/components/Header/Header";
import NutritionAdvice from "@/components/program/NutritionAdvice";
import Youtube from "@/components/program/Youtube";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
