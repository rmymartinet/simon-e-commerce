import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { IoAdd } from "react-icons/io5";

const Accordion = ({
  index,
  title,
  text,
}: {
  index: number;
  title: string;
  text: string;
}) => {
  const accordionRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);
  const iconRef = useRef(null);

  const handleIsClicked = () => {
    setIsClicked(!isClicked);
  };
  useEffect(() => {
    gsap.to(accordionRef.current, {
      height: isClicked ? "auto" : 0,
      opacity: isClicked ? 1 : 0,
      duration: 0.7,
      ease: "power3.inOut",
    });

    gsap.to(iconRef.current, {
      rotate: isClicked ? 90 : 0,
      duration: 0.7,
      ease: "power3.inOut",
    });
  }, [isClicked]);

  return (
    <>
      <div
        onClick={handleIsClicked}
        className="flex w-full cursor-pointer flex-col items-center gap-6 overflow-hidden rounded-3xl py-6"
      >
        <div className="grid-cols-coachingNutrition grid w-full items-center justify-between gap-10">
          <span className="text-3xl lg:text-xl">0{index + 1}</span>
          <h1 className="text-2xl lg:text-4xl">{title}</h1>
          <div ref={iconRef} className="rounded-full border border-muted">
            <IoAdd className="text-2xl text-slate-700" />
          </div>
        </div>
        <p
          ref={accordionRef}
          className="h-0 max-w-[38vw] text-2xl opacity-0"
          dangerouslySetInnerHTML={{ __html: text }}
        ></p>
      </div>
    </>
  );
};

export default Accordion;
