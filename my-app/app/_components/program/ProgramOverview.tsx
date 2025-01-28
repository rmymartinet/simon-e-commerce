import useWindowWidth from "@/hooks/useWindowWidth";
import { useGSAP } from "@gsap/react";
import { textSplitLinesScrollTrigger } from "@/utils/common/textAnimation";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const ProgramOverview = () => {
  const { width } = useWindowWidth();
  const titlesContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    textSplitLinesScrollTrigger(
      titlesContainerRef as React.RefObject<HTMLElement>,
    );
  }, []);

  return (
    <div className="mt-[70vh] flex w-screen flex-col items-center overflow-hidden lg:mt-0">
      <div
        ref={titlesContainerRef}
        className="flex flex-col items-center justify-center gap-4 md:gap-8"
      >
        <h1 className="text-center text-4xl md:text-7xl">
          Programmes adaptés à votre niveau
        </h1>
        <p className="text-center font-medium text-muted md:text-3xl">
          Débutant, intermédiaire ou confirmé : progressez à votre rythme
        </p>
      </div>
      <div className="mt-32 w-[90%]">
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
          className="h-full w-full object-contain"
        />
        -
      </div>
    </div>
  );
};

export default ProgramOverview;
