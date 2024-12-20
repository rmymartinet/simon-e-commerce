import { useGSAP } from "@gsap/react";
import Iphone from "../Iphone";
import gsap from "gsap";
import { useRef } from "react";
import { FaTrophy } from "react-icons/fa6";
import confetti from "canvas-confetti";
import PurpleLight from "../PurpleLight";

gsap.registerPlugin(useGSAP);

const AppDetails = () => {
  const lineRef = useRef(null);
  const trophyRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(lineRef.current, {
      scrollTrigger: {
        trigger: lineRef.current,
        start: "top bottom",
        end: "bottom center",
        once: false,
        scrub: 1,
      },
      duration: 1,
      width: "100%",
    });

    gsap.to(trophyRef.current, {
      scrollTrigger: {
        trigger: trophyRef.current,
        start: "top 70%",
        end: "bottom center",
        once: false,
        scrub: 1,
      },
      duration: 1,
      scale: 1.2,
    });
  }, []);

  const handleClick = () => {
    console.log("clicked");

    if (trophyRef.current) {
      const trophyPosition = trophyRef.current.getBoundingClientRect();
      const centerX = trophyPosition.left + trophyPosition.width / 2;
      const centerY = trophyPosition.top + trophyPosition.height / 2;

      const origin = {
        x: (centerX + window.scrollX) / window.innerWidth,
        y: (centerY + window.scrollY) / window.innerHeight,
      };

      console.log("Trophy Position:", trophyPosition);
      console.log("Confetti Origin:", origin);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          y: 0.32,
          x: 0.7,
        },
      });
    }
  };

  return (
    <div className="relative mt-[40vh] flex w-screen flex-col items-center gap-40 px-2">
      <PurpleLight
        yposition="-bottom-[40vh]"
        xposition="-left-[30vw]"
        height="h-full"
        width="w-[30%]"
      />

      <div className="relative flex w-max items-center gap-4 lg:gap-20">
        <div
          ref={lineRef}
          className="absolute left-0 top-1/2 -z-10 h-[1px] w-0 -translate-y-1/2 bg-[#7cbdeb] blur-[1px]"
        ></div>
        <h1 className="card text-md rounded-full px-2 py-2 font-bold lg:px-4 lg:text-xl">
          Communiquer
        </h1>
        <h1 className="card text-md rounded-full px-2 py-2 font-bold lg:px-4 lg:text-xl">
          Accompagner
        </h1>
        <h1 className="card text-md rounded-full px-2 py-2 font-bold lg:px-4 lg:text-xl">
          Réussir
        </h1>
        <div
          onClick={() => handleClick()}
          ref={trophyRef}
          className="card relative rounded-full p-2 lg:p-4"
        >
          <FaTrophy color="white" size={20} />
          <div className="absolute inset-0 -z-10 h-full w-full rounded-full bg-[#7cbdeb] blur-sm"></div>
          <div className="absolute inset-0 -z-10 h-full w-full rounded-full bg-[#0b0d14]"></div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-10 lg:grid lg:grid-cols-2 lg:gap-40">
        <div className="justify-self-end">
          <Iphone video="/videos/exercice_change.mp4" />
        </div>
        <div className="flex flex-col gap-2 lg:w-[70%]">
          <h1 className="text-center text-2xl font-bold md:text-start">
            Affinez chaque détail pour mieux{" "}
            <span className="font-bold text-violet-600">performer</span>
          </h1>

          <p className="text-md mt-4 text-center font-semibold text-textOpacity md:mt-0 md:text-start">
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
      <div className="flex flex-col items-center gap-10 lg:grid lg:grid-cols-2 lg:gap-40">
        <div className="justify-self-end">
          <Iphone video="/videos/exercice-demo.mp4" />
        </div>
        <div className="flex flex-col gap-2 lg:w-[70%]">
          <h1 className="text-center text-2xl font-bold md:text-start">
            Des{" "}
            <span className="font-bold text-violet-600">démonstrations</span>{" "}
            vidéo pour chaque mouvement
          </h1>

          <p className="text-md mt-4 text-center font-semibold text-textOpacity md:mt-0 md:text-start">
            Ne restez jamais dans l&apos;incertitude : chaque mouvement est
            expliqué en vidéo dans{" "}
            <span className="font-semibold text-white">l’application</span>, et
            pour un accès supplémentaire, retrouvez l’ensemble de mes
            démonstrations sur{" "}
            <span className="font-semibold text-white">ma chaîne YouTube</span>.
            Vous n&apos;êtes jamais seuls pour progresser !
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppDetails;
