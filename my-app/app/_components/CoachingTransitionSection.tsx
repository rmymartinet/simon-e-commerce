import React from "react";
import TitleComponent from "./TitleComponent";

function CoachingTransitionSection() {
  return (
    <section className="relative mt-[20vh] flex h-[] w-screen flex-col items-center justify-center gap-6 bg-[--card-bg] px-4 text-center">
      <span className="text-[20rem] uppercase text-[--subtext] opacity-5">
        Coaching
      </span>
      <div className="absolute z-50">
        <TitleComponent
          title="Progresser durablement, ça ne s'improvise pas."
          subtitle="   En plus des exercices, c’est un suivi humain, une stratégie sur-mesure
        et une vraie motivation qui feront la différence."
          titleIndication="coaching"
        />
      </div>
    </section>
  );
}

export default CoachingTransitionSection;
