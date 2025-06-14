"use client";

import { programData } from "@/app/data/cardPriceContainerData";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useHandleAction from "@/hooks/useHandleAction";
import { useAddToCart } from "@/hooks/useAddToCart";
import { BetterAuthSession, CartItemProps } from "@/types/types";
import { animateBlockReveal } from "@/utils/Animation";
import { useGSAP } from "@gsap/react";
import {  useRef } from "react";

interface ProgramsComponentsProps {
    session: BetterAuthSession | null;
}

const ProgramsComponents = ({ session }: ProgramsComponentsProps) => {
    const { handleAction, loading } = useHandleAction(session);
    const addToCart = useAddToCart();

    const programRefs = useRef<Array<HTMLDivElement | null>>([]);

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                {programData.map((program, index) => (
                    <div 
                        key={program.titlePlan} 
                        ref={(el) => {
                            programRefs.current[index] = el;
                        }}
                        className="flex flex-col justify-between gap-3 md:gap-4 rounded-xl border border-white/10 bg-[--card-bg] p-4 md:p-6"
                    >
                        <div className="relative h-[200px] md:h-[500px] w-full overflow-hidden rounded-lg">
                            <Image 
                                src={program.imageUrl} 
                                alt={program.titlePlan} 
                                width={1000}
                                height={1000}
                                quality={100}
                                className="object-cover w-full h-full"
                                priority={index === 0}
                            />
                        </div>
                        <div className="min-h-[90px] md:min-h-[70px] flex flex-col justify-start">
                            <h3 className="text-xl md:text-2xl font-bold">{program.titlePlan}</h3>
                            <p className="text-sm md:text-base text-[--subtext]">{program.description}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Button
                                onClick={() => handleAction({
                                    productData: program,
                                    filterName: "programmes"
                                })}
                                disabled={loading}
                                variant="whiteBg"
                                className="w-full"
                            >
                                Acheter {program.price}€
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => {
                                    const cartItem: CartItemProps = {
                                        type: program.type,
                                        titlePlan: program.titlePlan,
                                        price: program.price,
                                        priceId: program.priceId,
                                        imageUrl: program.imageUrl,
                                        month: program.month,
                                        quantity: 1
                                    };
                                    addToCart(cartItem);
                                }}
                            >
                                Ajouter au panier
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ProgramsComponents;