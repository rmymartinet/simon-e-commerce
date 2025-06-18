"use client";

import { PiClock, PiCheckCircle, PiChatCircle } from "react-icons/pi";
import CalendlyCallButton from "./CalendlyCallButton";
import CalendlyCallModal from "./CalendlyCallModal";
import { RefObject, useRef, useState } from "react";
import { animateBlockRevealOnScroll } from "@/utils/Animation";
import { useGSAP } from "@gsap/react";

const CalendlyContainer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const calendlyContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (calendlyContainerRef.current) {
            animateBlockRevealOnScroll(calendlyContainerRef as RefObject<HTMLDivElement>, 0.5);
        } 
    }, []);
 

    return (
        <div ref={calendlyContainerRef} className="container mx-auto p-4 md:p-8 mb-10 mt-[10vh] md:mt-0">
            <div className="max-w-4xl mx-auto">
                {/* En-tête */}
                <div className="text-center mb-12 flex flex-col gap-2">
                    <h2 className="text-xl md:text-2xl font-bold">
                        Discutons de vos objectifs
                    </h2>
                    <p className="text-lg text-[--subtext]">
                        Un appel de 30 minutes pour comprendre vos besoins et vous accompagner
                    </p>
                </div>
                <div className="flex gap-4 items-center justify-center mb-10">
                    <div className="text-center">
                        <CalendlyCallButton setIsOpen={setIsOpen} />
                    </div>
                </div>

                {/* Grille des avantages */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm">
                        <PiClock className="w-12 h-12 mb-4 text-[var(--purple-color)]" />
                        <h3 className="text-xl font-semibold mb-2">30 minutes offertes</h3>
                        <p className="text-[--subtext]">
                            Un temps suffisant pour échanger sur vos objectifs et vos attentes
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm">
                        <PiCheckCircle className="w-12 h-12 mb-4 text-[var(--purple-color)]" />
                        <h3 className="text-xl font-semibold mb-2">Sans engagement</h3>
                        <p className="text-[--subtext]">
                            Un premier contact pour vous rassurer et répondre à vos questions
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm">
                        <PiChatCircle className="w-12 h-12 mb-4 text-[var(--purple-color)]" />
                        <h3 className="text-xl font-semibold mb-2">Échange personnalisé</h3>
                        <p className="text-[--subtext]">
                            Une discussion adaptée à votre situation et vos objectifs
                        </p>
                    </div>
                </div>

                {/* Section de confiance */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-12">
                    <h3 className="md:text-2xl text-xl font-semibold mb-4">Pourquoi prendre rendez-vous ?</h3>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <span className="text-[var(--purple-color)]">•</span>
                            <p>Découvrir comment je peux vous aider à atteindre vos objectifs</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-[var(--purple-color)]">•</span>
                            <p>Poser toutes vos questions sur mes méthodes de coaching</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-[var(--purple-color)]">•</span>
                            <p>Échanger sur votre situation actuelle et vos besoins spécifiques</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-[var(--purple-color)]">•</span>
                            <p>Recevoir des conseils personnalisés pour démarrer</p>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Modal Calendly */}
            <CalendlyCallModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
};

export default CalendlyContainer;
