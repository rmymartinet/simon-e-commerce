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
      <div ref={titleContainerRef} className="mb-20 flex flex-col">
        <h1 className="text-pretty break-words pb-2 text-3xl md:text-4xl lg:max-w-5xl lg:text-start lg:text-7xl">
          Un programme évolutif, adapté à vos objectifs
        </h1>
        <p className="max-w-5xl font-medium text-muted md:text-xl">
          Accédez à votre programme sur Virtuagym, ajustez vos séances en temps
          réel et suivez votre évolution jour après jour.
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
