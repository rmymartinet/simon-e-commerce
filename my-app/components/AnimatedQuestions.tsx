import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import useWindowWidth from "@/hooks/useWindowWidth";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedQuestionsProps {
  questions: string[];
}

const BREAKPOINT = 1024;
const ANIMATION_DURATION = 0.7;
const STAGGER_DELAY = 0.08;

const AnimatedQuestions = ({ questions }: AnimatedQuestionsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowWidth();

  const questionsToShow = useMemo(
    () => (width <= BREAKPOINT ? questions.slice(0, 8) : questions),
    [questions, width],
  );

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = gsap.utils.toArray<HTMLElement>(
      container.querySelectorAll(".question-item"),
    );

    gsap.set(elements, {
      opacity: 0,
      y: 24,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        once: true,
      },
    });

    tl.to(elements, {
      opacity: 1,
      y: 0,
      duration: ANIMATION_DURATION,
      ease: "power2.out",
      stagger: STAGGER_DELAY,
      clearProps: "transform",
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [width, questionsToShow.length]);

  return (
    <div ref={containerRef} className="relative w-full px-6 py-20">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {questionsToShow.map((question, index) => (
          <div
            key={index}
            className="question-item rounded-2xl border border-[--border-color] bg-[--card-bg] px-6 py-5 text-left text-lg shadow"
          >
            <span className="mr-2 text-sm font-semibold text-white/40">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-white/90">{question}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedQuestions;
