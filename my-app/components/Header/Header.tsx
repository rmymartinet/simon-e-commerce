import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { textSplitLines } from "@/utils/common/textAnimation";
import CoachingsProgramsButtons from "../CoachingsProgramsButtons";

gsap.registerPlugin(useGSAP);

const Header = () => {
  const containerRef = useRef(null);
  const textLeftRef = useRef<HTMLDivElement>(null);
  const textRightRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (textLeftRef.current && textRightRef.current && titleRef.current) {
      textSplitLines(textLeftRef as React.RefObject<HTMLElement>, 2);
      textSplitLines(textRightRef as React.RefObject<HTMLElement>, 2);
      textSplitLines(titleRef as React.RefObject<HTMLElement>);
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 100,
        filter: "blur(70px)",
        duration: 1,
        ease: "power2.Out",
        opacity: 0,
      });

      const buttonsContainerChildren = buttonsContainerRef.current?.children;

      if (buttonsContainerChildren) {
        gsap.from(buttonsContainerChildren, {
          y: 100,
          filter: "blur(70px)",
          duration: 1,
          ease: "power2.Out",
          stagger: 0.05,
          opacity: 0,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex w-screen flex-col justify-end overflow-hidden"
    >
      <div className="z-50 mb-4 flex h-screen w-full flex-col items-center justify-center">
        <div
          ref={textLeftRef}
          className="absolute left-1/2 top-5 -translate-x-1/2 overflow-hidden"
        >
          <h1 className="uppercase">SMartinet coaching</h1>
        </div>
        <div className="flex flex-col items-center gap-20">
          <div className="mb-20 flex flex-col items-center gap-6">
            <h1
              className={`text-center text-6xl font-bold uppercase tracking-tighter text-white md:text-9xl`}
            >
              Coaché <br /> par un pro
            </h1>
            <h4 className="text-center font-medium uppercase text-white md:text-2xl">
              Coaching * Programmes * Nutrition
            </h4>
            <div className="mt-4 flex gap-10 md:flex-row">
            <div className="flex gap-4">
<CoachingsProgramsButtons />
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
    </div>
  );
};

export default Header;
