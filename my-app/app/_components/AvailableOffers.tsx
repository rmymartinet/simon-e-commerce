import { useEffect, useRef } from "react";
import { IoCheckmarkOutline } from "react-icons/io5";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { AvailableOffersProps } from "@/types/types";

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

  return (
    <div className="relative flex flex-col gap-10 rounded-2xl border-2 border-slate-100 bg-[#ffffffce] p-10 shadow-sm">
      <div
        ref={bgPurpleRef}
        className="fixed-bg-purple absolute left-1/2 top-1/2 -z-10 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 scale-0"
      ></div>
      <div className="flex justify-between gap-10">
        <h1 className="text-4xl font-medium">{title}</h1>
        <span className="flex w-max items-center justify-center rounded-full px-4 py-2 shadow-inner">
          {follow}
        </span>
      </div>
      <span>{subtitle}</span>
      <button className="rounded-lg bg-button py-2 font-medium text-white">
        Découvrir
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
