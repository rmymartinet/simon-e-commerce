import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import ColorShadowButton from "../ColorShadowButton";
import useWindowWidth from "@/hooks/useWindowWidth";

gsap.registerPlugin(useGSAP);

const Header = () => {
  const headerRef = useRef(null);
  const containerRef = useRef(null);
  const arrowRef = useRef(null);

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

  return (
    <div
      ref={containerRef}
      className="relative flex h-screen w-screen items-center justify-center overflow-hidden"
    >
      <div
        ref={headerRef}
        className="absolute bottom-0 z-50 w-[100%] bg-gradient-to-t from-[#0b0d14] via-[#0b0d14]/60 to-black/0"
      ></div>
      <div className="absolute left-1/2 top-1/2 z-50 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-xl">
        <h1 className="text-center text-4xl font-bold uppercase md:text-5xl">
          Sm coaching programme & coaching
        </h1>
        <ColorShadowButton title="Commencer maintenant" color="#c4b5fd" />
      </div>
      <div className="absolute bottom-20 right-20 z-40 flex flex-col">
        <p className="text-pretty text-2xl font-bold uppercase">2025</p>
      </div>
      <div className="h-[100vh] w-[100vw] overflow-hidden rounded-2xl">
        <video
          autoPlay
          loop
          muted
          src={
            width <= 498 ? "/videos/mobile_header.mov" : "/videos/header.mov"
          }
          className="h-full w-full object-cover brightness-[0.9] filter"
          preload="true"
        />
      </div>
    </div>
  );
};

export default Header;
