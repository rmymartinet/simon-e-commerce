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
      className="relative flex h-screen w-screen items-center justify-center overflow-hidden"
    >
      <div
        ref={headerRef}
        className="absolute bottom-0 z-50 w-[100%] bg-gradient-to-t from-[#0b0d14] via-[#0b0d14]/60 to-black/0"
      ></div>
      <div className="absolute bottom-0 left-4 z-50 flex w-full flex-col gap-6 rounded-xl md:bottom-4 md:flex-row md:items-center">
        <div ref={textLeftRef} className="overflow-hidden">
          <h1 className="w-full truncate text-4xl uppercase md:text-8xl">
            Votre Coach
          </h1>
          <span className="block w-full truncate text-2xl md:text-6xl">
            Coaching | Programmes
          </span>
        </div>
        <p ref={textRightRef} className="max-w-80 text-sm lg:max-w-96">
          Atteignez vos objectifs à votre rythme. Optez pour un{" "}
          <strong>programme personnalisé</strong> si vous souhaitez progresser
          en autonomie, ou choisissez un <strong>coaching sur-mesure</strong>{" "}
          pour un accompagnement adapté à vos besoins. Vous avez le choix, vos
          résultats sont la priorité.
        </p>
      </div>
      <div className="absolute bottom-20 right-20 z-40 flex flex-col">
        <p className="text-pretty text-2xl font-bold uppercase">2025</p>
      </div>
      <div className="h-[100vh] w-[100vw] overflow-hidden">
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
