import { revealRotateEl } from "@/app/utils/Animation";
import { OverviewLeftAndRightFeaturesProps } from "@/types/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Iphone from "./Iphone";

gsap.registerPlugin(useGSAP);

const OverviewRightFeatures = ({
  isCoaching,
  title,
  text,
}: OverviewLeftAndRightFeaturesProps) => {
  const containerRef = useRef(null);
  const videoRef = useRef<(HTMLDivElement | null)[]>([]);

  const videoUrls = [
    "/videos/exercices/video1.mp4",
    "/videos/exercices/video2.mp4",
    "/videos/exercices/video3.mp4",
    "/videos/exercices/video4.mp4",
    "/videos/exercices/video5.mp4",
    "/videos/exercices/video6.mp4",
  ];

  useGSAP(() => {
    revealRotateEl(containerRef);

    const tl = gsap.timeline({
      repeat: -1,
      defaults: {
        duration: 2,
        ease: "power2.out",
      },
    });

    videoRef.current.forEach((el) => {
      tl.fromTo(
        el,
        {
          opacity: 0,
          x: 400,
          scale: 0.4,
        },
        {
          x: 0,
          scale: 1,
          opacity: 1,
        }
      );
      tl.to(el, {
        delay: 1,
        x: -400,
        scale: 0.4,
        opacity: 0,
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-white h-[60vh] w-full rounded-2xl lg:col-start-3-end-4 gap-20 grid 2 p-6 overflow-hidden"
      style={{
        gridTemplateRows: "250px max-content",
      }}
    >
      {!isCoaching && (
        <div className="relative">
          {videoUrls.map((url, index) => (
            <div
              key={index}
              ref={(el) => {
                videoRef.current[index] = el;
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-full rounded-2xl overflow-hidden opacity-0"
            >
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                src={url}
              ></video>
            </div>
          ))}
        </div>
      )}
      {isCoaching && <Iphone imagesUrl="/images/call.png" />}
      <div className="self-center flex flex-col gap-2">
        <h1 className="text-4xl">{title}</h1>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default OverviewRightFeatures;
