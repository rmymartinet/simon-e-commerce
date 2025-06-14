import { useLayoutEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import Flip from "gsap/Flip";
import ScrollTrigger from "gsap/ScrollTrigger";
import useWindowWidth from "@/hooks/useWindowWidth";

gsap.registerPlugin(Flip, ScrollTrigger);

interface AnimatedQuestionsProps {
  questions: string[];
}

const BREAKPOINT = 1024;
const MAX_TRIES = 100;
const ANIMATION_DURATION = 1.6;
const STAGGER_DELAY = 0.08;

const AnimatedQuestions = ({ questions }: AnimatedQuestionsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowWidth();

  const questionsToShow = useMemo(() => 
    width <= BREAKPOINT ? questions.slice(0, questions.length - 12) : questions,
    [questions, width]
  );

  useLayoutEffect(() => {
    if (width <= BREAKPOINT) return;

    const elements = gsap.utils.toArray<HTMLElement>(".question-item");
    const container = containerRef.current;
    if (!container) return;

    // Position initiale en grille
    elements.forEach((el) => {
      gsap.set(el, {
        position: "absolute",
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        opacity: 0,
        filter: "blur(70px)"
      });
    });

    const bounds = container.getBoundingClientRect();
    const placedRects: DOMRect[] = [];

    const hasOverlap = (rect: DOMRect, placedRects: DOMRect[]): boolean => {
      return placedRects.some((placed) => 
        !(rect.right < placed.left ||
          rect.left > placed.right ||
          rect.bottom < placed.top ||
          rect.top > placed.bottom)
      );
    };

    const tryPlace = () => {
      for (let i = 0; i < MAX_TRIES; i++) {
        const x = gsap.utils.random(100, bounds.width - 100);
        const y = gsap.utils.random(100, bounds.height - 100);

        const rect = new DOMRect(x - 50, y - 50, 100, 100); // Approximation de la taille

        if (!hasOverlap(rect, placedRects)) {
          placedRects.push(rect);
          return { x, y };
        }
      }
      return { x: bounds.width / 2, y: bounds.height / 2 };
    };

    // Créer la timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        once: true,
      },
    });

    // Animer chaque élément individuellement
    elements.forEach((el, index) => {
      const position = tryPlace();
      tl.to(el, {
        left: position.x,
        top: position.y,
        opacity: 1,
        filter: "blur(0px)",
        duration: ANIMATION_DURATION,
        ease: "power2.out",
      }, index * STAGGER_DELAY);
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [width]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden px-6 py-20"
    >
      <div
        className={`relative ${
          width <= BREAKPOINT ? "flex flex-col gap-6" : "absolute inset-0"
        }`}
      >
        {questionsToShow.map((question, index) => (
          <div
            key={index}
            className="question-item w-fit max-w-[90vw] rounded border border-[--border-color] bg-[--card-bg] px-6 py-4 text-center text-xl shadow"
          >
            {String(index + 1).padStart(2, '0')} - {question}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedQuestions;
