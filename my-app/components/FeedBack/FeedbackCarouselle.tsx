import { feedBack } from "@/app/data/feedbackData";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import FeedBackCard from "./FeedBackCard";

const FeedBackCarouselle = () => {
  const container1Ref = useRef<HTMLDivElement>(null);
  const container2Ref = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  useEffect(() => {
    const container1 = container1Ref.current;
    const container2 = container2Ref.current;

    if (!container1 || !container2) return;

    const animate = () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.fromTo(
        [container1, container2],
        { x: "16px" }, // Position de départ
        {
          x: -(mainContainerRef.current?.offsetWidth || 0), // Déplace d'une largeur de conteneur
          duration: 40, // Durée initiale
          ease: "none", // Pas d'accélération pour un mouvement fluide
          repeat: -1, // Répète l'animation indéfiniment
          onUpdate: () => {
            if (container1) {
              const rect1 = container1.getBoundingClientRect();
              if (rect1.right <= 0) {
                gsap.set(container1, {
                  x: container2.getBoundingClientRect().right + 16 + "px",
                });
              }
            }
          },
        },
      );
    };

    animate();

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  useEffect(() => {
    if (animationRef.current) {
      gsap.to(animationRef.current, {
        duration: 0.5, // Durée de la transition pour changer la vitesse
        timeScale: isHover ? 0.5 : 1, // Ralentit l'animation lors du survol
      });
    }
  }, [isHover]);

  return (
    <div
      className="item relative flex h-[50vh] w-full items-center gap-4 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute z-50 h-full w-[20vw] bg-gradient-to-r from-[#0b0d14] to-transparent"></div>
      <div className="absolute right-0 z-50 h-full w-[20vw] bg-gradient-to-l from-[#0b0d14] to-transparent"></div>

      {/* Conteneur 1 */}
      <div ref={mainContainerRef} className="flex gap-4">
        <div ref={container1Ref} className="flex gap-4">
          {feedBack.slice(0, 5).map((item, i) => (
            <div key={`container1-${i}`} className="min-w-[300px]">
              <FeedBackCard
                firstName={item.firstName}
                imgUrl={item.photo}
                text={item.feedback}
              />
            </div>
          ))}
        </div>
        {/* Conteneur 2 */}
        <div ref={container2Ref} className="flex gap-4">
          {feedBack.slice(-5).map((item, i) => (
            <div key={`container1-${i}`} className="min-w-[300px]">
              <FeedBackCard
                firstName={item.firstName}
                imgUrl={item.photo}
                text={item.feedback}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedBackCarouselle;
