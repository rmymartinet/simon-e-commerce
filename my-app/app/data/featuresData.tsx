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
      "Apprends les bases du fitness avec des conseils clairs pour devenir autonome. Progresser et te débrouiller seul n’aura jamais été aussi simple.",
  },
  {
    logo: <TbArrowFork size={35} />,
    title: "Exercices Alternatifs",
    description:
      "Des alternatives sont proposées pour éviter la monotonie et s'adapter aux besoins ou inconforts spécifiques, garantissant une progression continue et flexible.",
  },
  {
    logo: <FaScaleBalanced size={35} />,
    title: "Mode de Vie de Récupération",
    description:
      "Optimise ta récupération grâce à des conseils sur l'hydratation, le sommeil et la gestion du stress pour maximiser les gains musculaires et éviter les blessures.",
  },
  {
    logo: <GiProgression size={35} />,
    title: "Surcharge Progressive",
    description:
      "Apprends à augmenter les charges de manière contrôlée pour développer efficacement tes muscles et ta force, en suivant une méthode structurée de progression.",
  },
  {
    logo: <GiShadowFollower size={35} />,
    title: "Suivi de l’Intensité",
    description:
      "Ajuste l'intensité de tes entraînements en fonction de tes progrès, pour maximiser tes résultats tout en évitant le surentraînement.",
  },
  {
    logo: <MdOutlineTimer size={35} />,
    title: "Durée du Programme et Deloads",
    description:
      "Comprends la structure du programme avec des phases de progression et de deload pour permettre à ton corps de se régénérer et éviter le surentraînement.",
  },
];

export const featuresCoaching = [
  {
    logo: <IoMdBook size={35} />,
    title: "Programme d'entraînement sur-mesure",
    description:
      "Profite d'un programme 100% adapté à ton objectif et à ton niveau. Nous prenons en compte tes besoins pour t'aider à progresser rapidement, sans risque de blessure.",
  },
  {
    logo: <GiStairsGoal size={35} />,
    title: "Objectifs adaptés à votre niveau",
    description:
      "Que tu sois débutant ou plus expérimenté, chaque programme est conçu pour te pousser à ton maximum, avec des objectifs réalistes et atteignables pour chaque étape de ta progression.",
  },
  {
    logo: <GiWeightLiftingUp size={35} />,
    title: "Suivi personnalisé",
    description:
      "Bénéficie d'un suivi régulier et d'une analyse de tes performances pour t'assurer que tu restes sur la bonne voie et atteignes tes objectifs plus rapidement.",
  },
  {
    logo: <FaBowlFood size={35} />,
    title: "Suivi nutritionnel",
    description:
      "Recevoir des conseils nutritionnels sur-mesure pour maximiser tes performances et tes résultats. Une alimentation adaptée à tes entraînements pour une progression optimale.",
  },
  {
    logo: <RiYoutubeFill size={35} />,
    title: "Vidéos de démonstration incluses",
    description:
      "Des vidéos claires et détaillées pour t'aider à maîtriser chaque mouvement avec une technique irréprochable, tout en suivant ton propre rythme.",
  },
  {
    logo: <GiNotebook size={35} />,
    title: "Fiches techniques des exercices",
    description:
      "Accède à des fiches pratiques et précises pour comprendre chaque exercice en profondeur, t'assurer d'une exécution parfaite et éviter les erreurs.",
  },
  {
    logo: <GrGroup size={35} />,
    title: "Accès à la communauté privée",
    description:
      "Rejoins une communauté de personnes motivées qui partagent leurs expériences, leurs astuces et s'entraident dans leurs parcours de remise en forme.",
  },
];
