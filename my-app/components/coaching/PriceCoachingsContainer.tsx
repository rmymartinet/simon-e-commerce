import BackgroundRadialColor from "../BackgroundRadialColor";
import DurationSelector from "./DurationSelector";
import { Loader2 } from "lucide-react";
import { useMemo, useRef, useState, useEffect } from "react";
import { coachingData } from "@/app/data/cardPriceContainerData";
import { authClient } from "@/lib/auth-client";
import useHandleAction from "@/hooks/useHandleAction";
import { Button } from "../ui/button";
import { useGSAP } from "@gsap/react";
import { animateBlockReveal } from "@/utils/Animation";
import { RefObject } from "react";
import { BetterAuthSession } from "@/types/types";
import Image from "next/image";
import Overlay from "../Overlay";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 758);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

const getImageForMonth = (month: number, isMobile: boolean) => {
  if (isMobile) {
    switch (month) {
      case 3:
        return "/images/coachings/mobile_beginner.png";
      case 6:
        return "/images/coachings/mobile_intermediate.png";
      case 9:
        return "/images/coachings/mobile_advanced.png";
      default:
        return "/images/coachings/mobile_beginner.png";
    }
  } else {
    switch (month) {
      case 3:
        return "/images/coachings/beginner.png";
      case 6:
        return "/images/coachings/intermediate.png";
      case 9:
        return "/images/coachings/advanced.png";
      default:
        return "/images/coachings/beginner.png";
    }
  }
};

const PriceCoachingsContainer = () => {
    const { data: session } = authClient.useSession();
    const dataSession = session as BetterAuthSession | null;
    const { handleAction, loading } = useHandleAction(dataSession);
    const [selectedDuration, setSelectedDuration] = useState(3);
    const priceCoachingsRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    const selectedCard = useMemo(() => 
        coachingData.find((card) => card.month === selectedDuration),
        [selectedDuration]
    );

    useGSAP(() => {
        if (priceCoachingsRef.current) {
            animateBlockReveal(priceCoachingsRef as RefObject<HTMLDivElement>, 0.5);
        } 
    }, []);

    if (!selectedCard) return null;

  

    return (
        <section ref={priceCoachingsRef} className="relative mb-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-40 overflow-hidden rounded-3xl p-4 md:p-8">
        <BackgroundRadialColor />
        <Overlay/>
        <div className="flex w-full md:w-[600px] flex-col items-center gap-6 md:gap-10 justify-self-center rounded-2xl relative p-6 md:p-8 text-black overflow-hidden text-white">
          <Image
            src={getImageForMonth(selectedCard.month, isMobile)}
            alt="coaching"
            width={isMobile ? 400 : 700}
            height={isMobile ? 400 : 700}
            quality={100}
            className="w-full h-full object-cover rounded-2xl"
          />
         
        </div>
        <div className="flex flex-col gap-6 md:gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl md:text-2xl font-bold">Choisissez votre durée</h2>
            <p className="text-sm md:text-base text-gray-600">
              Sélectionnez la durée qui correspond le mieux à vos objectifs
            </p>
          </div>
          <DurationSelector
            onChange={setSelectedDuration}
            selectedDuration={selectedDuration}
          />

          <Button
            variant="whiteBg"
            className="w-full"
            onClick={() => {
              handleAction({
                productData: {
                  ...selectedCard,
                  dayPrice: selectedCard.dayPrice.toString()
                },
                filterName: "coachings",
              });
            }}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Chargement...</span>
              </div>
            ) : (
              "Acheter"
            )}
          </Button>
        </div>
      </section>
    )
}

export default PriceCoachingsContainer;