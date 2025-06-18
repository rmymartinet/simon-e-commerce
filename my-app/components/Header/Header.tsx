import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {  RefObject, useRef } from "react";
import CoachingsProgramsButtons from "../CoachingsProgramsButtons";
import { animateBlockReveal } from "@/utils/Animation";
import CalendlyCallButton from "../Calendly/CalendlyCallButton";

gsap.registerPlugin(useGSAP);

const Header = ({setIsOpen}: {setIsOpen: (isOpen: boolean) => void}) => {
  const containerRef = useRef(null);
  useGSAP(() => {
    if (containerRef.current) {
      animateBlockReveal(containerRef as unknown as RefObject<HTMLDivElement>, 0.5);
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex w-screen flex-col justify-end overflow-hidden"
    >
      <div className="z-50 mb-4 flex h-screen w-full flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-20">
          <div className="mb-20 flex flex-col items-center gap-6">
            <h1
              className={`text-center text-6xl font-bold uppercase tracking-tighter text-white md:text-9xl`}
            >
              Coacher <br /> par un pro
            </h1>
            <h4 className="text-center font-medium uppercase text-white md:text-2xl">
              Coachings * Programmes * Nutrition
            </h4>
            <div className="mt-4 flex gap-10 md:flex-row">
            <div className=" items-center justify-center flex flex-col gap-4 md:flex-row">
<CoachingsProgramsButtons variant="purpleBg" />
<CalendlyCallButton setIsOpen={setIsOpen} />

</div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 h-screen w-full overflow-hidden md:p-20">
        <video
          playsInline
          autoPlay
          loop
          muted
          src="/videos/header.mp4"
          className="h-full w-full object-cover brightness-[0.9] filter"
          preload="true"
        />
      </div>
    </section>
  );
};

export default Header;
