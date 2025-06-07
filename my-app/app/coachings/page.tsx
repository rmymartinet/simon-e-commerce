"use client";

import BackgroundRadialColor from "@/components/BackgroundRadialColor";
import BeforeAfterPhoto from "@/components/BeforeAfterPhoto";
import DurationSelector from "@/components/coaching/DurationSelector";
import PremiumCoachingsSlider from "@/components/coaching/PremiumCoachingsSlider";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IoCheckmarkOutline } from "react-icons/io5";
import useHandleAction from "@/hooks/useHandleAction";
import { useSession } from "next-auth/react";
import { BetterAuthSession } from "@/lib/auth";
import { coachingData } from "@/app/data/cardPriceContainerData";

export default function CoachingsPage() {
  const [selectedDuration, setSelectedDuration] = useState(3);

  const { data: session } = useSession();
  const dataSession = session as BetterAuthSession | null;
  const { handleAction, loading } = useHandleAction(dataSession);

  return (
    <main className="flex min-h-screen flex-col px-4 pt-[20vh]">
      <div className="relative mb-10 grid grid-cols-2 gap-40 overflow-hidden rounded-3xl p-8">
        <BackgroundRadialColor />
        {coachingData.find((card) => card.month === selectedDuration) && (
          <div className="flex w-max flex-col items-center gap-10 justify-self-center rounded-2xl bg-white p-8 text-black">
            <h1 className="text-5xl font-bold">
              {
                coachingData.find((card) => card.month === selectedDuration)
                  ?.month
              }{" "}
              mois
            </h1>
            <span className="text-xl font-bold text-violet-500">
              Soit{" "}
              {
                coachingData.find((card) => card.month === selectedDuration)
                  ?.dayPrice
              }
              €/jour
            </span>
            <ul className="flex flex-col gap-2">
              {coachingData
                .find((card) => card.month === selectedDuration)
                ?.includes.map((feature, index) => (
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
        )}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Choisissez votre durée</h2>
            <p className="text-gray-600">
              Sélectionnez la durée qui correspond le mieux à vos objectifs
            </p>
          </div>
          <DurationSelector
            onChange={setSelectedDuration}
            selectedDuration={selectedDuration}
          />

          <div className="grid grid-cols-2 gap-8">
            <Button
              className="w-full rounded-lg bg-white py-2 text-black transition-colors hover:bg-gray-800 sm:py-3"
              variant="blackBg"
              disabled={loading}
            >
              Ajouter au panier
            </Button>
            <Button
              className="w-full rounded-lg bg-violet-500 py-2 text-white transition-colors hover:bg-gray-800 sm:py-3"
              variant="blackBg"
              onClick={() => {
                const selectedCard = coachingData.find(
                  (card) => card.month === selectedDuration,
                );
                if (selectedCard) {
                  handleAction({
                    productData: selectedCard,
                    filterName: "coachings",
                  });
                }
              }}
            >
              Acheter
            </Button>
          </div>
        </div>
      </div>
      <PremiumCoachingsSlider />
      <BeforeAfterPhoto />
    </main>
  );
}
