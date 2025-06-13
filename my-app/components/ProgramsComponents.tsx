"use client";

import { programData } from "@/app/data/cardPriceContainerData";
import { BetterAuthSession } from "@/types/session";
import Image from "next/image";
import { Button } from "./ui/button";
import useHandleAction from "@/hooks/useHandleAction";
import { useAddToCart } from "@/hooks/useAddToCart";
import { CartItemProps } from "@/types/types";
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
                        className="flex flex-col gap-3 md:gap-4 rounded-xl border border-white/10 bg-[--card-bg] p-4 md:p-6"
                    >
                        <div className="relative h-[200px] md:h-full w-full overflow-hidden rounded-lg">
                            <Image 
                                src={program.imageUrl} 
                                alt={program.titlePlan} 
                                width={700}
                                height={700}
                                className="object-cover w-full h-full"
                                priority={index === 0}
                            />
                        </div>
                        <div className="flex flex-col gap-3 md:gap-4">
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold">{program.titlePlan}</h3>
                                <p className="text-sm md:text-base text-gray-400">{program.description}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Button
                                    className="w-full bg-violet-600 text-white hover:bg-violet-700 text-sm md:text-base"
                                    onClick={() => handleAction({
                                        productData: program,
                                        filterName: "programmes"
                                    })}
                                    disabled={loading}
                                >
                                    Acheter {program.price}€
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full text-sm md:text-base"
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
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ProgramsComponents;