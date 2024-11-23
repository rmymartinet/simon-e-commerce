import { revealRotateEl } from "@/app/utils/Animation";
import { OverviewFeatureLayoutProps } from "@/types/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import CoachingContentOverview from "./CoachingContentOverview";
import { default as LeftFeaturesOverview } from "./LeftFeaturesOverview";
import ProgramContentOverview from "./ProgramContentOverview";
import RightFeaturesOverview from "./RightFeaturesOverview";

gsap.registerPlugin(useGSAP);

const FeatureLayoutOverview = ({
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
        <div className="flex flex-col items-start gap-4 lg:col-start-1-end-2">
          <h4 className="text-xl">{title}</h4>
          <p className="text-pretty pr-8 text-slate-400">{description}</p>
          <button className="flex w-max items-center gap-6 rounded-md bg-button px-4 py-2 font-semibold text-white">
            <p>Commencer</p>
          </button>
        </div>
        {!isCoaching && <ProgramContentOverview gradient={gradient} />}
        {isCoaching && <CoachingContentOverview gradient={gradient} />}
      </div>
      <div className="flex flex-col gap-7 rounded-2xl pt-7 lg:grid lg:grid-cols-custom">
        <LeftFeaturesOverview
          isCoaching={isCoaching}
          title={titleLeft}
          text={descriptionLeft}
        />
        <RightFeaturesOverview
          isCoaching={isCoaching}
          title={titleRight}
          text={descriptionRight}
        />
      </div>
    </div>
  );
};

export default FeatureLayoutOverview;
