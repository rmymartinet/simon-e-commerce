import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { textSplitLinesScrollTrigger } from "@/utils/common/textAnimation";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AppOverview = () => {
  const titleContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    textSplitLinesScrollTrigger(
      titleContainerRef as React.RefObject<HTMLElement>,
    );
  }, []);

  return (
    <div className="mt-[20vh] flex w-screen flex-col">
      <div
        ref={titleContainerRef}
        className="mb-20 flex flex-col items-center gap-6 px-4"
      >
        <h1 className="max-w-7xl whitespace-normal break-words text-center text-4xl lg:text-7xl">
          Une seule application, tout vos entraînements
        </h1>

        <p className="font-medium text-muted md:text-4xl">
          Simplifiez vos entraînements avec VirtualGym
        </p>
      </div>
      <Image
        src="/images/virtualgym_app/hand_iphone.png"
        alt=""
        width={2000}
        height={2000}
        className="min-h-screen w-full object-cover"
        quality={100}
        layout="responsive"
      />
    </div>
  );
};

export default AppOverview;
