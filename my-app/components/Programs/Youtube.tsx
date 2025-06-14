import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BackgroundYoutubeImg from "./BackgroundYoutubeImg";
import { textSplitLinesScrollTrigger } from "@/utils/common/textAnimation";
import TitleComponent from "../TitleComponent";

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
    <div className="mt-[20vh] flex w-full flex-col items-center px-4">
      <div className="relative mb-10 flex flex-col items-center gap-6 text-center md:mb-40">

        <TitleComponent
          title="Tous vos exercices en vidéo"
          titleIndication="Accès inclus pour tous les membres"
          subtitle="Accédez à mes vidéos exclusives sur YouTube pour perfectionner vos mouvements et exécuter chaque exercice avec précision. Disponible pour tous les membres et programmes."
          isTextSplitLines={false}
        />

      </div>
      <BackgroundYoutubeImg iphoneRef={iphoneRef} imagesRefs={imagesRefs} />
    </div>
  );
};

export default Youtube;
