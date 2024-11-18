import { revealRotateEl } from "@/app/utils/Animation";
import { OverviewLeftAndRightFeaturesProps } from "@/types/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Iphone from "./Iphone";

gsap.registerPlugin(useGSAP);

const OverviewRightFeatures = ({
  isCoaching,
  title,
  text,
}: OverviewLeftAndRightFeaturesProps) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    revealRotateEl(containerRef);
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-white h-[60vh] w-full rounded-2xl lg:col-start-3-end-4 gap-20 grid 2 p-6"
      style={{
        gridTemplateRows: "250px max-content",
      }}
    >
      {!isCoaching && (
        <div className="w-full h-full rounded-2xl overflow-hidden">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            src="/videos/simon.mp4"
          ></video>
        </div>
      )}
      {isCoaching && <Iphone imagesUrl="/images/call.png" />}
      <div className="self-center flex flex-col gap-2">
        <h1 className="text-4xl">{title}</h1>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default OverviewRightFeatures;
