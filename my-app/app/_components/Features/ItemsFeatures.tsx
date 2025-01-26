import { ItemsFeaturesProps } from "@/types/types";
import { revealRotateEl } from "@/utils/Animation";
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
    <div ref={containerRef} className="flex flex-col items-center gap-4 px-4">
      <div className="rounded-full border-2 p-8">{logo}</div>
      <h2 className="text-2xl">{title}</h2>
      <p className="max-w-lg whitespace-normal text-pretty break-words text-center">
        {paragraph}
      </p>
    </div>
  );
};

export default ItemsFeatures;
