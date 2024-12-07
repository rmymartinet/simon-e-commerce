import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
gsap.registerPlugin(useGSAP);

const Accordion = ({ title, text }: { title: string; text: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const textRef = useRef(null);
  const iconRef = useRef(null);
  const titleRef = useRef(null);

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
        rotate: -45,
        duration: 0.7,
        ease: "power3.inOut",
        color: "#9D4EDD",
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
        color: "black",
        duration: 0.7,
        ease: "power3.inOut",
      });

      gsap.to(iconRef.current, {
        rotate: 45,
        duration: 0.7,
        ease: "power3.inOut",
        color: "black",
      });
    }
  }, [isOpen]);

  return (
    <div className="relative cursor-pointer p-4" onClick={() => handleClick()}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-16 md:gap-40">
          <h1 ref={titleRef} className="text-base md:text-xl">
            {title}
          </h1>
          <div ref={iconRef} className="rotate-45 cursor-pointer">
            <CgClose size={16} />
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
