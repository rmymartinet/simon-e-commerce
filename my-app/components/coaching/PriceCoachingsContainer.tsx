import DurationSelector from "./DurationSelector";
import {
  Apple,
  ArrowRight,
  CalendarCheck,
  Dumbbell,
  Flame,
  MessageCircle,
  Video,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { coachingData } from "@/app/data/cardPriceContainerData";
import { Button } from "../ui/button";
import { useGSAP } from "@gsap/react";
import { animateBlockReveal } from "@/utils/Animation";
import { RefObject } from "react";
import { CartItemProps } from "@/types/types";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { Badge } from "../ui/badge";

const PriceCoachingsContainer = () => {
  const [selectedDuration, setSelectedDuration] = useState(3);
  const priceCoachingsRef = useRef<HTMLDivElement>(null);
  const pricingContainerLeft = useRef<HTMLDivElement>(null);
  const addToCart = useAddToCart();
  const router = useRouter();
  const { session } = useAuth();

  const selectedCard = useMemo(
    () => coachingData.find((card) => card.month === selectedDuration),
    [selectedDuration],
  );

  useGSAP(() => {
    if (priceCoachingsRef.current && pricingContainerLeft.current) {
      animateBlockReveal(priceCoachingsRef as RefObject<HTMLDivElement>, 0.5);
      animateBlockReveal(
        pricingContainerLeft as RefObject<HTMLDivElement>,
        0.2,
      );
    }
  }, []);

  if (!selectedCard) return null;

  const perks = [
    {
      title: "Programme sport 100% personnalisé",
      icon: Dumbbell,
    },
    {
      title: "Plan nutrition adapté à tes goûts",
      icon: Apple,
    },
    {
      title: "Bilans vidéo réguliers",
      icon: Video,
    },
    {
      title: "Suivi WhatsApp 7j/7",
      icon: MessageCircle,
    },
    {
      title: "Ajustements hebdomadaires",
      icon: CalendarCheck,
    },
  ];

  const handleStartCoaching = () => {
    const cartItem: CartItemProps = {
      type: selectedCard.type,
      titlePlan: selectedCard.titlePlan,
      price: selectedCard.price,
      priceId: selectedCard.priceId,
      month: selectedCard.month,
      quantity: 1,
      subscription: selectedCard.subscription ?? false,
    };

    if (session?.user?.email) {
      addToCart(cartItem);
      router.push("/checkout");
      return;
    }

    router.push(
      `/auth/signin?from=checkout&product=${encodeURIComponent(
        JSON.stringify(cartItem),
      )}`,
    );
  };

  return (
    <section className="mx-auto">
      <div className="grid w-full grid-cols-1 gap-10 md:p-8 lg:grid-cols-2 lg:gap-16">
        <div ref={pricingContainerLeft} className="flex w-full flex-col gap-6">
          <div className="flex flex-1 flex-col gap-6">
            <Badge
              variant="secondary"
              className="hover:none w-max gap-2 rounded-full border border-violet-500/20 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-md"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/20">
                <Flame className="size-3 text-red-500" />
              </span>
              +200 transformations réussies
            </Badge>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              Un accompagnement sur-mesure pour des résultats garantis
            </h2>
            <p className="max-w-xl text-base text-white/65">
              Le coaching premium, c&apos;est bien plus qu&apos;un programme.
              C&apos;est un suivi personnalisé complet avec des ajustements
              chaque semaine selon ta progression.
            </p>

            <div className="mt-4 space-y-3">
              {perks.map((perk) => (
                <div
                  key={perk.title}
                  className="flex items-center gap-4 rounded-2xl bg-[#17181d] px-4 py-3"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1f1b12] text-violet-500">
                    <perk.icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-white/90">
                    {perk.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          ref={priceCoachingsRef}
          className="relative w-full overflow-hidden rounded-3xl"
        >
          <div className="flex w-full flex-col gap-6 rounded-3xl border border-white/10 bg-[#15171c] p-6 text-white shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold md:text-2xl">
                Choisis ta durée d&apos;engagement
              </h2>
              <p className="text-sm text-[--subtext] md:text-base">
                Vous savez déja se que vous voulez ? <br /> Sélectionnez la
                durée qui correspond le mieux à vos objectifs
              </p>
            </div>
            <DurationSelector
              onChange={setSelectedDuration}
              selectedDuration={selectedDuration}
            />

            <Button
              variant="purpleBg"
              className="w-full"
              onClick={handleStartCoaching}
            >
              Demarrer mon coaching
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceCoachingsContainer;
