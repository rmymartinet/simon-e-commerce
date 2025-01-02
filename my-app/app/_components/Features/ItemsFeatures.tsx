import { revealRotateEl } from "@/utils/Animation";
import { ItemsFeaturesProps } from "@/types/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const ItemsFeatures = ({ logo, title, paragraph }: ItemsFeaturesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      revealRotateEl(containerRef as React.RefObject<HTMLDivElement>);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex w-max flex-col items-center gap-4 rounded-lg border-card px-20 lg:items-start lg:p-8"
    >
      <div>{logo}</div>
      <h2 className="text-2xl">{title}</h2>
      <p className="w-full text-pretty text-center text-textOpacity lg:w-[24vw] lg:text-start">
        {paragraph}
      </p>
    </div>
  );
};

export default ItemsFeatures;
