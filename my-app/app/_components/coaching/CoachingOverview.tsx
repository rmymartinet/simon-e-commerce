import Iphone from "../Iphone";
import Button from "../Button";
import { useGSAP } from "@gsap/react";
import { textSplitLinesScrollTrigger } from "@/utils/common/textAnimation";
import { useRef } from "react";

const CoachingOverview = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    textSplitLinesScrollTrigger(titleRef as React.RefObject<HTMLElement>);
  }, []);
  return (
    <div
      id="coaching"
      className="relative mt-[20vh] flex flex-col items-center gap-20 overflow-hidden px-4"
    >
      <div className="flex flex-col gap-20">
        <div className="flex flex-col items-center justify-center gap-10 lg:gap-20">
          <h1
            ref={titleRef}
            className="max-w-7xl whitespace-normal break-words text-center text-4xl lg:text-7xl"
          >
            Vous préférez être accompagné, vous êtes unique, votre coaching
            aussi.
          </h1>
          <p className="text-center text-xl text-muted">
            Des appels réguliers pour un vrai suivi
          </p>
          <Button href="/pricing" />
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center gap-20">
        <div className="relative h-[70vh] lg:h-full lg:w-[90%]">
          <video
            src="/videos/coaching/whats_app_coaching.mov"
            loop
            muted
            autoPlay
            playsInline
            className="h-full w-full object-cover"
          ></video>

          <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 xl:scale-125">
            <Iphone video="/videos/coaching/call.mp4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachingOverview;
