import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import useWindowWidth from "@/hooks/useWindowWidth";
import { textSplitLines } from "@/utils/common/textAnimation";
import ProgramOverview from "../program/ProgramOverview";
import { Button } from "../ui/button";

gsap.registerPlugin(useGSAP);

const Header = () => {
  const containerRef = useRef(null);
  const textLeftRef = useRef<HTMLDivElement>(null);
  const textRightRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);

  const { width } = useWindowWidth();

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
      <div className="z-50 mb-4 flex w-full flex-col items-center justify-center">
        <div
          ref={textLeftRef}
          className="absolute left-1/2 top-5 -translate-x-1/2 overflow-hidden"
        >
          <h1 className="uppercase">Sm coaching</h1>
        </div>
        <div className="mt-[30vh] flex flex-col items-center gap-20">
          <div className="flex flex-col items-center gap-6">
            <h1 ref={titleRef} className="text-center text-7xl font-medium">
              Transforme-toi avec ou sans coach.
            </h1>
            <div className="mt-4 flex gap-10">
              <Button variant="blackBg">Commencer maintenant</Button>
              <Button variant="glassmorph">About</Button>
            </div>
          </div>
          <ProgramOverview />
        </div>
      </div>
      <div className="absolute top-0 h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          src={
            width <= 498 ? "/videos/mobile_header.mp4" : "/videos/header.mp4"
          }
          className="h-full w-full object-cover brightness-[0.9] filter"
          preload="true"
        />
      </div>
    </div>
  );
};

export default Header;
