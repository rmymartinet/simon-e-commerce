import useWindowWidth from "@/hooks/useWindowWidth";
import { useGSAP } from "@gsap/react";
import { textSplitLines } from "@/utils/common/textAnimation";
import gsap from "gsap";
import { useRef } from "react";
import TitleComponent from "../TitleComponent";

// ✅ Enregistrement du plugin GSAP
gsap.registerPlugin(useGSAP);

const ProgramOverview = () => {
  const { width } = useWindowWidth();
  const titlesContainerRef = useRef<HTMLDivElement>(null);
  const programContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    textSplitLines(titlesContainerRef as React.RefObject<HTMLElement>);

    gsap.from(programContainerRef.current, {
      y: 400,
      filter: "blur(70px)",
      duration: 1,
      ease: "power2.Out",
      opacity: 0,
    });
  }, []);

  return (
    <section
      ref={programContainerRef}
      className="flex w-screen max-w-[90vw] flex-col items-center overflow-hidden rounded-3xl border border-white/10 bg-[--background] px-4 py-20 shadow-xl backdrop-blur-lg"
    >
      <TitleComponent
        title="Des programmes sur mesure selon ton niveau"
        titleIndication="programmes"
        subtitle="Que tu sois débutant, intermédiaire ou avancé, tu peux progresser à ton rythme avec un plan adapté à ton niveau, à ta disponibilité, et à ton objectif."
      />
      <div className="mt-20 grid w-full max-w-6xl grid-cols-1 gap-10 md:grid-cols-3">
        <div className="flex flex-col items-center gap-4 rounded-xl bg-white/5 p-6 text-center shadow-md">
          <h3 className="text-xl font-semibold text-white">Débutant</h3>
          <p className="text-sm text-muted-foreground">
            Apprends les bases, construis des habitudes solides et gagne en
            confiance.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 rounded-xl bg-white/5 p-6 text-center shadow-md">
          <h3 className="text-xl font-semibold text-white">Intermédiaire</h3>
          <p className="text-sm text-muted-foreground">
            Optimise ta progression avec un plan structurant et progressif.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 rounded-xl bg-white/5 p-6 text-center shadow-md">
          <h3 className="text-xl font-semibold text-white">Confirmé</h3>
          <p className="text-sm text-muted-foreground">
            Dépasse tes limites avec des cycles intensifs pensés pour la
            performance.
          </p>
        </div>
      </div>

      <div className="mt-20 w-full max-w-4xl">
        <video
          src={
            width > 1024
              ? "/videos/program/program_overview_desktop.mp4"
              : "/videos/program/program_overview_mobile.mp4"
          }
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full rounded-xl object-contain shadow-lg"
        />
      </div>
    </section>
  );
};

export default ProgramOverview;
