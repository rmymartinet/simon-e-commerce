import DurationSelector from "./DurationSelector";
import { Loader2 } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { coachingData } from "@/app/data/cardPriceContainerData";
import { authClient } from "@/lib/auth-client";
import useHandleAction from "@/hooks/useHandleAction";
import { Button } from "../ui/button";
import { useGSAP } from "@gsap/react";
import { animateBlockReveal } from "@/utils/Animation";
import { RefObject } from "react";
import { BetterAuthSession } from "@/types/types"
import { prisma } from "@/lib/prisma";


const PriceCoachingsContainer = () => {
    const { data: session } = authClient.useSession();
    const dataSession = session as BetterAuthSession | null;
    const { handleAction, loading } = useHandleAction(dataSession);
    const [selectedDuration, setSelectedDuration] = useState(3);
    const priceCoachingsRef = useRef<HTMLDivElement>(null);

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
        <section ref={priceCoachingsRef} className="relative mb-10 gap-8 md:gap-40 overflow-hidden rounded-3xl p-4 md:p-8">
            <div className="flex flex-col gap-6 md:gap-10">
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl md:text-2xl font-bold">Choisissez votre durée</h2>
                    <p className="text-sm md:text-lg text-[--subtext]">
                        Vous savez déja se que vous voulez ? <br /> Sélectionnez la durée qui correspond le mieux à vos objectifs
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