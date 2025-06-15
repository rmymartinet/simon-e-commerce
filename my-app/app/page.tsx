"use client";

import BeforeAfterPhoto from "@/components/BeforeAfterPhoto";
import CalendlyCallModal from "@/components/Calendly/CalendlyCallModal";
import CalendlyContainer from "@/components/Calendly/CalendlyContainer";
import CoachingOverview from "@/components/coaching/CoachingOverview";
import Header from "@/components/Header/Header";
import ProgramOverview from "@/components/Programs/ProgramOverview";
import Youtube from "@/components/Programs/Youtube";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";

gsap.registerPlugin(useGSAP);

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <section className="flex flex-col items-center">
      <Header setIsOpen={setIsOpen} />
      <CalendlyCallModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <CalendlyContainer />
      <ProgramOverview />
      <Youtube />
      <CoachingOverview />
      <BeforeAfterPhoto />
    </section>
  );
}
