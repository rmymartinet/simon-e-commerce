import gsap from "gsap";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import ContentContainerProgram from "./ContentContainerProgram";

const ProgramContentMobile = () => {
  const program1Ref = useRef(null);
  const program2Ref = useRef(null);
  const program3Ref = useRef(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });

    const moveXAnimation = (ref: React.RefObject<HTMLDivElement>) => {
      tl.fromTo(
        ref.current,
        {
          opacity: 0,
          x: -300,
        },
        {
          x: 0,
          opacity: 1,
          duration: 2,
          ease: "power2.out",
        },
      );

      tl.to(ref.current, {
        delay: 2,
        opacity: 0,
        duration: 2,
        ease: "power2.out",
      });
    };

    moveXAnimation(program2Ref);
    moveXAnimation(program1Ref);
    moveXAnimation(program3Ref);
  }, []);

  return (
    <>
      <ContentContainerProgram ref={program1Ref}>
        <Image
          className="h-full w-full rounded-3xl object-contain"
          src="/images/cycle.png"
          alt=""
          width={500}
          height={500}
        />
        <Image
          className="h-full w-full rounded-3xl object-contain"
          src="/images/day.png"
          alt=""
          width={500}
          height={500}
        />
      </ContentContainerProgram>
      <ContentContainerProgram ref={program2Ref}>
        <div className="relative">
          <Image
            className="h-full w-full rounded-3xl object-contain"
            src="/images/weekintro.png"
            alt=""
            width={500}
            height={500}
          />
          <div className="absolute left-10 top-10 h-20 w-20 -translate-y-1/2 rounded-full"></div>
        </div>
      </ContentContainerProgram>
      <ContentContainerProgram ref={program3Ref}>
        <Image
          className="h-full w-full rounded-3xl object-contain"
          src="/images/details.png"
          alt=""
          width={500}
          height={500}
        />
      </ContentContainerProgram>
    </>
  );
};

export default ProgramContentMobile;
