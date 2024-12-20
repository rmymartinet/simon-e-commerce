import Image from "next/image";
import { FaYoutube } from "react-icons/fa6";
import Iphone from "../Iphone";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ColorShadowButton from "../ColorShadowButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Youtube = () => {
  const images = [
    {
      src1: "/images/youtube/img1.png",
      src2: "/images/youtube/img2.png",
      width: 300,
      height: 300,
      mt: "10vh",
      opacity: 60,
    },
    {
      src1: "/images/youtube/img3.png",
      src2: "/images/youtube/img4.png",
      width: 300,
      height: 300,
      mt: "5vh",
      opacity: 30,
    },
    {
      src1: "/images/youtube/img5.png",
      src2: "/images/youtube/img6.png",
      width: 300,
      height: 300,
      opacity: 30,
    },
    {
      src1: "/images/youtube/img7.png",
      src2: "/images/youtube/img8.png",
      width: 300,
      height: 300,
      mt: "8vh",
      opacity: 60,
    },
  ];

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
        start: "top 80%",
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
        <p className="text-center text-lg font-medium text-textOpacity">
          Tous vos exercices en vidéo, accessibles à tout moment
        </p>
        <ColorShadowButton title="Ma chaine youtube" color="#e33a3a" />
      </div>
      <div className="relative flex h-[40vh] w-screen flex-col items-center md:h-[80vh]">
        <div className="absolute flex h-full w-full justify-center gap-4">
          {images.map((img, index) => (
            <div
              ref={(el) => {
                imagesRefs.current[index] = el;
              }}
              key={index}
              className="relative flex flex-col gap-4"
              style={{ marginTop: img.mt }}
            >
              <Image
                src={img.src1}
                width={img.width}
                height={img.height}
                className="rounded-3xl"
                quality={100}
                alt=""
                style={{ opacity: img.opacity / 100 }}
              />
              <Image
                src={img.src2}
                width={img.width}
                height={img.height}
                className="rounded-3xl"
                quality={100}
                alt=""
                style={{ opacity: img.opacity / 100 }}
              />
            </div>
          ))}
        </div>
        <div
          ref={iphoneRef}
          className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 opacity-100"
        >
          <div className="relative h-full w-full scale-125 overflow-hidden">
            <Iphone video="/videos/exercices/video1.mp4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Youtube;
