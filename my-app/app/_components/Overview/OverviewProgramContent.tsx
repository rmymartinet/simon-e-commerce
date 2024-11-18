import { OverviewSectionProps } from "@/types/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ProgramContentDesktop from "./Desktop/ProgramContentDesktop";

gsap.registerPlugin(useGSAP);

const OverviewProgramContent = ({ gradient }: OverviewSectionProps) => {
  return (
    <div
      className={`${gradient} rounded-2xl h-full w-full lg:col-start-2-end-4 relative overflow-hidden`}
    >
      <ProgramContentDesktop />
    </div>
  );
};

export default OverviewProgramContent;
