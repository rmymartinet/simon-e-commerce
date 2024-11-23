import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
gsap.registerPlugin(useGSAP);

const Accordion = ({ title, text }) => {
  const [isOpen, setIsOpen] = useState(false);
  const textRef = useRef(null);
  const iconRef = useRef(null);

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
    } else {
      gsap.to(textRef.current, {
        height: 0,
        opacity: 0,
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
        <div className="flex items-center justify-between gap-40">
          <h1 className="text-xl">{title}</h1>
          <div ref={iconRef} className="rotate-45 cursor-pointer">
            <CgClose size={16} />
          </div>
        </div>
        <div
          ref={textRef}
          className="h-0 w-[70%] overflow-hidden text-pretty opacity-0"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </div>
  );
};

export default Accordion;
