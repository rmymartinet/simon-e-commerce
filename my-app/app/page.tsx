"use client";

import BeforeAfterPhoto from "@/components/BeforeAfterPhoto";
import CoachingOverview from "@/components/coaching/CoachingOverview";
import Header from "@/components/Header/Header";
import ProgramOverview from "@/components/Programs/ProgramOverview";
import Youtube from "@/components/Programs/Youtube";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export default function Home() {
  return (
    <section className="flex flex-col items-center">
      <Header />
      <ProgramOverview />
      <Youtube />
      <CoachingOverview />
      <BeforeAfterPhoto />
    </section>
  );
}
