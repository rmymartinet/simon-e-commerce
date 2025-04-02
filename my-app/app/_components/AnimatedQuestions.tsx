import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Flip from "gsap/Flip";
import ScrollTrigger from "gsap/ScrollTrigger";
import useWindowWidth from "@/hooks/useWindowWidth";

gsap.registerPlugin(Flip, ScrollTrigger);

const AnimatedQuestions = ({ questions }: { questions: string[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowWidth();

  const questionsToShow =
    width <= 1024 ? questions.slice(0, questions.length - 12) : questions;

  useLayoutEffect(() => {
    if (width <= 1024) return;

    const elements = gsap.utils.toArray<HTMLElement>(".question-item");
    const state = Flip.getState(elements);

    const container = containerRef.current;
    if (!container) return;

    const bounds = container.getBoundingClientRect();
    const placedRects: DOMRect[] = [];

    const tryPlace = (el: HTMLElement, maxTries = 100) => {
      for (let i = 0; i < maxTries; i++) {
        const x = gsap.utils.random(100, bounds.width - 100);
        const y = gsap.utils.random(100, bounds.height - 100);

        el.style.position = "absolute";
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.transform = "translate(-50%, -50%)";

        const rect = el.getBoundingClientRect();

        const hasOverlap = placedRects.some((placed) => {
          return !(
            rect.right < placed.left ||
            rect.left > placed.right ||
            rect.bottom < placed.top ||
            rect.top > placed.bottom
          );
        });

        if (!hasOverlap) {
          placedRects.push(rect);
          return;
        }
      }

      el.style.left = `50%`;
      el.style.top = `50%`;
    };

    elements.forEach((el) => {
      tryPlace(el);
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        once: true,
      },
    });

    tl.add(
      Flip.from(state, {
        duration: 1.6,
        ease: "power3.out",
        stagger: 0.08,
        absolute: true,
        clearProps: "all", // 👈 ajoute juste ça ici
      }),
      0,
    );

    tl.fromTo(
      elements,
      { opacity: 0, filter: "blur(70px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.6,
        ease: "power2.out",
        stagger: 0.08,
      },
      0,
    );
  }, [width]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden px-6 py-20"
    >
      <div
        className={`relative ${
          width <= 1024 ? "flex flex-col gap-6" : "absolute inset-0"
        }`}
      >
        {questionsToShow.map((question, index) => (
          <div
            key={index}
            className="question-item w-fit max-w-[90vw] rounded border border-[--border-color] bg-[--card-bg] px-6 py-4 text-center text-xl shadow"
          >
            0{index + 1} - {question}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedQuestions;
