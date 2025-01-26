import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BackgroundYoutubeImg from "./BackgroundYoutubeImg";
import { IoLogoYoutube } from "react-icons/io";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Youtube = () => {
  const iphoneRef = useRef<HTMLDivElement>(null);
  const imagesRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
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
    <div className="mt-[20vh] w-full px-4">
      <div className="mb-10 flex flex-col gap-4 md:mb-40">
        <div className="flex items-center gap-2">
          <IoLogoYoutube className="text-3xl lg:text-7xl" />
          <p className="max-w-5xl text-pretty break-words text-3xl lg:text-7xl">
            Youtube
          </p>
        </div>
        <p className="max-w-5xl text-pretty break-words text-3xl lg:text-7xl">
          Tous vos exercices en vidéo, accessibles uniquement aux membres
        </p>
      </div>
      <BackgroundYoutubeImg iphoneRef={iphoneRef} imagesRefs={imagesRefs} />
    </div>
  );
};

export default Youtube;
