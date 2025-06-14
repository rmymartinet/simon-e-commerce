import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface CounterProps {
  target: number;
  title: string;
  subtitle: string;
  className?: string;
  countSign?: string;
}

const Counter = ({
  target,
  title,
  subtitle,
  countSign,
  className = "",
}: CounterProps) => {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      end: "bottom 20%",
      scrub: 1,
      once: true,
      onEnter: () => {
        const timeline = gsap.timeline();
        timeline.to(
          {},
          {
            duration: 2.5,
            onUpdate: () => {
              const progress = timeline.progress();
              const value = Math.floor(progress * target);
              setCount(value);
            },
          },
        );
      },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col items-center gap-2 ${className} md:items-start`}
    >
      <span className="text-8xl font-semibold">
        {count} {countSign}
      </span>
      <p className="font-semibold">{title}</p>
      <p className="text-center text-[--subtext] md:text-start">{subtitle}</p>
    </div>
  );
};

export default Counter;
