import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const textVerticalDisplay = (
  ref: React.RefObject<HTMLElement>,
  delay: number,
) => {
  if (ref.current) {
    const tl = gsap.timeline();
    tl.fromTo(
      ref.current,
      { y: 100, filter: "blur(10px)" },
      {
        duration: 1,
        y: 0,
        opacity: 1,
        delay,
        ease: "power2.out",
      },
    );

    return tl;
  }
};

export function textSplitLines(
  ref: React.RefObject<HTMLElement>,
  delay?: number,
) {
  if (ref.current) {
    const split = new SplitType(ref.current, {
      types: "lines",
    });

    split.lines?.forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.style.overflow = "hidden";
      wrapper.style.display = "block";
      wrapper.style.paddingBottom = "5px";
      if (line.parentNode) {
        line.parentNode.insertBefore(wrapper, line);
      }
      wrapper.appendChild(line);
    });

    gsap.from(split.lines, {
      filter: "blur(70px)",
      duration: 1,
      y: 100,
      opacity: 0,
      delay: delay,
      stagger: 0.05,
      ease: "power2.out",
    });

    return () => {
      split.revert();
    };
  }
}

export function textSplitLinesScrollTrigger(ref: React.RefObject<HTMLElement>) {
  if (ref.current) {
    const split = new SplitType(ref.current, {
      types: "lines",
    });

    split.lines?.forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.style.overflow = "hidden";
      wrapper.style.display = "block";
      wrapper.style.paddingBottom = "5px";

      if (line.parentNode) {
        line.parentNode.insertBefore(wrapper, line);
      }

      wrapper.appendChild(line);
    });

    gsap.set(split.lines, {
      y: 100,
      filter: "blur(70px)",
      opacity: 0,
    });

    gsap.to(split.lines, {
      scrollTrigger: {
        trigger: ref.current,
        start: "top 70%",
      },
      duration: 1,
      filter: "blur(0px)",
      y: 0,
      opacity: 1,
      stagger: 0.05,
      ease: "power2.out",
    });

    return () => {
      split.revert();
    };
  }
}
