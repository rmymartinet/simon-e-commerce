import {
  FaBowlFood,
  FaPersonCirclePlus,
  FaScaleBalanced,
} from "react-icons/fa6";
import {
  GiNotebook,
  GiProgression,
  GiShadowFollower,
  GiStairsGoal,
  GiWeightLiftingUp,
} from "react-icons/gi";
import { GrGroup } from "react-icons/gr";
import { IoMdBook } from "react-icons/io";
import { MdOutlineTimer } from "react-icons/md";
import { RiYoutubeFill } from "react-icons/ri";
import { TbArrowFork } from "react-icons/tb";

export const featuresProgram = [
  {
    logo: <FaPersonCirclePlus size={35} />,
    title: "Auto-coaching",
    description:
      "Apprends les bases du fitness pour devenir autonome et progresser facilement.",
  },
  {
    logo: <TbArrowFork size={35} />,
    title: "Exercices Alternatifs",
    description:
      "Des alternatives pour éviter la monotonie et adapter tes entraînements à tes besoins.",
  },
  {
    logo: <FaScaleBalanced size={35} />,
    title: "Mode de Vie de Récupération",
    description:
      "Optimise ta récupération avec des conseils sur l'hydratation, le sommeil et la gestion du stress.",
  },
  {
    logo: <GiProgression size={35} />,
    title: "Surcharge Progressive",
    description:
      "Augmente les charges progressivement pour développer muscles et force efficacement.",
  },
  {
    logo: <GiShadowFollower size={35} />,
    title: "Suivi de l’Intensité",
    description:
      "Ajuste l'intensité de tes entraînements pour maximiser les résultats sans risquer le surentraînement.",
  },
  {
    logo: <MdOutlineTimer size={35} />,
    title: "Durée du Programme et Deloads",
    description:
      "Structure du programme avec des phases de progression et de récupération pour éviter le surentraînement.",
  },
];

export const featuresCoaching = [
  {
    logo: <IoMdBook size={35} />,
    title: "Programme d'entraînement sur-mesure",
    description:
      "Un programme 100% adapté à ton niveau et objectif pour progresser rapidement et en toute sécurité.",
  },
  {
    logo: <GiStairsGoal size={35} />,
    title: "Objectifs adaptés à votre niveau",
    description:
      "Des objectifs réalistes pour chaque étape de ta progression, que tu sois débutant ou avancé.",
  },
  {
    logo: <GiWeightLiftingUp size={35} />,
    title: "Suivi personnalisé",
    description:
      "Un suivi régulier pour t'assurer de rester sur la bonne voie et atteindre tes objectifs plus vite.",
  },
  {
    logo: <FaBowlFood size={35} />,
    title: "Suivi nutritionnel",
    description:
      "Des conseils nutritionnels sur-mesure pour optimiser tes performances et résultats.",
  },
  {
    logo: <RiYoutubeFill size={35} />,
    title: "Vidéos de démonstration incluses",
    description:
      "Des vidéos claires pour maîtriser chaque mouvement avec une technique parfaite à ton rythme.",
  },
  {
    logo: <GiNotebook size={35} />,
    title: "Fiches techniques des exercices",
    description:
      "Accède à des fiches pratiques pour exécuter chaque exercice de manière optimale.",
  },
  {
    logo: <GrGroup size={35} />,
    title: "Accès à la communauté privée",
    description:
      "Rejoins une communauté motivée pour partager astuces, conseils et soutien dans ta transformation.",
  },
];
