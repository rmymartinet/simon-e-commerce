import useWindowWidth from "@/hooks/useWindowWidth";
import { useGSAP } from "@gsap/react";
import { textSplitLines } from "@/utils/common/textAnimation";
import gsap from "gsap";
import { useRef } from "react";

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
    <div
      ref={programContainerRef}
      className="flex w-screen max-w-[80vw] flex-col items-center overflow-hidden rounded-2xl bg-[--background] p-10 px-4"
    >
      <div
        ref={titlesContainerRef}
        className="flex flex-col items-center justify-center"
      >
        <h1 className="text-3xl md:text-4xl">
          Programmes adaptés à votre niveau
        </h1>
        <p className="font-medium text-muted">
          Débutant, intermédiaire ou confirmé : progressez à votre rythme
        </p>
      </div>
      <div className="mt-32 lg:w-[90%]">
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
      </div>
    </div>
  );
};

export default ProgramOverview;
