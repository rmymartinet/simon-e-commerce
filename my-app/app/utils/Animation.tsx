import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const revealRotateEl = (ref: React.RefObject<HTMLDivElement>) => {
  gsap.set(ref.current, {
    skewY: -5,
    y: 200,
    opacity: 0,
  });
  gsap.to(ref.current, {
    skewY: 0,
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.Out",
    scrollTrigger: {
      trigger: ref.current,
      start: "top bottom",
      markers: true,
    },
  });
};
