import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { textSplitLinesScrollTrigger } from "@/utils/common/textAnimation";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AppOverview = () => {
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    textSplitLinesScrollTrigger(
      titleContainerRef as React.RefObject<HTMLElement>,
    );

    gsap.to(imgRef.current, {
      scale: 1,
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top 60%",
        end: "bottom center",
      },
    });
  }, []);

  return (
    <div className="mt-[20vh] flex w-screen flex-col px-4">
      <div
        ref={titleContainerRef}
        className="mb-20 flex flex-col items-center gap-6"
      >
        <h1 className="max-w-7xl whitespace-normal break-words text-center text-4xl lg:text-7xl">
          Une seule application, tout vos entraînements
        </h1>

        <p className="font-medium text-muted md:text-4xl">
          Simplifiez vos entraînements avec VirtualGym
        </p>
      </div>
      <Image
        ref={imgRef}
        src="/images/virtualgym_app/hand_iphone.png"
        alt=""
        width={2000}
        height={2000}
        className="min-h-screen w-full scale-75 object-cover"
        quality={100}
        layout="responsive"
      />
    </div>
  );
};

export default AppOverview;
