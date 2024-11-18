import { OverviewSectionProps } from "@/types/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Iphone from "./Iphone";

gsap.registerPlugin(useGSAP, Flip, ScrollTrigger);

const CoachingContent = ({ gradient }: OverviewSectionProps) => {
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
  const headerRef = useRef(null);
  const exerciceOverviewRef = useRef(null);
  const textRef = useRef(null);
  const cochingContainerRef = useRef(null);

  const moveIphoneXAxis = (
    ref: React.RefObject<HTMLDivElement>,
    delay?: number
  ) => {
    return gsap.fromTo(
      ref.current,
      { x: 200 },
      { x: 0, opacity: 1, duration: 1, ease: "power2.out", delay }
    );
  };

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cochingContainerRef.current,
        start: "top 50%",
      },
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

    tl.add([
      gsap.to(iphone1.current, { opacity: 0, duration: 0 }),
      gsap.to(iphone1bis.current, { opacity: 1, duration: 0 }),
      gsap.to(iphone1bis.current, { x: -225, duration: 1 }),
      gsap.to(textRef.current, {
        delay: 0.7,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      }),
    ]);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={cochingContainerRef}
      className={`${gradient} rounded-2xl h-full w-full lg:col-start-2-end-4 relative overflow-hidden`}
    >
      <div className="absolute top-0 h-full w-full flex justify-center items-center">
        <div ref={iphone1} className="z-10 scale-95 opacity-0">
          <Iphone imagesUrl={imagesUrls.userInterface} />
        </div>
        <div ref={iphone2} className="z-50 scale-125 opacity-0 relative">
          <Iphone imagesUrl={imagesUrls.accueil} />
        </div>
        <div ref={iphone3} className="z-10 scale-95 opacity-0">
          <Iphone imagesUrl={imagesUrls.stat} />
        </div>
      </div>
      <div
        ref={iphone1bis}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 scale-125 opacity-0"
      >
        <div className="relative">
          <Iphone videoUrls={videosUrls.intro} />
        </div>
      </div>
      <div
        ref={textRef}
        className="absolute top-40 w-[35%] right-20 flex flex-col items-end gap-20 opacity-0"
      >
        <div className="overflow-hidden rounded-xl flex flex-col center gap-4">
          <h1 className="text-4xl">Adaptatif en Temps Réel</h1>
          <p className="text-pretty">
            Dans l’application, vous pouvez ajuster en temps réel vos paramètres
            d’entraînement, tels que le nombre de répétitions et de séries. Dès
            le début, je définis les valeurs de base, et si vous dépassez vos
            objectifs ou avez des difficultés, vous pouvez les modifier
            directement.
          </p>
        </div>
        <div className="overflow-hidden rounded-xl flex flex-col center gap-4">
          <h1 className="text-4xl">Suivi et Vidéos d’Évolution</h1>
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

export default CoachingContent;
