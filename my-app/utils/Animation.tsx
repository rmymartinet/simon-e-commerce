import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

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
    },
  });
};

gsap.registerPlugin(useGSAP);

export const animatePageIn = () => {
  const sentence = document.getElementById("sentence");

  if (sentence) {
    gsap.set(sentence, {
      yPercent: 0,
    });

    gsap.to(sentence, {
      delay: 0.5,
      yPercent: 200,
      duration: 0.7,
      ease: "power3.inOut",
    });
  }
};

export const animatePageOut = (
  href: string,
  router: AppRouterInstance,
  onComplete: () => void,
) => {
  const sentence = document.getElementById("sentence");

  if (sentence) {
    gsap.set(sentence, {
      yPercent: -200,
    });

    gsap.to(sentence, {
      yPercent: 0,
      duration: 0.7,
      ease: "power3.inOut",
      onComplete: () => {
        router.push(href);
        onComplete();
      },
    });
  }
};
