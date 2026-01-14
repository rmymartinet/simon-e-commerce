"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject, useRef } from "react";
import { animateBlockReveal } from "@/utils/Animation";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Calendar, Dumbbell, Star } from "lucide-react";
import { GiFruitBowl } from "react-icons/gi";
import { Badge } from "../ui/badge";

gsap.registerPlugin(useGSAP);

const Header = () => {
  const containerRef = useRef(null);
  useGSAP(() => {
    if (containerRef.current) {
      animateBlockReveal(
        containerRef as unknown as RefObject<HTMLDivElement>,
        0.5,
      );
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex w-screen flex-col justify-end overflow-hidden"
    >
      <div className="z-50 mb-4 flex min-h-screen w-full flex-col items-center justify-center px-4">
        <div className="flex w-full flex-col items-center gap-12 lg:gap-20">
          <div className="mb-10 flex w-full max-w-3xl flex-col gap-4 md:mb-20 md:items-start md:text-left">
            <Badge variant="secondary" className="w-max">
              <Star className="size-3.5" />
              +300 personnes transformations réussies
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tighter text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              Transforme ton physique avec un plan clair{" "}
              <strong className="text-violet-400">
                + un coach qui te suit
              </strong>
            </h1>
            <h4 className="text-base text-white sm:text-lg lg:text-xl">
              Coaching sportif & nutrition 100% en ligne, adapté à ton niveau,
              tes objectifs et ton emploi du temps. Résultats garantis.
            </h4>
            <div className="flex w-full flex-col gap-2">
              <div className="mt-4 flex w-full flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex w-full flex-col items-stretch justify-start gap-2 sm:w-auto sm:flex-row sm:items-start">
                  <Button asChild variant="purpleBg">
                    <Link href="/coachings" className="flex items-center gap-2">
                      <p>Découvrir les coachings</p>
                      <ArrowRight />
                    </Link>
                  </Button>
                  <Button variant="secondary">
                    <Link href="/programs">Voir les programmes</Link>
                  </Button>
                  {/* <CalendlyCallButton setIsOpen={setIsOpen} /> */}
                </div>
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm sm:flex-row sm:items-center sm:gap-8 sm:text-base">
                <div className="flex items-center gap-2">
                  <Calendar className="size-3.5" />
                  <p>Suivi 7j/7</p>
                </div>
                <div className="flex items-center gap-2">
                  <Dumbbell className="size-3.5" />
                  <p>Plans personnalisés</p>
                </div>
                <div className="flex items-center gap-2">
                  <GiFruitBowl className="size-3.5" />
                  <p>Nutrition incluse</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 h-screen w-full overflow-hidden">
        <video
          playsInline
          autoPlay
          loop
          muted
          src="/videos/header.mp4"
          className="h-full w-full object-cover brightness-[0.2] filter"
          preload="true"
        />
      </div>
    </section>
  );
};

export default Header;
