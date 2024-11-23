import { useAnimation } from "@/app/AnimationContext";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

const OfferSelector = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { isAnimating } = useAnimation();

  useEffect(() => {
    if (!isAnimating) {
      gsap.to(containerRef.current, {
        y: 0,
        opacity: 1,
        delay: 0.2,
        duration: 1,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(containerRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.inOut",
      });
    }
  }, [isAnimating]);
  return (
    <div
      ref={containerRef}
      className="absolute bottom-10 left-1/2 flex w-full -translate-x-1/2 flex-col items-center rounded-3xl border-2 border-slate-100 bg-black p-4 text-black opacity-0 shadow-2xl md:w-max"
    >
      <div className="grid grid-cols-2 gap-4 overflow-hidden">
        <div className="rounded-xl bg-white p-2">
          <div className="w-42 flex flex-col justify-between gap-4 p-2">
            <div className="flex flex-col gap-2">
              <h1 className="text-xl text-black">Programme</h1>
              <p className="text-slate-300">Accès à vie, sans suivi</p>
            </div>
            <button className="flex w-full items-center justify-between rounded-md bg-black px-4 py-2 text-white">
              <p>Commencer</p>
              <div className="-rotate-45">
                <IoIosArrowRoundForward size={20} />
              </div>
            </button>
          </div>
        </div>
        <div className="rounded-xl bg-white p-2">
          <div className="w-42 flex flex-col justify-between gap-4 p-2">
            <div className="flex flex-col gap-2">
              <h1 className="text-xl text-black">Coaching</h1>
              <p className="text-slate-300">Accompagnement sur-mesure</p>
            </div>
            <button className="flex w-full items-center justify-between rounded-md bg-black px-4 py-2 text-white">
              <p>Commencer</p>
              <div className="-rotate-45">
                <IoIosArrowRoundForward size={20} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferSelector;
