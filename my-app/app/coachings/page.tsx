"use client";

import BackgroundRadialColor from "@/components/BackgroundRadialColor";
import BeforeAfterPhoto from "@/components/BeforeAfterPhoto";
import DurationSelector from "@/components/coaching/DurationSelector";
import PremiumCoachingsSlider from "@/components/coaching/PremiumCoachingsSlider";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { IoCheckmarkOutline } from "react-icons/io5";
import useHandleAction from "@/hooks/useHandleAction";
import { authClient } from "@/lib/auth-client";
import { BetterAuthSession } from "@/types/session";
import { coachingData } from "@/app/data/cardPriceContainerData";
import { Loader2 } from "lucide-react";
import Faq from "@/components/Faq";
import TitleComponent from "@/components/TitleComponent";

export default function CoachingsPage() {
  const [selectedDuration, setSelectedDuration] = useState(3);
  const { data: session } = authClient.useSession();
  const dataSession = session as BetterAuthSession | null;
  const { handleAction, loading } = useHandleAction(dataSession);

  const selectedCard = useMemo(() => 
    coachingData.find((card) => card.month === selectedDuration),
    [selectedDuration]
  );

  if (!selectedCard) return null;

  return (
    <main className="flex min-h-screen flex-col px-4 pt-[20vh]">
      <TitleComponent
        title="Coachings"
        titleIndication="coachings"
        subtitle="Découvrez nos coachings pour atteindre vos objectifs."
      />
      <div className="relative mb-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-40 overflow-hidden rounded-3xl p-4 md:p-8">
        <BackgroundRadialColor />
        <div className="flex w-full md:w-max flex-col items-center gap-6 md:gap-10 justify-self-center rounded-2xl bg-white p-6 md:p-8 text-black">
          <h1 className="text-4xl md:text-5xl font-bold">
            {selectedCard.month} mois
          </h1>
          <span className="text-lg md:text-xl font-bold text-violet-500">
            Soit {selectedCard.dayPrice}€/jour
          </span>
          <ul className="flex flex-col gap-2 w-full">
            {selectedCard.includes.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 font-semibold sm:gap-3"
              >
                <IoCheckmarkOutline className="text-base text-violet-500 sm:text-lg" />
                <p className="text-sm sm:text-base">{feature}</p>
              </div>
            ))}
          </ul>
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
            className="w-full rounded-lg bg-violet-500 py-2 text-white transition-colors hover:bg-gray-800 sm:py-3"
            variant="blackBg"
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
      </div>
      <PremiumCoachingsSlider />
      <BeforeAfterPhoto />
      <Faq />
    </main>
  );
}
