import useWindowWidth from "@/app/hooks/useWindowWidth";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ProgramContentOverview = ({ gradient }: { gradient: string }) => {
  const deskProgram1Ref = useRef<HTMLDivElement>(null);
  const deskProgram2Ref = useRef<HTMLDivElement>(null);
  const deskProgram3Ref = useRef<HTMLDivElement>(null);

  const { width } = useWindowWidth();

  const widthMobile = width <= 498;

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

  const animateMobile = (refs: React.RefObject<HTMLDivElement>[]) => {
    const tl = gsap.timeline({ repeat: -1, delay: 0.5 }); // Repeat infinitely with a small delay

    refs.forEach((ref) => {
      if (ref.current) {
        tl.fromTo(
          ref.current,
          { opacity: 0, x: -400 },
          {
            x: 0,
            opacity: 1,
            duration: 2,
            ease: "power2.out",
          },
        ).to(ref.current, {
          x: 400,
          opacity: 0,
          duration: 2,
          ease: "power2.out",
        });
      }
    });
  };
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: deskProgram1Ref.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        if (widthMobile) {
          animateMobile([deskProgram1Ref, deskProgram2Ref, deskProgram3Ref]);
        } else {
          moveXAnimation(deskProgram1Ref);
          moveXAnimation(deskProgram2Ref, 0.4);
          moveXAnimation(deskProgram3Ref, 0.6);
        }
      },
    });
  }, [width]);
  return (
    <div
      className={`${gradient} relative h-full w-full overflow-hidden rounded-2xl border-2 lg:col-start-2-end-4`}
    >
      <div
        ref={deskProgram1Ref}
        className={`glassmorph1 absolute z-50 flex -translate-x-1/2 flex-col ${widthMobile ? "left-1/2 top-0 h-full w-full gap-0" : "left-1/2 top-10 gap-40"} overflow-hidden rounded-3xl p-4 opacity-0`}
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
        className={`absolute ${widthMobile ? "left-1/2 top-0 h-full w-full -translate-x-1/2" : "left-12 top-20"} z-10 overflow-hidden rounded-3xl opacity-0`}
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
        className={`absolute ${widthMobile ? "left-1/2 top-0 h-full w-full -translate-x-1/2" : "right-20 top-20"} overflow-hidden rounded-3xl opacity-0`}
      >
        <Image
          className="h-full w-full rounded-3xl object-contain"
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
