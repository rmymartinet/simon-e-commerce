import { revealRotateEl } from "@/app/utils/Animation";
import { OverviewFeatureLayoutProps } from "@/types/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import CoachingContent from "./CoachingContent";
import OverviewRightFeatures from "./OverviewLeftFeatures";
import OverviewProgramContent from "./OverviewProgramContent";
import OverviewLeftFeatures from "./OverviewRightFeatures";

gsap.registerPlugin(useGSAP);

const OverviewFeatureLayout = ({
  featureLayoutContent,
  gradient,
  isCoaching,
}: OverviewFeatureLayoutProps) => {
  const {
    title,
    description,
    titleRight,
    descriptionRight,
    titleLeft,
    descriptionLeft,
  } = featureLayoutContent;

  const containerRef = useRef(null);

  useGSAP(() => {
    revealRotateEl(containerRef);
  }, []);

  return (
    <div className="flex flex-col">
      <div
        ref={containerRef}
        className="flex h-[70vh] flex-col-reverse gap-10 rounded-2xl bg-white p-4 md:h-[80vh] lg:grid lg:grid-cols-custom lg:items-end lg:gap-0 lg:p-7"
      >
        <div className="flex flex-col gap-4 lg:col-start-1-end-2">
          <h4 className="text-xl">{title}</h4>
          <p className="text-pretty pr-8 text-slate-400">{description}</p>
        </div>
        {!isCoaching && <OverviewProgramContent gradient={gradient} />}
        {isCoaching && <CoachingContent gradient={gradient} />}
      </div>
      <div className="borr flex flex-col gap-7 rounded-2xl pt-7 lg:grid lg:grid-cols-custom">
        <OverviewRightFeatures
          isCoaching={isCoaching}
          title={titleRight}
          text={descriptionRight}
        />
        <OverviewLeftFeatures
          isCoaching={isCoaching}
          title={titleLeft}
          text={descriptionLeft}
        />
      </div>
    </div>
  );
};

export default OverviewFeatureLayout;
