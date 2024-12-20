import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const data = [
  {
    title: "Répartitissez vos aliments",
    description: (
      <>
        Que ce soit pour{" "}
        <span className="font-semibold text-violet-500">perdre du poids</span>,{" "}
        <span className="font-semibold text-violet-500">
          prendre de la masse
        </span>{" "}
        ou{" "}
        <span className="font-semibold text-violet-500">
          maintenir votre forme
        </span>
        , apprenez à structurer vos repas en fonction de vos objectifs et de
        votre mode de vie. Planifiez vos repas pré- et post-entraînement pour
        optimiser vos performances et vos résultats, tout en ajustant vos
        collations à vos besoins.
      </>
    ),
  },
  {
    title: "Composez vos repas comme un expert",
    description: (
      <>
        Apprenez à sélectionner les bons aliments pour équilibrer vos
        macronutriments ({" "}
        <span className="font-semibold text-violet-500">glucides</span>,{" "}
        <span className="font-semibold text-violet-500">protéines</span>,{" "}
        <span className="font-semibold text-violet-500">lipides</span> ) et
        micronutriments. Chaque repas est conçu pour respecter vos besoins
        spécifiques. Exemple : si votre petit-déjeuner nécessite{" "}
        <span className="font-semibold text-violet-500">200 g de glucides</span>
        , découvrez comment choisir les aliments adaptés tout en respectant vos
        besoins en protéines et lipides.
      </>
    ),
  },
  {
    title: "Des menus savoureux et adaptés à vos objectifs",
    description: (
      <>
        Choisissez des recettes savoureuses qui respectent vos{" "}
        <span className="font-semibold text-violet-500">
          objectifs nutritionnels
        </span>
        . Ajustez vos repas pour un équilibre optimal, que ce soit en cuisinant
        maison pour plus de contrôle ou en planifiant avec du{" "}
        <span className="font-semibold text-violet-500">meal-prep</span>. Vous
        aurez toutes les clés pour manger équilibré, tout en prenant du plaisir.
      </>
    ),
  },
];

const ProgramNutrition = () => {
  const numsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    numsRefs.current.forEach((num) => {
      gsap.to(num, {
        scrollTrigger: {
          trigger: num,
          start: "top 80%",
          end: "bottom 80%",
          scrub: 1,
          once: false,
        },
        scale: 1.4,
        duration: 1,
        border: "1px solid violet",
      });
    });
  }, []);

  return (
    <div className="mt-[20vh] flex w-screen flex-col items-center gap-20">
      <div className="mb-20 flex flex-col items-center text-center md:mb-[10vh]">
        <h1 className="text-xl font-bold lg:text-3xl">
          Une nutrition adaptée pour des résultats durables
        </h1>
        <p className="font-medium text-textOpacity md:text-lg">
          Manger intelligemment, c’est 50% du chemin vers vos objectifs
        </p>
        <div className="relative mt-4 w-max">
          <button className="program-button-container padding rounded-xl font-bold">
            Voir les offres
          </button>
          <div className="absolute inset-0 -z-10 h-full w-full rounded-xl bg-[#f690ff] blur-sm"></div>
          <div className="absolute inset-0 -z-10 h-full w-full rounded-xl bg-[#0b0d14]"></div>
        </div>
      </div>
      <div className="relative flex flex-col items-center gap-20">
        {data.map((item, index) => (
          <div
            className="flex flex-col-reverse items-center gap-20 px-2 lg:grid lg:grid-cols-2 lg:px-40"
            key={index}
          >
            <div className="flex flex-col gap-2 text-center lg:text-start">
              <h1 className="text-2xl font-bold">{item.title}</h1>
              <p className="text-pretty break-words text-lg text-textOpacity">
                {item.description}
              </p>
            </div>
            <div
              ref={(el) => {
                numsRefs.current[index] = el;
              }}
              className="grid h-10 w-10 place-content-center justify-self-end rounded-full border-card p-6"
            >
              <strong>{index + 1} </strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramNutrition;
