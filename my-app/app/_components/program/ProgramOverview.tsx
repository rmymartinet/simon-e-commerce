import { useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { GiWeightLiftingUp } from "react-icons/gi";
import { GiProgression } from "react-icons/gi";
import { CiCircleList } from "react-icons/ci";
import Stars from "../Stars";

const ProgramOverview = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const videos = [
    "/videos/program/presentation.mp4",
    "/videos/program/ppl.mp4",
    "/videos/program/week.mp4",
    "/videos/program/exercice.mp4",
  ];
  const logo = [
    { logo: <CiCircleList size={25} /> },
    { logo: <GiProgression size={25} /> },
    { logo: <IoCalendarNumberOutline size={25} /> },
    { logo: <GiWeightLiftingUp size={25} /> },
  ];

  const handleVideoEnd = (currentIndex: number) => {
    const currentVideo = videoRefs.current[currentIndex];
    const currentButton = buttonRefs.current[currentIndex];
    const nextIndex = (currentIndex + 1) % videoRefs.current.length; // Pour boucler
    const nextButton = buttonRefs.current[nextIndex];
    const nextVideo = videoRefs.current[nextIndex];

    if (currentVideo && nextVideo) {
      const tl = gsap.timeline();

      // Transition de la vidéo actuelle vers x = -1500
      tl.to(currentVideo, {
        duration: 1,
        x: "-1500",
        ease: "power2.out",
        onComplete: () => {
          currentVideo.pause();
          currentVideo.currentTime = 0; // Réinitialiser la vidéo
        },
      });

      // Faire entrer la prochaine vidéo depuis x = 1500
      tl.fromTo(
        nextVideo,
        { x: "1500" },
        {
          duration: 1,
          x: "0",
          ease: "power2.out",
          onStart: () => {
            nextVideo.play();
          },
        },
        "-=1",
      );
    }

    if (currentButton && nextButton) {
      gsap.to(currentButton, {
        duration: 0.7,
        ease: "power2.out",
        scale: 1,
        opacity: 0.5,
      });
      gsap.to(nextButton, {
        duration: 0.7,
        ease: "power2.out",
        scale: 1.1,
        opacity: 1,
      });
    }
  };

  useEffect(() => {
    // Positionner toutes les vidéos sauf la première en dehors de l'écran (x: 1500)
    videoRefs.current.forEach((video, index) => {
      if (video) {
        gsap.set(video, { x: index === 0 ? "0" : "1500" });
      }
    });

    buttonRefs.current.forEach((button, index) => {
      gsap.set(button, {
        scale: index === 0 ? 1.1 : 1,
        opacity: index === 0 ? 1 : 0.5,
      });
    });

    // Ajouter des écouteurs pour chaque vidéo
    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.addEventListener("ended", () => handleVideoEnd(index));
      }
    });

    // Jouer la première vidéo au chargement
    if (videoRefs.current[0]) {
      const playVideoDelay = setTimeout(() => {
        videoRefs.current[0]?.play();
      }, 1000);

      return () => clearTimeout(playVideoDelay);
    }

    return () => {
      // Nettoyer les écouteurs pour éviter des fuites mémoire
      videoRefs.current.forEach((video, index) => {
        if (video) {
          video.removeEventListener("ended", () => handleVideoEnd(index));
        }
      });
    };
  }, []);

  return (
    <div
      id="program"
      className="relative mt-[20vh] flex w-screen flex-col items-center gap-20 overflow-hidden"
    >
      <div className="flex w-full flex-col gap-20">
        <div className="flex items-center justify-center overflow-hidden text-sm font-bold">
          <div className="program-title-gradient-l h-[2px] w-60 rounded-full"></div>
          <div className="relative">
            <div className="bg-pg-title absolute left-1/2 top-1/2 -z-10 h-4 w-[9rem] -translate-x-1/2 -translate-y-1/2 blur-lg"></div>
            <p className="px-4 text-lg text-[#f690ff]">Programmes</p>
          </div>
          <div className="program-title-gradient-r h-[2px] w-60 rounded-full"></div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 md:gap-0">
          <h1 className="text-center text-xl font-bold md:text-3xl">
            Des programmes faits pour vous
          </h1>
          <p className="text-center font-medium text-subtle md:text-lg">
            Débutant, intermédiaire ou confirmé : progressez à votre rythme
          </p>
        </div>
      </div>
      <div className="program-background relative w-[200vw] rounded-2xl md:w-[80vw] md:p-3">
        <Stars
          yposition="-top-10"
          xposition="left-0"
          height="h-20"
          weight="w-full"
          isTop={false}
        />
        <Stars
          yposition="-bottom-10"
          xposition="left-0"
          height="h-20"
          weight="w-full"
          isTop={false}
        />
        <Stars
          yposition="top-0"
          xposition="-right-10"
          height="h-full"
          weight="w-20"
          isTop={true}
        />

        <Stars
          yposition="top-0"
          xposition="-left-10"
          height="h-full"
          weight="w-20"
          isTop={true}
        />
        <div className="relative overflow-hidden">
          <Image
            src="/images/mac_background.png"
            alt=""
            width={2000}
            height={2000}
            className="h-full w-full rounded-lg object-fill"
            quality={100}
          />

          {videos.map((video, index) => (
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              src={video}
              key={index}
              muted
              preload="auto"
              className="absolute -right-[20vw] top-1/2 z-50 h-[80%] -translate-y-1/2 rounded-lg object-cover shadow-lg md:left-1/2 md:top-1/2 md:h-[70%] md:-translate-x-1/2 md:rounded-xl"
            />
          ))}
        </div>
      </div>
      <div className="program-button-container absolute bottom-5 left-1/2 z-50 hidden -translate-x-1/2 grid-cols-4 gap-2 rounded-xl p-2 lg:grid">
        {logo.map((log, index) => (
          <button
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            key={index}
            className="program-button grid place-content-center rounded-xl border border-gray-400 px-2 py-1 focus:outline-none lg:px-4 lg:py-3"
          >
            {log.logo}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProgramOverview;
