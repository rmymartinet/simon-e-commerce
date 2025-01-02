import { FaYoutube } from "react-icons/fa6";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ColorShadowButton from "../ColorShadowButton";
import BackgroundYoutubeImg from "./BackgroundYoutubeImg";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Youtube = () => {
  const youtubeLogoRef = useRef<HTMLDivElement>(null);
  const youtubeTitleRef = useRef<HTMLDivElement>(null);
  const bgBlackRef = useRef<HTMLDivElement>(null);
  const iphoneRef = useRef<HTMLDivElement>(null);
  const imagesRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.fromTo(
      youtubeLogoRef.current,
      {
        scale: 4,
        x: 200,

        duration: 1,
      },
      {
        scrollTrigger: {
          trigger: youtubeLogoRef.current,
          start: "top 80%",
          end: "bottom 80%",
          scrub: 1,
          once: false,
        },
        x: 0,
        scale: 1,
        duration: 1,
      },
    );

    gsap.to(bgBlackRef.current, {
      scrollTrigger: {
        trigger: bgBlackRef.current,
        start: "top bottom",
        end: "bottom 80%",
        scrub: 1,
        once: false,
      },
      width: "0%",
      delay: 1,
      duration: 1,
    });

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
    <div className="mt-[20vh] flex flex-col items-center">
      <div className="mb-20 flex flex-col items-center">
        <div className="relative flex items-center gap-4">
          <div ref={youtubeLogoRef} className="relative z-[9999]">
            <FaYoutube color="red" size={30} />
            <div className="absolute left-1/2 top-1/2 -z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-white"></div>
          </div>
          <h1 ref={youtubeTitleRef} className="mr-10 text-3xl font-bold">
            Youtube
          </h1>
          <div
            ref={bgBlackRef}
            className="absolute z-30 h-full w-full bg-[#0b0d14]"
          ></div>
        </div>
        <p className="text-pretty text-center text-lg font-medium text-subtle">
          Tous vos exercices en vidéo, accessibles uniquement aux membres
        </p>
        <ColorShadowButton title="Ma chaine youtube" color="#e33a3a" />
      </div>
      <BackgroundYoutubeImg iphoneRef={iphoneRef} imagesRefs={imagesRefs} />
    </div>
  );
};

export default Youtube;
