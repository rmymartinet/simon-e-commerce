"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaUserFriends } from "react-icons/fa";
import { FaPersonWalking } from "react-icons/fa6";
import { SiHellofresh } from "react-icons/si";
import BeforeAfterPhoto from "./_components/BeforeAfterPhoto";
import FeaturesContainer from "./_components/Features/FeaturesContainer";
import ItemsFeatures from "./_components/Features/ItemsFeatures";
import { default as GradiantSection } from "./_components/GradiantSection";
import Header from "./_components/Header";

gsap.registerPlugin(useGSAP);

export default function Home() {
  return (
    <>
      <Header />
      <GradiantSection
        gradiant="program-gradient"
        logo={<FaPersonWalking size={20} />}
        title="Programmes adaptées"
        subtitle="Adapté à chaque niveau"
        description="Débutant, intermédiaire, ou avancé ? Choisissez le programme qui correspond à votre niveau pour progresser efficacement, avec des techniques d’entraînement adaptées à chaque étape."
        titleContent="Programmes adaptées"
        descriptionContent="Chaque programme est concu pour répondre à vos besoins et vous permettre de progresser rapidement selon votre niveau et vos objectifs."
      >
        <FeaturesContainer>
          <ItemsFeatures
            logo={<SiHellofresh />}
            title="Mode de Vie de Récupération"
            paragraph="Découvre comment mieux récupérer pour progresser plus rapidement et éviter les blessures."
          />
          <ItemsFeatures
            logo={<SiHellofresh />}
            title="Vidéos de démonstration incluses"
            paragraph="Accède à des démonstrations vidéos pour maîtriser chaque mouvement, à ton rythme et en toute sécurité."
          />
          <ItemsFeatures
            logo={<SiHellofresh />}
            title="Surcharge Progressive"
            paragraph="Accède à des démonstrations vidéos pour maîtriser chaque mouvement, à ton rythme et en toute sécurité."
          />
          <ItemsFeatures
            logo={<SiHellofresh />}
            title="Suivi de l’Intensité"
            paragraph="Accède à des démonstrations vidéos pour maîtriser chaque mouvement, à ton rythme et en toute sécurité."
          />
          <ItemsFeatures
            logo={<SiHellofresh />}
            title="Exercices Alternatifs"
            paragraph="Accède à des démonstrations vidéos pour maîtriser chaque mouvement, à ton rythme et en toute sécurité."
          />
          <ItemsFeatures
            logo={<SiHellofresh />}
            title="Durée du Programme et Deloads"
            paragraph="Accède à des démonstrations vidéos pour maîtriser chaque mouvement, à ton rythme et en toute sécurité."
          />
        </FeaturesContainer>
      </GradiantSection>
      <GradiantSection
        gradiant="coaching-gradient"
        logo={<FaUserFriends size={20} />}
        title="Coaching personalisé"
        subtitle="Un suivi sur-mesure"
        description="Trois mois pour démarrer ou se remettre en forme, jusqu’à neuf mois pour des transformations durables. Plus le coaching est long, plus les changements sont profonds et adaptés."
        titleContent="Coaching personalisé"
        descriptionContent="Un suivi sur-mesure pour des résultats durables."
      >
        <FeaturesContainer>
          <ItemsFeatures
            logo={<SiHellofresh />}
            title="Support WhatsApp 12h/24h"
            paragraph="Transforme tes doutes en réponses immédiates ! Profite d’un accompagnement réactif pour maximiser tes résultats."
          />
          <ItemsFeatures
            logo={<SiHellofresh />}
            title="Bilan des progrès chaque semaine"
            paragraph="Suis chaque étape de ta progression et reste motivé avec un bilan complet de tes performances chaque semaine."
          />
          <ItemsFeatures
            logo={<SiHellofresh />}
            title="Suivi de l’alimentation"
            paragraph="Obtiens des conseils personnalisés pour optimiser ton alimentation et booster tes performances."
          />
          <ItemsFeatures
            logo={<SiHellofresh />}
            title="Applications de suivi"
            paragraph="Obtiens des conseils personnalisés pour optimiser ton alimentation et booster tes performances."
          />
          <ItemsFeatures
            logo={<SiHellofresh />}
            title="Vidéos de démonstration incluses"
            paragraph="Accède à des démonstrations vidéos pour maîtriser chaque mouvement, à ton rythme et en toute sécurité."
          />
        </FeaturesContainer>
      </GradiantSection>
      <BeforeAfterPhoto />
    </>
  );
}
