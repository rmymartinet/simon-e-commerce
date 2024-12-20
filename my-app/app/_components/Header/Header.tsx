import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import { FaArrowDown } from "react-icons/fa6";

gsap.registerPlugin(useGSAP);

const Header = () => {
  const headerRef = useRef(null);
  const containerRef = useRef(null);
  const arrowRef = useRef(null);
  const shadowLeftRef = useRef(null);
  const shadowRightRef = useRef(null);

  useGSAP(() => {
    gsap.to([shadowLeftRef.current, shadowRightRef.current], {
      delay: 1,
      opacity: 1,
      duration: 5,
      ease: "power2.out",
    });
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      headerRef.current,
      { height: "0%" },
      {
        height: "100%",
        duration: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
          once: false,
        },
      },
    );

    const tl = gsap.timeline({
      repeat: -1,
    });

    tl.to(arrowRef.current, {
      y: 10,
      duration: 0.5,
      ease: "power1.inOut",
    }).to(arrowRef.current, {
      y: 0,
      duration: 0.5,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-screen w-screen items-center justify-center overflow-hidden"
    >
      <div
        ref={headerRef}
        className="absolute bottom-0 z-50 w-[100%] bg-gradient-to-t from-[#0b0d14] via-[#0b0d14]/60 to-black/0"
      ></div>
      <div
        ref={shadowLeftRef}
        className="absolute left-0 top-0 z-50 h-full w-[20%] bg-gradient-to-r from-[#0b0d14] via-[#0b0d14]/60 to-black/0 opacity-0"
      ></div>
      <div
        ref={shadowRightRef}
        className="absolute right-0 top-0 z-50 h-full w-[20%] bg-gradient-to-l from-[#0b0d14] via-[#0b0d14]/60 to-black/0 opacity-0"
      ></div>

      <div className="program-button-container absolute bottom-0 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full p-4">
        <div ref={arrowRef}>
          <FaArrowDown size={20} />
        </div>
      </div>
      <div className="absolute top-[40%] z-40 flex flex-col items-center md:items-start lg:left-[45%] lg:w-[40%]">
        <p className="text-pretty text-center text-3xl font-bold uppercase text-[#eee] md:text-4xl lg:text-start">
          Faite le <span className="text-violet-300">premier pas</span> je vous
          guide pour le reste.
        </p>
        <div className="relative mt-4 w-max">
          <button className="program-button-container padding rounded-xl bg-button-gradient font-bold">
            Commencer
          </button>
          <div className="absolute inset-0 -z-10 h-full w-full rounded-xl bg-[#c4b5fd] blur-sm"></div>
          <div className="absolute inset-0 -z-10 h-full w-full rounded-xl bg-[#0b0d14]"></div>
        </div>
      </div>
      <div className="absolute bottom-20 right-20 z-40 flex flex-col">
        <p className="text-pretty text-2xl font-bold uppercase">2025</p>
      </div>
      <div className="h-[100vh] w-[100vw] overflow-hidden rounded-2xl">
        <video
          autoPlay
          loop
          muted
          src="/test.mov"
          className="h-full w-full object-cover brightness-[0.9] filter"
          preload="true"
        />
      </div>
    </div>
  );
};

export default Header;
