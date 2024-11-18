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
        }
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
          className="w-full h-full object-contain rounded-3xl"
          src="/images/cycle.png"
          alt=""
          width={500}
          height={500}
        />
        <Image
          className="w-full h-full object-contain rounded-3xl"
          src="/images/day.png"
          alt=""
          width={500}
          height={500}
        />
      </ContentContainerProgram>
      <ContentContainerProgram ref={program2Ref}>
        <div className="relative">
          <Image
            className="w-full h-full object-contain rounded-3xl"
            src="/images/weekintro.png"
            alt=""
            width={500}
            height={500}
          />
          <div className="absolute top-10 -translate-y-1/2 left-10 rounded-full w-20 h-20"></div>
        </div>
      </ContentContainerProgram>
      <ContentContainerProgram ref={program3Ref}>
        <Image
          className="w-full h-full object-contain rounded-3xl"
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
