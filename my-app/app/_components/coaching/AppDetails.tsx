import { useGSAP } from "@gsap/react";
import Iphone from "../Iphone";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AppDetails = () => {
  const iphone1Ref = useRef(null);
  const iphone2Ref = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.set(iphone2Ref.current, { opacity: 0, y: 100 });
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=150%",
      scrub: true,
      onEnter: () => {
        gsap.to(iphone1Ref.current, {
          opacity: 0,
          y: -100,
          duration: 0.7,
          onComplete: () => {
            gsap.to(iphone2Ref.current, {
              opacity: 1,
              y: 0,
              duration: 0.7,
            });
          },
        });
      },
      onLeaveBack: () => {
        gsap.to(iphone2Ref.current, {
          opacity: 0,
          y: 100,
          duration: 0.7,

          onComplete: () => {
            gsap.to(iphone1Ref.current, {
              opacity: 1,
              y: 0,
              duration: 0.7,
            });
          },
        });
      },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mt-[70vh] flex h-[200vh] w-screen flex-col items-center gap-40 px-2 lg:h-[300vh]"
    >
      <div className="sticky top-1/2 flex -translate-y-1/2 flex-col">
        <div
          ref={iphone1Ref}
          className="absolute flex flex-col items-center gap-10 lg:grid lg:grid-cols-2 lg:gap-40"
        >
          <div className="justify-self-end">
            <Iphone video="/videos/exercices/exercice_change.mp4" />
          </div>
          <div className="flex flex-col gap-2 lg:w-[70%]">
            <h1 className="mb-4 text-center text-2xl font-bold md:text-start">
              Affinez chaque détail pour mieux performer
            </h1>

            <p className="text-md mt-4 hyphens-auto text-pretty text-justify text-muted md:mt-0 md:text-center lg:text-start">
              Vos programmes ne sont{" "}
              <span className="font-semibold text-white">pas figés</span> :
              ajustez chaque séance selon vos ressentis. En cas de besoin,{" "}
              <span className="font-semibold text-white">
                informez-moi directement
              </span>{" "}
              via l’application pour adapter ensemble vos objectifs et optimiser
              votre progression.
            </p>
          </div>
        </div>
        <div
          ref={iphone2Ref}
          className="flex flex-col items-center gap-10 lg:grid lg:grid-cols-2 lg:gap-40"
        >
          <div className="justify-self-end">
            <Iphone video="/videos/exercices/exercice-demo.mp4" />
          </div>
          <div className="flex flex-col gap-2 lg:w-[70%]">
            <h1 className="mb-4 text-center text-2xl font-bold md:text-start">
              Des démonstrations vidéo pour chaque mouvement
            </h1>
            <p className="text-md mt-4 hyphens-auto text-pretty text-justify text-muted md:mt-0 md:text-center lg:text-start">
              Ne restez jamais dans l&apos;incertitude : chaque mouvement est
              expliqué en vidéo dans{" "}
              <span className="font-semibold text-white">l’application</span>,
              et pour un accès supplémentaire, retrouvez l’ensemble de mes
              démonstrations sur{" "}
              <span className="font-semibold text-white">
                ma chaîne YouTube
              </span>
              . Vous n&apos;êtes jamais seuls pour progresser !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDetails;
