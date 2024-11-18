"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaUserFriends } from "react-icons/fa";
import { FaPersonWalking } from "react-icons/fa6";
import BeforeAfterPhoto from "./_components/BeforeAfterPhoto";
import FeaturesContainer from "./_components/Features/FeaturesContainer";
import ItemsFeatures from "./_components/Features/ItemsFeatures";
import Header from "./_components/Header";
import OverviewSection from "./_components/Overview/OverviewSection";
import { featuresCoaching, featuresProgram } from "./data/features";

gsap.registerPlugin(useGSAP);

export default function Home() {
  return (
    <>
      <Header />
      <OverviewSection
        gradient="program-gradient"
        bgColor="#CADCDC"
        isCoaching={false}
        titleContent="Programmes adaptés"
        descriptionContent="Chaque programme est conçu pour répondre à vos besoins et vous permettre de progresser rapidement selon votre niveau et vos objectifs."
        featureLayoutContent={{
          title: "Programmes adaptés",
          description:
            "Chaque programme est conçu pour répondre à vos besoins et vous permettre de progresser rapidement selon votre niveau et vos objectifs.",
          titleRight: "Conseils nutritionnels",
          descriptionRight:
            "Des recommandations adaptées pour optimiser votre alimentation et soutenir vos objectifs. Simples, efficaces et faciles à intégrer à votre quotidien.",
          titleLeft: "Vidéos de démonstration",
          descriptionLeft:
            "Des vidéos explicatives pour apprendre et exécuter chaque mouvement correctement. Un support visuel clair pour vous guider et maximiser vos résultats.",
        }}
        headerProps={{
          logo: <FaPersonWalking size={20} />,
          title: "Programmes adaptés",
          subtitle: "Adapté à chaque niveau",
          description:
            "Débutant, intermédiaire, ou avancé ? Choisissez le programme qui correspond à votre niveau pour progresser efficacement, avec des techniques d’entraînement adaptées à chaque étape.",
        }}
      >
        <FeaturesContainer title="Les programmes inclus">
          {featuresProgram.map((item, index) => (
            <ItemsFeatures
              key={index}
              logo={item.logo}
              title={item.title}
              paragraph={item.description}
            />
          ))}
        </FeaturesContainer>
      </OverviewSection>
      <OverviewSection
        gradient="coaching-gradient"
        headerProps={{
          logo: <FaUserFriends size={20} />,
          title: "Coaching personnalisé",
          subtitle: "Un suivi sur-mesure",
          description:
            "3 mois pour démarrer ou se remettre en forme, jusqu’à 9 mois pour des transformations durables. Plus le coaching est long, plus les changements sont profonds et adaptés.",
        }}
        titleContent="Coaching personnalisé"
        descriptionContent="Un suivi sur-mesure pour des résultats durables. Profite d’une approche complète et personnalisée pour t’accompagner dans l’atteinte de tes objectifs, en intégrant un suivi nutritionnel, des techniques d’entraînement avancées et des astuces de récupération, le tout pensé pour maximiser tes performances et t’offrir des résultats concrets et durables."
        featureLayoutContent={{
          title: "Coaching personnalisé",
          description:
            "Chaque programme est conçu pour répondre à vos besoins et vous permettre de progresser rapidement selon votre niveau et vos objectifs.",
          titleRight: "Suivi nutritionnel",
          descriptionRight:
            "Un accompagnement sur mesure grâce à l’application Food. Échangez en temps réel avec votre coach pour ajuster votre alimentation selon vos besoins, vos envies et vos objectifs. Une approche flexible et personnalisée pour des résultats durables.",
          titleLeft: "Suivi régulier en facetime",
          descriptionLeft:
            "Bénéficiez d’appels vidéo réguliers avec votre coach pour faire le point sur vos progrès, ajuster votre programme et répondre à vos questions, en fonction de l’offre choisie.",
        }}
        isCoaching
      >
        <FeaturesContainer title="Tous les plans inclus">
          {featuresCoaching.map((item, index) => (
            <ItemsFeatures
              key={index}
              logo={item.logo}
              title={item.title}
              paragraph={item.description}
            />
          ))}
        </FeaturesContainer>
      </OverviewSection>
      <BeforeAfterPhoto />
    </>
  );
}
