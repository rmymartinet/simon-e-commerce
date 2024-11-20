import { OverviewSectionProps } from "@/types/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ProgramContentDesktop from "./Desktop/ProgramContentDesktop";

gsap.registerPlugin(useGSAP);

const OverviewProgramContent = ({ gradient }: OverviewSectionProps) => {
  return (
    <div
      className={`${gradient} relative h-full w-full overflow-hidden rounded-2xl lg:col-start-2-end-4`}
    >
      <ProgramContentDesktop />
    </div>
  );
};

export default OverviewProgramContent;
