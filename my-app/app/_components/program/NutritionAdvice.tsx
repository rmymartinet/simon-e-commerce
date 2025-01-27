import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { data } from "@/app/data/nutritionAdviceData";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../Button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const NutritionAdvice = () => {
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const pinRef = useRef<HTMLSpanElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    lineRefs.current.forEach((el) => {
      gsap.to(el, {
        width: "100%",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          once: true,
        },
      });
    });

    gsap.set(titleRefs.current, { y: 100 });

    titleRefs.current.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
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

    // if (pinRef.current && contentRef.current) {
    //   gsap.to(pinRef.current, {
    //     scrollTrigger: {
    //       trigger: contentRef.current,
    //       start: "top 40px",
    //       end: "bottom top",
    //       pin: pinRef.current,
    //       scrub: 0.5,
    //     },
    //   });
    // }
  }, []);

  return (
    <div className="mt-[20vh] flex flex-col gap-20 px-4">
      <div className="mb-10 flex flex-col gap-20 md:mb-40">
        <p className="max-w-5xl text-pretty break-words text-3xl lg:text-7xl">
          Des conseils sur-mesure pour équilibrer vos repas et atteindre vos
          objectifs durablement
        </p>
        <div className="self-center">
          <Button href="/pricing" />
        </div>
      </div>
      <div
        ref={contentRef}
        className="flex flex-col gap-20 lg:grid lg:grid-cols-2"
      >
        <span ref={pinRef} className="max-w-lg md:font-medium lg:text-3xl">
          Bien manger, c’est 70 % de vos objectifs atteints.
        </span>
        <div className="flex flex-col gap-14">
          {data.map((item, index) => (
            <div key={index}>
              <div className="h-[2px] bg-[#27262a]">
                <div
                  ref={(el) => {
                    lineRefs.current[index] = el;
                  }}
                  className="h-full w-0 bg-muted"
                ></div>
              </div>
              <div key={index} className="flex justify-between pt-6 lg:mb-36">
                <div className="flex flex-col gap-8">
                  <div className="overflow-hidden">
                    <h1
                      ref={(el) => {
                        titleRefs.current[index] = el;
                      }}
                      className="text-4xl lg:text-7xl"
                    >
                      {item.title}
                    </h1>
                  </div>
                  <p
                    ref={(el) => {
                      textRefs.current[index] = el;
                    }}
                    className="md:text-md text-pretty break-words text-sm text-muted opacity-0 lg:text-lg"
                  >
                    {item.description}
                  </p>
                </div>
                <span className="text-3xl text-muted lg:text-5xl">
                  0{index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NutritionAdvice;
