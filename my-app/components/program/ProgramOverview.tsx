import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TitleComponent from "../TitleComponent";
import BackgroundRadialColor from "../BackgroundRadialColor";
import ProgramCards from "./ProgramCard";

gsap.registerPlugin(useGSAP);

const ProgramOverview = () => {




  return (
    <section
      className="flex w-screen max-w-[90vw] flex-col items-center overflow-hidden rounded-3xl px-4 py-20 relative"
    >
      <BackgroundRadialColor />
      <TitleComponent
        title="Des programmes sur mesure selon ton niveau"
        titleIndication="programmes"
        subtitle="Que tu sois débutant, intermédiaire ou avancé, tu peux progresser à ton rythme avec un plan adapté à ton niveau, à ta disponibilité, et à ton objectif."
        isTextSplitLines={false}
      />
     <ProgramCards/>
    </section>
  );
};

export default ProgramOverview;
