import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import useWindowWidth from "@/hooks/useWindowWidth";
import { textSplitLines } from "@/utils/common/textAnimation";

gsap.registerPlugin(useGSAP);

const Header = () => {
  const headerRef = useRef(null);
  const containerRef = useRef(null);
  const arrowRef = useRef(null);

  const textLeftRef = useRef<HTMLDivElement>(null);
  const textRightRef = useRef<HTMLParagraphElement>(null);

  const { width } = useWindowWidth();

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

  useGSAP(() => {
    if (textLeftRef.current && textRightRef.current) {
      textSplitLines(textLeftRef as React.RefObject<HTMLElement>, 2);
      textSplitLines(textRightRef as React.RefObject<HTMLElement>, 2);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-screen w-screen flex-col justify-end overflow-hidden"
    >
      {/* <div
        ref={headerRef}
        className="absolute bottom-0 z-50 w-[100%] bg-gradient-to-t from-[#0b0d14] via-[#0b0d14]/60 to-black/0"
      ></div> */}
      <div className="z-50 mb-4 flex w-full flex-col items-center justify-between px-4 md:flex-row">
        <div ref={textLeftRef} className="overflow-hidden">
          <h1 className="text-4xl uppercase">Sm coaching</h1>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex flex-col">
            <p className="text-sm md:text-end">
              Coaching. Programmes. Résultats
            </p>
            <p className="text-sm">
              Avec ou sans suivi, ta transformation commence ici
            </p>
          </div>
          <div className="ml-4 mr-4 hidden h-10 w-[1px] bg-white md:flex"></div>
          <button className="w-full rounded-md bg-button-gradient px-4 py-2 font-semibold md:w-max">
            Commencer maintenant
          </button>
        </div>
      </div>
      <div className="absolute h-full w-full overflow-hidden">
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
