"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useAnimation } from "../AnimationContext";

const LoadingPage = () => {
  const leftContainerRef = useRef<HTMLDivElement>(null);
  const rightContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstLetterRef = useRef<HTMLHeadingElement>(null);
  const secondLetterRef = useRef<HTMLHeadingElement>(null);
  const letterContainerRef = useRef<HTMLDivElement>(null);
  const coachingRef = useRef<HTMLDivElement>(null);

  const { setIsAnimating } = useAnimation();

  useEffect(() => {
    // Désactiver le scroll quand l'animation commence
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onStart: () => {
        document.body.style.cursor = "wait";
      },
      onComplete: () => {
        setIsAnimating(false);
        document.body.style.overflow = "";
        document.body.style.height = "";
        document.body.style.cursor = "";
        gsap.set(containerRef.current, { display: "none" });
      },
    });

    tl.add([
      gsap.from(firstLetterRef.current, {
        y: "-50%",
        duration: 1,
        ease: "power3.inOut",
      }),
      gsap.from(secondLetterRef.current, {
        delay: 0.05,
        y: "-50%",
        duration: 1,
        ease: "power3.inOut",
      }),
      gsap.from(coachingRef.current, {
        y: "50%",
        duration: 1,
        ease: "power3.inOut",
      }),
    ]);

    // tl.to(coachingRef.current, {
    //   delay: 0.5,
    //   opacity: 0,
    //   duration: 1,
    //   ease: "power3.inOut",
    // });

    tl.to(letterContainerRef.current, {
      delay: 0.2,
      duration: 1,
      height: "100%",
      ease: "power3.inOut",
    });
    tl.add([
      gsap.to(letterContainerRef.current, {
        duration: 1,
        width: "100%",
        ease: "power3.inOut",
      }),
      gsap.to(leftContainerRef.current, {
        duration: 1,
        width: "0%",
        ease: "power3.inOut",
      }),
      gsap.to(rightContainerRef.current, {
        duration: 1,
        width: "0%",
        ease: "power3.inOut",
      }),
      gsap.to(firstLetterRef.current, {
        duration: 1,
        opacity: 0,
        ease: "power3.inOut",
      }),
      gsap.to(secondLetterRef.current, {
        duration: 1,
        opacity: 0,
        ease: "power3.inOut",
      }),
    ]);
  }, [setIsAnimating]);

  return (
    <section
      ref={containerRef}
      className="fixed left-0 top-0 z-[999] h-screen w-screen overflow-hidden"
    >
      <div
        ref={letterContainerRef}
        className="absolute left-1/2 top-1/2 z-50 flex h-max w-max -translate-x-1/2 -translate-y-1/2 justify-between gap-2 text-9xl font-semibold"
      >
        <h1 ref={firstLetterRef}>S</h1>
        <h1 ref={secondLetterRef} className="self-end">
          M
        </h1>
      </div>
      {/* <div
        ref={coachingRef}
        className="absolute left-1/2 top-[59%] z-50 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-black p-2 text-3xl font-semibold uppercase tracking-wide text-white"
      >
        Coaching
      </div> */}
      <div
        ref={leftContainerRef}
        className="absolute left-0 top-0 h-screen w-1/2 bg-white"
      />
      <div
        ref={rightContainerRef}
        className="absolute right-0 top-0 h-screen w-1/2 bg-white"
      />
    </section>
  );
};

export default LoadingPage;
