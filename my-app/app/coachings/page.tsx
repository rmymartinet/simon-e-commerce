"use client";

import BeforeAfterPhoto from "@/components/BeforeAfterPhoto";
import PremiumCoachingsSlider from "@/components/coaching/PremiumCoachingsSlider";
import TitleComponent from "@/components/TitleComponent";
import PriceCoachingsContainer from "@/components/coaching/PriceCoachingsContainer";
import CoachingsApps from "@/components/coaching/CoachingsApps";
import AfterPurchaseSteps from "@/components/AfterPurchaseSteps";
import { coachingsSteps } from "../data/afterPurchaseSteps";
import Faq from "@/components/Faq/Faq";

export default function CoachingsPage() {



  return (
    <main className="flex min-h-screen flex-col px-4 pt-[20vh]">
      <TitleComponent
        title="Coachings"
        titleIndication="coachings"
        subtitle="Découvrez nos coachings pour atteindre vos objectifs."
      />
      
      <PriceCoachingsContainer />
      <PremiumCoachingsSlider />
      <CoachingsApps/>
      <BeforeAfterPhoto />
      <AfterPurchaseSteps data={coachingsSteps} />
      <Faq />
    </main>
  );
}
