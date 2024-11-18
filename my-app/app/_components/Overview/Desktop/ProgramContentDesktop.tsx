import Image from "next/image";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ProgramContentDesktop = () => {
  const deskProgram1Ref = useRef<HTMLDivElement>(null);
  const deskProgram2Ref = useRef<HTMLDivElement>(null);
  const deskProgram3Ref = useRef<HTMLDivElement>(null);

  const moveXAnimation = (ref: React.RefObject<HTMLDivElement>, delay = 0) => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          x: -400,
        },
        {
          x: 0,
          opacity: 1,
          duration: 2,
          ease: "power2.out",
          delay: delay,
        }
      );
    }
  };

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: deskProgram1Ref.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        moveXAnimation(deskProgram1Ref);
        moveXAnimation(deskProgram2Ref, 0.4);
        moveXAnimation(deskProgram3Ref, 0.6);
      },
    });
  }, []);
  return (
    <>
      <div
        ref={deskProgram1Ref}
        className="absolute top-10 left-1/2 -translate-x-1/2 rounded-3xl overflow-hidden p-4 glassmorph1 flex flex-col gap-20 z-50 opacity-0"
      >
        <Image
          className="w-full h-full object-cover rounded-xl"
          src="/images/cycle.png"
          alt=""
          width={500}
          height={500}
        />
        <Image
          className="w-full h-full object-cover rounded-xl"
          src="/images/day.png"
          alt=""
          width={500}
          height={500}
        />
      </div>
      <div
        ref={deskProgram2Ref}
        className="absolute top-20 left-24 z-10 rounded-3xl overflow-hidden opacity-0"
      >
        <Image
          className="w-full h-full object-cover"
          src="/images/weekintro.png"
          alt=""
          width={500}
          height={500}
        />
      </div>
      <div
        ref={deskProgram3Ref}
        className="absolute top-20 right-20 rounded-3xl overflow-hidden opacity-0"
      >
        <Image
          className="w-full h-full object-cover"
          src="/images/details.png"
          alt=""
          width={500}
          height={500}
        />
      </div>
    </>
  );
};

export default ProgramContentDesktop;
