"use client";

import { programData } from "@/app/data/cardPriceContainerData";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAddToCart } from "@/hooks/useAddToCart";
import { CartItemProps } from "@/types/types";
import { animateBlockReveal } from "@/utils/Animation";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Check, ShoppingCart } from "lucide-react";
import Link from "next/link";

const ProgramsComponents = () => {
  const addToCart = useAddToCart();

  const programRefs = useRef<Array<HTMLDivElement | null>>([]);
  const audienceCopy: Record<string, string> = {
    Débutant: "Personnes qui débutent ou reprennent après une longue pause.",
    Intermédiaire:
      "Pratiquants réguliers depuis 1-3 ans souhaitant progresser.",
    Avancé: "Pratiquants expérimentés (+3 ans) avec objectifs précis.",
  };

  useGSAP(() => {
    programRefs.current.forEach((ref, index) => {
      if (ref) {
        const refObject = { current: ref };
        animateBlockReveal(refObject, 0.5 + index * 0.2);
      }
    });
  }, []);

  return (
    <section className="w-full max-w-7xl px-4 md:px-0">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {programData.map((program, index) => (
          <div
            key={program.titlePlan}
            ref={(el) => {
              programRefs.current[index] = el;
            }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#121214]/80 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
          >
            <div className="relative h-[220px] w-full overflow-hidden">
              <Image
                src={program.imageUrl}
                alt={program.titlePlan}
                width={1200}
                height={1200}
                quality={90}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#0f0f12]" />
              <div className="absolute inset-x-0 bottom-4 text-center">
                <p className="text-xl font-semibold uppercase tracking-[0.18em] text-violet-300 drop-shadow-[0_0_12px_rgba(167,139,250,0.55)]">
                  {program.titlePlan}
                </p>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-5 px-6 pb-6 pt-5">
              <div className="space-y-2 text-center md:text-left">
                <p className="text-sm text-[--subtext]">
                  {program.description}
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wider">
                  Pour qui ?
                </p>
                <p className="text-sm text-[--subtext]">
                  {audienceCopy[program.titlePlan] ?? ""}
                </p>
                <ul className="space-y-2 text-sm">
                  {program.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 text-violet-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto flex flex-col gap-4 pt-4">
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-semibold text-violet-500">
                    {program.price}€
                  </p>
                  <p className="text-[--subtext]">/ accès à vie</p>
                </div>
                <div className="flex w-full flex-col gap-2">
                  <Button
                    variant="purpleBg"
                    onClick={() => {
                      const cartItem: CartItemProps = {
                        type: program.type,
                        titlePlan: program.titlePlan,
                        price: program.price,
                        priceId: program.priceId,
                        imageUrl: program.imageUrl,
                        month: program.month,
                        quantity: 1,
                      };
                      addToCart(cartItem);
                    }}
                  >
                    <ShoppingCart />
                    Ajouter au panier
                  </Button>
                  <Link href="/pricing">
                    <Button className="w-full" variant="secondary">
                      Voir le détail
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProgramsComponents;
