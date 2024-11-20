"use client";

import { useState } from "react";
import { FaBowlFood } from "react-icons/fa6";
import { GiNotebook, GiStairsGoal, GiWeightLiftingUp } from "react-icons/gi";
import { GrGroup } from "react-icons/gr";
import { IoMdBook } from "react-icons/io";
import { RiYoutubeFill } from "react-icons/ri";
import CardPriceContainer from "../_components/Card/CardPriceContainer";
import FeaturesContainer from "../_components/Features/FeaturesContainer";
import ItemsFeatures from "../_components/Features/ItemsFeatures";
import Filter from "../_components/Filter";

const icons = {
  book: <IoMdBook />,
  goal: <GiStairsGoal />,
  follower: <GiWeightLiftingUp />,
  food: <FaBowlFood />,
  video: <RiYoutubeFill />,
  notebook: <GiNotebook />,
  group: <GrGroup />,
};

export default function Pricing() {
  const [filterName, setFilterName] = useState("programmes");

  return (
    <div className="relative mt-72 flex min-h-screen flex-col items-end justify-center gap-60 px-2 md:px-20 lg:px-0">
      <div className="absolute left-0 top-0 -z-10 h-full w-full"></div>
      <div className="flex flex-col items-center justify-center gap-40">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center text-4xl md:text-6xl">
            Une solution pour chaques besoins
          </h1>
          <p className="text-xl text-slate-400">
            Choisissez la solution qui vous conviens le mieux.
          </p>
        </div>
        <Filter filterName={filterName} setFilterName={setFilterName} />
        <CardPriceContainer filterName={filterName} />
      </div>
      <FeaturesContainer title="Tous les plans inclus">
        <ItemsFeatures
          logo={<IoMdBook size={35} />}
          title="Programme d'entraînement sur-mesure"
          paragraph="Profite d'un programme 100% adapté à ton objectif et à ton niveau. Nous prenons en compte tes besoins pour t'aider à progresser rapidement, sans risque de blessure."
        />
        <ItemsFeatures
          logo={<GiStairsGoal size={35} />}
          title="Objectifs adaptés à votre niveau"
          paragraph="Que tu sois débutant ou plus expérimenté, chaque programme est conçu pour te pousser à ton maximum, avec des objectifs réalistes et atteignables pour chaque étape de ta progression."
        />
        <ItemsFeatures
          logo={<GiWeightLiftingUp size={35} />}
          title="Suivi personnalisé"
          paragraph="Bénéficie d'un suivi régulier et d'une analyse de tes performances pour t'assurer que tu restes sur la bonne voie et atteignes tes objectifs plus rapidement."
        />
        <ItemsFeatures
          logo={<FaBowlFood size={35} />}
          title="Suivi nutritionnel"
          paragraph="Recevoir des conseils nutritionnels sur-mesure pour maximiser tes performances et tes résultats. Une alimentation adaptée à tes entraînements pour une progression optimale."
        />
        <ItemsFeatures
          logo={<RiYoutubeFill size={35} />}
          title="Vidéos de démonstration incluses"
          paragraph="Des vidéos claires et détaillées pour t'aider à maîtriser chaque mouvement avec une technique irréprochable, tout en suivant ton propre rythme."
        />
        <ItemsFeatures
          logo={<GiNotebook size={35} />}
          title="Fiches techniques des exercices"
          paragraph="Accède à des fiches pratiques et précises pour comprendre chaque exercice en profondeur, t'assurer d'une exécution parfaite et éviter les erreurs."
        />
        <ItemsFeatures
          logo={<GrGroup size={35} />}
          title="Accès à la communauté privée"
          paragraph="Rejoins une communauté de personnes motivées qui partagent leurs expériences, leurs astuces et s'entraident dans leurs parcours de remise en forme."
        />
      </FeaturesContainer>
    </div>
  );
}
