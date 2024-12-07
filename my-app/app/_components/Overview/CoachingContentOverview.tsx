import useWindowWidth from "@/app/hooks/useWindowWidth";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Iphone from "../Iphone";

gsap.registerPlugin(useGSAP, Flip, ScrollTrigger);

const CoachingContentOverview = ({ gradient }: { gradient: string }) => {
  const imagesUrls = {
    accueil: "/images/virtualgym_app/accueilapp.png",
    userInterface: "/images/virtualgym_app/user_interface.png",
    stat: "/images/virtualgym_app/statapp.png",
  };
  const videosUrls = {
    intro: "/videos/app_video.mp4",
  };

  const iphone1 = useRef(null);
  const iphone1bis = useRef(null);
  const iphone2 = useRef(null);
  const iphone3 = useRef(null);
  const textContainerRef = useRef(null);
  const cochingContainerRef = useRef(null);

  const { width, isMounted } = useWindowWidth();

  const moveIphoneXAxis = (
    ref: React.RefObject<HTMLDivElement>,
    delay?: number,
  ) => {
    return gsap.fromTo(
      ref.current,
      { x: 200 },
      { x: 0, opacity: 1, duration: 1, ease: "power2.out", delay },
    );
  };

  useEffect(() => {
    if (!isMounted) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cochingContainerRef.current,
        start: "top 50%",
      },
      repeat: -1,
      repeatDelay: 24,
    });

    // Animations initiales
    tl.add([
      moveIphoneXAxis(iphone1, 0.5),
      moveIphoneXAxis(iphone2),
      moveIphoneXAxis(iphone3, 0.5),
    ]);

    tl.add([
      gsap.to(iphone2.current, { opacity: 0 }),
      gsap.to(iphone1.current, { scale: 1.25, x: 225, duration: 1 }),
      gsap.to(iphone3.current, { opacity: 0 }),
    ]);

    if (width > 768) {
      tl.add([
        gsap.to(iphone1.current, { opacity: 0, duration: 0 }),
        gsap.to(iphone1bis.current, { opacity: 1, duration: 0 }),
        gsap.to(iphone1bis.current, { x: -225, duration: 1 }),
        gsap.to(textContainerRef.current, {
          delay: 0.7,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        }),
      ]);
    } else {
      tl.add([
        gsap.to(iphone1.current, { opacity: 0, duration: 0 }),
        gsap.to(iphone1bis.current, { opacity: 1, duration: 0 }),
      ]);
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [width, isMounted]);

  return (
    <div
      ref={cochingContainerRef}
      className={`${gradient} relative h-full w-full overflow-hidden rounded-2xl lg:col-start-2-end-4`}
    >
      <div className="absolute top-0 flex h-full w-full items-center justify-center">
        <div
          ref={iphone1}
          className="z-10 h-[30vh] scale-95 opacity-0 md:h-[45vh] lg:h-full"
        >
          <Iphone imagesUrl={imagesUrls.userInterface} />
        </div>
        <div
          ref={iphone2}
          className="relative z-50 h-[30vh] scale-125 opacity-0 md:h-[45vh] lg:h-full"
        >
          <Iphone imagesUrl={imagesUrls.accueil} />
        </div>
        <div
          ref={iphone3}
          className="z-10 h-[30vh] scale-95 opacity-0 md:h-[45vh] lg:h-full"
        >
          <Iphone imagesUrl={imagesUrls.stat} />
        </div>
      </div>
      <div
        ref={iphone1bis}
        className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 scale-125 opacity-0"
      >
        <div className="relative h-[30vh] md:h-[45vh] lg:h-full">
          <Iphone videoUrls={videosUrls.intro} />
        </div>
      </div>
      <div
        ref={textContainerRef}
        className="absolute right-5 top-1/2 flex w-[45%] -translate-y-1/2 flex-col items-end gap-20 opacity-0 xl:right-20 xl:w-[35%]"
      >
        <div className="center flex flex-col gap-4 overflow-hidden rounded-xl">
          <h1 className="text-3xl">Adaptatif en Temps Réel</h1>
          <p className="text-pretty">
            Dans l’application, vous pouvez ajuster en temps réel vos paramètres
            d’entraînement, tels que le nombre de répétitions et de séries. Dès
            le début, je définis les valeurs de base, et si vous dépassez vos
            objectifs ou avez des difficultés, vous pouvez les modifier
            directement.
          </p>
        </div>
        <div className="center flex flex-col gap-4 overflow-hidden rounded-xl">
          <h1 className="text-3xl">Suivi et Vidéos d’Évolution</h1>
          <p className="text-pretty">
            Suivez vos progrès avec des statistiques détaillées et visualisez
            les mouvements en temps réel. Si vous avez des doutes, des vidéos
            YouTube de démonstration des exercices sont également disponibles
            pour vous guider.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoachingContentOverview;
