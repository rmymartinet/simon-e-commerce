import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BackgroundYoutubeImg from "./BackgroundYoutubeImg";
import { textSplitLinesScrollTrigger } from "@/utils/common/textAnimation";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Youtube = () => {
  const iphoneRef = useRef<HTMLDivElement>(null);
  const imagesRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    textSplitLinesScrollTrigger(titleRef as React.RefObject<HTMLElement>);
    textSplitLinesScrollTrigger(textRef as React.RefObject<HTMLElement>);

    imagesRefs.current.forEach((img) => {
      gsap.to(img, {
        scrollTrigger: {
          trigger: img,
          start: "top center",
          end: "bottom top",
          scrub: 1,
          once: false,
        },
        y: -300,
        duration: 1,
      });
    });
  }, []);

  return (
    <div className="mt-[20vh] flex w-full flex-col px-4">
      <div className="mb-10 flex flex-col items-center md:mb-40">
        <h1
          ref={titleRef}
          className="max-w-5xl text-pretty break-words text-center text-3xl lg:text-4xl"
        >
          Tous vos exercices en vidéo
        </h1>
        <p
          ref={textRef}
          className="text-center font-medium text-[--subtext] md:max-w-5xl md:text-xl"
        >
          Accédez à mes vidéos exclusives sur YouTube pour perfectionner vos
          mouvements et exécuter chaque exercice avec précision. Disponible pour
          tous les membres et programmes.
        </p>
      </div>
      <BackgroundYoutubeImg iphoneRef={iphoneRef} imagesRefs={imagesRefs} />
    </div>
  );
};

export default Youtube;
