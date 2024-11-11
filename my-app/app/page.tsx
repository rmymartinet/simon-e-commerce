"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { SiHellofresh } from "react-icons/si";
import FeaturesContainer from "./_components/Features/FeaturesContainer";
import ItemsFeatures from "./_components/Features/ItemsFeatures";
import { default as GradiantSection } from "./_components/GradiantSection";

gsap.registerPlugin(useGSAP);

export default function Home() {
  const chgRef = useRef<(HTMLDivElement | null)[]>([]);

  const names = ["bonjour", "beh", "beh2", "bou"];

  // useGSAP(() => {
  //   const tl = gsap.timeline({ repeat: -1 });
  //   chgRef.current.forEach((el) => {
  //     tl.fromTo(
  //       el,
  //       {
  //         rotate: 70,
  //         x: 2000,
  //         y: 2000,
  //       },
  //       {
  //         rotate: 0,
  //         x: 0,
  //         y: 0,
  //         duration: 1,
  //         ease: "power2.inOut",
  //       }
  //     );
  //     tl.to(el, {
  //       delay: 2,
  //       rotate: -70,
  //       x: -2000,
  //       y: 1000,
  //       duration: 1,
  //       ease: "power2.inOut",
  //     });
  //   });
  // }, []);
  return (
    <>
      <GradiantSection
        gradiant="gradient1"
        title="Programmes adaptées"
        subtitle="Adapté à chaque niveau"
        description="Débutant, intermédiaire, ou avancé ? Choisissez le programme qui correspond à votre niveau pour progresser efficacement, avec des techniques d’entraînement adaptées à chaque étape."
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
        gradiant="gradient2"
        title="Coaching personalisé"
        subtitle="Un suivi sur-mesure"
        description="Trois mois pour démarrer ou se remettre en forme, jusqu’à neuf mois pour des transformations durables. Plus le coaching est long, plus les changements sont profonds et adaptés."
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

      <div className="overflow-hidden h-screen  flex flex-col items-center justify-center p-6 relative bg-white">
        <h1 className="absolute top-0 left-0 m-6 text-6xl">
          Changer comme prénom
        </h1>
        <div className="flex items-center justify-center w-full h-full">
          {names.map((test, index) => (
            <div
              key={index}
              ref={(el) => {
                chgRef.current[index] = el;
              }}
              className="absolute w-[40vw] h-[40vh] grid grid-cols-2 justify-items-center items-end "
            >
              {names[index]}
              {/* <Image
             className="absolute top-0 left-0 w-full h-full object-cover"
             src="/test.png"
             alt=""
             width={500}
             height={500}
           /> */}
              <div className="bg-red-400">
                <span>0 mois</span>
              </div>
              <div className="bg-red-400">
                <span>6 mois</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
