import gsap from "gsap";

export const verticalDisplay = (
  ref: React.RefObject<HTMLElement>,
  delay: number,
  yPosition: number = 200,
) => {
  if (ref.current) {
    gsap.set(ref.current, {
      y: yPosition,
    });
    gsap.to(ref.current, {
      duration: 1,
      y: 0,
      delay: delay,
      ease: "power2.out",
    });
  }
};
