import { revealRotateEl } from "@/app/utils/Animation";
import { OverviewLeftAndRightFeaturesProps } from "@/types/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Iphone from "../Iphone";

const RightFeaturesOverview = ({
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

    // Initial setup for video elements
    gsap.set(videoRef.current, { xPercent: 300, opacity: 0, scale: 0 });

    const spacing = 0.2; // Espacement entre les vidéos

    const cards = gsap.utils.toArray(videoRef.current) as HTMLDivElement[];

    // Fonction pour animer chaque élément vidéo
    const animateFunc = (element: HTMLDivElement) => {
      const tl = gsap.timeline();
      tl.fromTo(
        element,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          zIndex: 100,
          duration: 0.75,
          yoyo: true,
          repeat: 1,
          ease: "power2.Out",
          immediateRender: false,
        },
      ).fromTo(
        element,
        { xPercent: 400 },
        { xPercent: -500, duration: 1.5, ease: "none", immediateRender: false }, // Durée ajustée pour ralentir la vidéo
        0,
      );
      return tl;
    };

    // Créer une boucle sans fin avec un délai contrôlé
    const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);

    // Ralentir la boucle en ajustant la durée globale
    gsap.to(seamlessLoop, {
      time: "+=" + seamlessLoop.duration(),
      duration: seamlessLoop.duration() * 4, // Ajoute un facteur pour ralentir la boucle
      repeat: -1,
      ease: "none",
      paused: false,
    });
  }, []);

  //fonction pour créer une boucle sans fin
  function buildSeamlessLoop(
    items: HTMLDivElement[],
    spacing: number,
    animateFunc: (element: HTMLDivElement) => gsap.core.Timeline,
  ) {
    const rawSequence = gsap.timeline({ paused: true });
    const seamlessLoop = gsap.timeline({
      paused: true,
      repeat: -1,
    });

    const cycleDuration = spacing * items.length; // Garde la durée de la boucle mais ralentie
    let duration: number = 0;

    // Boucle à travers les éléments et crée l'animation pour chaque
    items
      .concat(items)
      .concat(items)
      .forEach((item, i) => {
        const anim = animateFunc(items[i % items.length]);
        rawSequence.add(anim, i * spacing);
        if (duration === 0) duration = anim.duration();
      });

    // Mettre à jour la position du playhead pour une boucle fluide
    seamlessLoop.fromTo(
      rawSequence,
      {
        time: cycleDuration + duration / 2,
      },
      {
        time: "+=" + cycleDuration,
        duration: cycleDuration * 1.5, // Ralentir la boucle globale sans affecter chaque animation
        ease: "none",
      },
    );

    return seamlessLoop;
  }

  return (
    <div
      ref={containerRef}
      className={`${!isCoaching ? "grid grid-rows-2 md:grid-rows-featuresCard" : ""}} w-full overflow-hidden rounded-2xl bg-white p-6 lg:col-start-2-end-3`}
    >
      {!isCoaching && (
        <div className="gallery relative flex h-[30vh]">
          {videoUrls.map((url, index) => (
            <div
              key={index}
              ref={(el) => {
                videoRef.current[index] = el;
              }}
              className="opacity-1 absolute left-1/2 top-1/2 h-full w-[30%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl"
            >
              <video
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                src={url}
              />
            </div>
          ))}
        </div>
      )}
      {isCoaching && (
        <div className="relative flex h-[50vh] w-full">
          <Iphone imagesUrl="/images/call.png" />
        </div>
      )}
      <div className="mt-10 flex flex-col gap-4">
        <h1 className="text-3xl">{title}</h1>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default RightFeaturesOverview;
