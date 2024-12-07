import { revealRotateEl } from "@/app/utils/Animation";
import { ItemsFeaturesProps } from "@/types/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const ItemsFeatures = ({ logo, title, paragraph }: ItemsFeaturesProps) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    revealRotateEl(containerRef);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center gap-4 md:items-start"
    >
      <div>{logo}</div>
      <h2 className="text-2xl">{title}</h2>
      <p className="w-full text-pretty text-center text-slate-400 md:text-start lg:w-[24vw]">
        {paragraph}
      </p>
    </div>
  );
};

export default ItemsFeatures;
