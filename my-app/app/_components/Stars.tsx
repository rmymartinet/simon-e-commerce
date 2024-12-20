import { StarsProps } from "@/types/types";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const Stars = ({ yposition, xposition, height, weight, isTop }: StarsProps) => {
  const starsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const selectRandomStar = () => {
      const randomIndex = Math.floor(Math.random() * starsRef.current.length);
      return starsRef.current[randomIndex];
    };

    const animateRandomStar = () => {
      const randomStar = selectRandomStar();

      if (randomStar) {
        gsap.to(randomStar, {
          duration: 0.5,
          scale: 1.1,
          opacity: 1,
          boxShadow:
            "0 0 1px 1px rgba(50, 145, 255, .8), 0 0 2px 1px rgba(50, 145, 255, .25)",
          onComplete: () => {
            gsap.to(randomStar, {
              duration: 2,
              scale: 1,
              opacity: 0.2,
              boxShadow: "none",
              onComplete: animateRandomStar, // Appel récursif pour animer une autre étoile
            });
          },
        });
      }
    };

    starsRef.current.forEach((star, index) => {
      const tl = gsap.timeline({ repeat: -1 });

      tl.to(star, {
        duration: 6,
        y: index % 2 === 0 ? 5 : -5,
        stagger: 0.1,
      });
      tl.to(star, {
        duration: 6,
        y: index % 2 === 0 ? -5 : 5,
        stagger: 0.1,
      });
    });

    animateRandomStar();
  }, []);

  return (
    <div
      className={`absolute ${yposition} ${xposition} -z-10 ${height} ${weight}`}
    >
      <div className="relative flex h-full w-full gap-4">
        {Array.from({ length: 100 }, (_, index) => {
          const randomPositionY = isTop
            ? Math.floor(Math.random() * 99) + 1 + "%"
            : Math.floor(Math.random() * 99) + 1;
          const randomPositionX = Math.floor(Math.random() * 99) + 1 + "%";
          return (
            <div
              key={index}
              ref={(el) => {
                starsRef.current[index] = el;
              }}
              className="absolute h-[1px] w-[1px] rounded-full bg-white opacity-20"
              style={{
                top: isTop ? randomPositionY : undefined,
                marginTop: !isTop ? randomPositionY : undefined,
                left: randomPositionX,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Stars;
