import { useEffect, useRef } from "react";
import { IoCheckmarkOutline } from "react-icons/io5";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { AvailableOffersProps } from "@/types/types";
import useNavigation from "@/hooks/useNavigation";

gsap.registerPlugin(ScrollTrigger);

const AvailableOffers = ({
  title,
  follow,
  subtitle,
  features,
}: AvailableOffersProps) => {
  const bgPurpleRef = useRef(null);

  useEffect(() => {
    gsap.to(bgPurpleRef.current, {
      scale: 1,
      duration: 1,
      scrollTrigger: {
        trigger: bgPurpleRef.current,
        start: "top 90%",
      },
    });
  }, []);

  const { handlePricingNavigation } = useNavigation();

  return (
    <div className="card-box-shadow relative flex flex-col gap-10 overflow-hidden rounded-3xl border-card p-10">
      <div
        ref={bgPurpleRef}
        className="fixed-bg-purple absolute bottom-0 right-0 -z-10 h-[20%] w-[20%] scale-0"
      ></div>
      <div className="flex justify-between gap-10">
        <h1 className="text-4xl font-medium">{title}</h1>
        <span className="flex w-max items-center justify-center rounded-full px-4 py-2 text-violet-400 shadow-inner">
          {follow}
        </span>
      </div>
      <span>{subtitle}</span>
      <button
        onClick={handlePricingNavigation}
        className="rounded-lg bg-button-gradient py-2 font-medium text-white"
      >
        Commencer
      </button>
      <ul className="flex flex-col gap-2">
        <span className="mb-4 text-slate-300">Inclus:</span>
        {features.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <IoCheckmarkOutline />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableOffers;
