import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { FaArrowDown } from "react-icons/fa6";

gsap.registerPlugin(useGSAP);

const Accordion = ({ title, text }: { title: string; text: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const textRef = useRef(null);
  const iconRef = useRef(null);
  const titleRef = useRef(null);
  const bgRef = useRef(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useGSAP(() => {
    if (isOpen) {
      gsap.to(textRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.7,
        ease: "power3.inOut",
      });
      gsap.to(iconRef.current, {
        backgroundColor: "black",
        scale: 1.2,
        duration: 0.7,
        ease: "power3.inOut",
      });
      gsap.to(titleRef.current, {
        color: "#9D4EDD",
        duration: 0.7,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(textRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.7,
        ease: "power3.inOut",
      });

      gsap.to(titleRef.current, {
        color: "#eee",
        duration: 0.7,
        ease: "power3.inOut",
      });
    }
  }, [isOpen]);

  useGSAP(() => {
    if (isHover) {
      gsap.to(bgRef.current, {
        width: "20%",
        duration: 0.5,
        ease: "power3.inOut",
      });
      gsap.to(iconRef.current, {
        backgroundColor: "black",
        border: "1px solid black",
        scale: 1.1,
        duration: 0.5,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(bgRef.current, {
        width: 0,
        duration: 0.5,
        ease: "power3.inOut",
      });
      gsap.to(iconRef.current, {
        border: "1px solid #424242",
        backgroundColor: "",
        scale: 1,
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, [isHover]);

  return (
    <div
      className="program-button-container relative cursor-pointer overflow-hidden rounded-xl border border-[#424242] p-4"
      onClick={handleClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover && (
        <div
          ref={bgRef}
          className="fixed-bg-purple absolute bottom-0 right-0 -z-10 h-full w-0"
        ></div>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-16 md:gap-40">
          <h1 ref={titleRef} className="text-base font-bold md:text-xl">
            {title}
          </h1>
          <div ref={iconRef} className="cursor-pointer rounded-md p-2">
            <FaArrowDown size={22} color="#424242" />
          </div>
        </div>
        <div
          ref={textRef}
          className="h-0 overflow-hidden text-pretty opacity-0 md:w-[70%]"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </div>
  );
};

export default Accordion;
