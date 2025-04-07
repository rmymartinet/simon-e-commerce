import { useEffect, useRef } from "react";
import gsap from "gsap";

const CircleChart = ({
  progressValue,
  total,
  type,
  color,
}: {
  progressValue: number;
  total: number;
  type: string;
  color: string;
}) => {
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.to(progressRef.current, {
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: progressRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        onEnter: () => {
          gsap.to(progressRef.current, {
            duration: 2,
            ease: "power2.out",
            onUpdate: function () {
              const progress = this.progress() * progressValue;
              progressRef.current?.style.setProperty(
                "--progress",
                `${progress}deg`,
              );
              progressRef.current?.style.setProperty("--color", color);
            },
          });
        },
      },
    });
  }, [progressValue, color]);

  return (
    <div className="relative h-[120px] w-[120px] rounded-full bg-[#1d1d1d]">
      <div
        ref={progressRef}
        className="circle-progress absolute inset-0 h-full w-full rounded-full"
      ></div>
      <div className="circle-cover absolute left-[10px] top-[10px] flex flex-col items-center justify-center rounded-full bg-[#000] text-center">
        <span className="text-2xl font-bold">{total}</span>
        <span className="text-sm text-textOpacity">{type}</span>
      </div>
    </div>
  );
};

export default CircleChart;
