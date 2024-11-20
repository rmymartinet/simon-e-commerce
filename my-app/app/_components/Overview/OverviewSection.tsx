import { OverviewSectionProps } from "@/types/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import OverviewFeatureLayout from "./OverviewFeatureLayout";
import OverviewHearder from "./OverviewHearder";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const OverviewSection = ({
  gradient,
  featureLayoutContent,
  isCoaching,
  children,
  headerProps,
}: OverviewSectionProps) => {
  const gradientRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.to(gradientRef.current, {
      scale: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section ref={containerRef} className="flex flex-col">
      <div className="relative flex flex-col gap-20 overflow-hidden px-2 lg:px-6">
        <div
          ref={gradientRef}
          className={`absolute ${gradient} left-0 top-0 -z-10 h-1/4 w-screen scale-50 md:h-1/3 lg:h-1/3`}
        ></div>
        <OverviewHearder headerProps={headerProps} />
        <OverviewFeatureLayout
          featureLayoutContent={featureLayoutContent}
          gradient={gradient}
          isCoaching={isCoaching}
        />
        {children}
      </div>
    </section>
  );
};

export default OverviewSection;
