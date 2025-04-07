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
    <section
      id="coaching"
      className="relative mt-[15vh] flex flex-col items-center gap-20 overflow-hidden p-4 lg:p-20"
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <h1
          ref={titleRef}
          className="text-3xl font-bold md:max-w-6xl md:text-4xl"
        >
          Un coaching sur-mesure, à ton image
        </h1>
        <p
          ref={textRef}
          className="font-medium text-[--subtext] md:max-w-3xl md:text-xl"
        >
          Planifions ensemble ta réussite : un premier échange sur WhatsApp, un
          rendez-vous dédié, et un suivi régulier pour t’aider à tenir le cap,
          pas à pas.
        </p>
        <Button variant="blackBg" className="mt-4">
          <Link href="/pricing">Découvrir les offres</Link>
        </Button>
      </div>

      <div className="relative h-[70vh] w-full max-w-6xl overflow-hidden rounded-2xl shadow-lg">
        <video
          src="/videos/coaching/whats_app_bg.mp4"
          loop
          muted
          autoPlay
          playsInline
          className="h-full w-full object-cover"
        ></video>
      </div>
    </section>
  );
};

export default CoachingOverview;
