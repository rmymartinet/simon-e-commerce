import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { data } from "@/app/data/nutritionAdviceData";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { textSplitLinesScrollTrigger } from "@/utils/common/textAnimation";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const NutritionAdvice = () => {
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    textSplitLinesScrollTrigger(textRef as React.RefObject<HTMLElement>);
  }, []);

  useGSAP(() => {
    lineRefs.current.forEach((el) => {
      gsap.to(el, {
        width: "100%",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom top",
          once: true,
        },
      });
    });

    gsap.set(titleRefs.current, { y: 100 });

    titleRefs.current.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 120%",
        onEnter: () => {
          gsap.fromTo(
            el,
            { y: 100 },
            {
              duration: 1,
              y: 0,
              ease: "power2.out",
            },
          );
        },
        once: true,
      });
    });

    textRefs.current.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        onEnter: () => {
          gsap.to(el, {
            delay: 0.5,
            duration: 1,
            opacity: 1,
            ease: "power2.out",
          });
        },
        once: true,
      });
    });
  }, []);

  return (
    <section className="mt-[20vh] flex flex-col gap-20 px-2">
      <div ref={textRef} className="flex flex-col items-center gap-20">
        <h1 className="max-w-5xl text-pretty break-words text-center text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          Les bons conseils nutritionnels
        </h1>
      </div>

      <div
        ref={contentRef}
        className="mt-20 flex flex-col gap-32 px-4 lg:px-20"
      >
        {data.map((item, index) => (
          <div key={index} className="flex flex-col gap-10">
            <div className="h-[2px] bg-[#27262a]">
              <div
                ref={(el) => {
                  lineRefs.current[index] = el;
                }}
                className="h-full w-0 text-[--subtext]"
              ></div>
            </div>
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex flex-col gap-4">
                <div className="overflow-hidden">
                  <h2
                    ref={(el) => {
                      titleRefs.current[index] = el;
                    }}
                    className="text-3xl font-semibold text-white md:text-4xl lg:text-6xl"
                  >
                    {item.title}
                  </h2>
                </div>
                <p
                  ref={(el) => {
                    textRefs.current[index] = el;
                  }}
                  className="text-sm text-[--subtext] opacity-0 md:text-base lg:text-lg"
                >
                  {item.description}
                </p>
              </div>
              <span className="text-xl text-[--subtext] lg:text-3xl">
                0{index + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NutritionAdvice;
