import { OverviewSectionProps } from "@/types/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ProgramContentOverview = ({ gradient }: OverviewSectionProps) => {
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
        },
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
    <div
      className={`${gradient} relative h-full w-full overflow-hidden rounded-2xl border-2 lg:col-start-2-end-4`}
    >
      <div
        ref={deskProgram1Ref}
        className="glassmorph1 absolute left-1/2 top-10 z-50 flex -translate-x-1/2 flex-col gap-40 overflow-hidden rounded-3xl p-4 opacity-0"
      >
        <Image
          className="h-full w-full rounded-xl object-contain"
          src="/images/pdf/cycle.png"
          alt=""
          width={350}
          height={350}
        />
        <Image
          className="h-full w-full rounded-xl object-contain"
          src="/images/pdf/day.png"
          alt=""
          width={350}
          height={350}
        />
      </div>
      <div
        ref={deskProgram2Ref}
        className="absolute left-24 top-20 z-10 overflow-hidden rounded-3xl opacity-0"
      >
        <Image
          className="h-full w-full object-contain"
          src="/images/pdf/weekintro.png"
          alt=""
          width={350}
          height={350}
        />
      </div>
      <div
        ref={deskProgram3Ref}
        className="absolute right-20 top-20 overflow-hidden rounded-3xl opacity-0"
      >
        <Image
          className="h-full w-full object-contain"
          src="/images/pdf/details.png"
          alt=""
          width={350}
          height={350}
        />
      </div>
    </div>
  );
};

export default ProgramContentOverview;
