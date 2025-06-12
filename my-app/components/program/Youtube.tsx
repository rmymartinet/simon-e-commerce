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
    <div className="mt-[20vh] flex w-full flex-col items-center px-4">
      <div className="relative mb-10 flex flex-col items-center gap-6 text-center md:mb-40">
        <span className="rounded-full border-2 border-violet-600 bg-[--card-bg] px-4 py-1 text-sm uppercase tracking-widest text-white opacity-70">
          Accès inclus pour tous les membres
        </span>
        <h1
          ref={titleRef}
          className="max-w-5xl text-balance break-words text-3xl font-bold md:text-4xl lg:text-5xl"
        >
          Tous vos exercices en vidéo
        </h1>
        <p
          ref={textRef}
          className="max-w-4xl text-pretty text-base text-muted-foreground md:text-lg"
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
