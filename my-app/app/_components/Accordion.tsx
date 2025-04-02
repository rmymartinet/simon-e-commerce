import useWindowWidth from "@/hooks/useWindowWidth";
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
  logoColor?: string;
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

  const { width } = useWindowWidth();

  return (
    <>
      <div
        onClick={handleIsClicked}
        className="flex w-full cursor-pointer flex-col items-center gap-6 overflow-hidden rounded-3xl py-6"
      >
        <div className="flex w-full items-center justify-between gap-10 lg:grid lg:grid-cols-coachingNutrition">
          {width > 1024 && <span className="lg:text-xl">0{index + 1}</span>}
          <h1 className="lg:text-2xl">{title}</h1>
          <div
            ref={iconRef}
            className="rounded-full border border-muted lg:p-2"
          >
            <IoAdd className="text-2xl text-muted" />
          </div>
        </div>
        <p
          ref={accordionRef}
          className="h-0 self-start text-sm opacity-0 lg:text-2xl"
          dangerouslySetInnerHTML={{ __html: text }}
        ></p>
      </div>
    </>
  );
};

export default Accordion;
