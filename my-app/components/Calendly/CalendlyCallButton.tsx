import { PiPhoneCall } from "react-icons/pi";
import { Button } from "../ui/button";
import { useGSAP } from "@gsap/react";
import { animateBlockReveal } from "@/utils/Animation";
import { RefObject, useRef } from "react";

 const CalendlyCallButton = ({setIsOpen}: {setIsOpen: (isOpen: boolean) => void}) => {

    const buttonRef = useRef<HTMLDivElement>(null);

    const openCalendly = () => {
        setIsOpen(true);
      };

      useGSAP(()=>{

        if(buttonRef.current){
            animateBlockReveal(buttonRef as unknown as RefObject<HTMLDivElement>, 0.5);
        }
      },[])

      
    return (
        <div ref={buttonRef}>
            <Button
        variant="whitetopurple" 
        className="w-max group"
        onClick={openCalendly}
      >
        <div className="flex items-center gap-2">
          <span>Réserver un appel offert</span>
          <PiPhoneCall className="transition-transform duration-300 group-hover:animate-[ring_0.2s_ease-in-out_infinite]" />
        </div>
      </Button>
        </div>
    )
 }

 export default CalendlyCallButton;