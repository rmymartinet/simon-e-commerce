"use client";

import TitleComponent from "../TitleComponent";
import PriceCoachingsContainer from "./PriceCoachingsContainer";

const CoachingContainer = () => {
  return (
    <div className="mt-[20vh]">
      <TitleComponent
        title="Coachings"
        titleIndication="coachings"
        subtitle="Découvrez nos coachings pour atteindre vos objectifs."
      />
      <PriceCoachingsContainer />
    </div>
  );
};

export default CoachingContainer;
