export const textVerticalDisplay = (
  ref: React.RefObject<HTMLElement>,
  delay: number,
) => {
  if (ref.current) {
    console.log(ref.current);
    const tl = gsap.timeline();
    tl.fromTo(
      ref.current,
      { y: 100 },
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
