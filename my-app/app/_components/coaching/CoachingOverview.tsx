import { useGSAP } from "@gsap/react";
import { textSplitLinesScrollTrigger } from "@/utils/common/textAnimation";
import { useRef } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const CoachingOverview = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    textSplitLinesScrollTrigger(titleRef as React.RefObject<HTMLElement>);
    textSplitLinesScrollTrigger(textRef as React.RefObject<HTMLElement>);
  }, []);
  return (
    <div
      id="coaching"
      className="relative mt-[20vh] flex flex-col items-center gap-20 overflow-hidden p-4 lg:p-20"
    >
      <div className="flex flex-col gap-20">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1
            ref={titleRef}
            className="text-center text-3xl md:max-w-7xl md:text-4xl"
          >
            Un coaching sur-mesure, à votre image
          </h1>
          <p
            ref={textRef}
            className="text-center font-medium text-[--subtext] md:max-w-5xl md:text-xl lg:text-center"
          >
            Planifions ensemble votre réussite : un premier échange sur
            WhatsApp, un rendez-vous dédié, et un suivi régulier pour rester sur
            la bonne voie.
          </p>
          <div className="mt-10">
            <Button variant={"blackBg"}>
              <Link href="/pricing">Découvrir nos offres</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center gap-20">
        <div className="relative h-[70vh] lg:h-full lg:w-[90%]">
          <video
            src="/videos/coaching/whats_app_bg.mp4"
            loop
            muted
            autoPlay
            playsInline
            className="h-full w-full object-cover"
          ></video>
        </div>
      </div>
    </div>
  );
};

export default CoachingOverview;
