import { revealRotateEl } from "@/app/utils/Animation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

interface ItemsFeaturesProps {
  logo: React.ReactNode;
  title: string;
  paragraph: string;
}

const ItemsFeatures = ({ logo, title, paragraph }: ItemsFeaturesProps) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    revealRotateEl(containerRef);
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-4">
      <div>{logo}</div>
      <h2 className="text-2xl">{title}</h2>
      <p className="text-slate-400 text-pretty w-full lg:w-[24vw]">
        {paragraph}
      </p>
    </div>
  );
};

export default ItemsFeatures;
