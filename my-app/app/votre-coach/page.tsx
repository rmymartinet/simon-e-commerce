"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import gsap from "gsap";
import { textSplitLinesScrollTrigger } from "@/utils/common/textAnimation";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleComponent from "@/components/TitleComponent";
import Overlay from "@/components/Overlay";
import { Button } from "@/components/ui/button";
import Link from "next/link";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Infos() {
  const firstParaTitle = useRef<HTMLHeadingElement | null>(null);
  const firstParaRef = useRef<HTMLParagraphElement | null>(null);
  const secondParaRef = useRef<HTMLParagraphElement | null>(null);
  const secondParaTitle = useRef<HTMLHeadingElement | null>(null);
  const thirdParaRef = useRef<HTMLParagraphElement | null>(null);
  const fourthParaRef = useRef<HTMLParagraphElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.set(headerRef.current, {
      filter: "blur(70px)",
      y: 100,
    });

    gsap.to(headerRef.current, {
      y: 0,
      duration: 1,
      ease: "power2.out",
      filter: "blur(0px)",
    });

    if (firstParaRef.current && secondParaRef.current && thirdParaRef.current) {
      textSplitLinesScrollTrigger(firstParaTitle as React.RefObject<HTMLElement>)
      textSplitLinesScrollTrigger(secondParaTitle as React.RefObject<HTMLElement>)
      textSplitLinesScrollTrigger(firstParaRef as React.RefObject<HTMLElement>);
      textSplitLinesScrollTrigger(
        secondParaRef as React.RefObject<HTMLElement>,
      );
      textSplitLinesScrollTrigger(thirdParaRef as React.RefObject<HTMLElement>);
      textSplitLinesScrollTrigger(fourthParaRef as React.RefObject<HTMLElement>);

    }
  }, []);

  return (
    <main className="relative mt-[20vh] flex min-h-screen flex-col items-center justify-center gap-40 px-4">
      <TitleComponent
        title="Infos"
        titleIndication="infos"
        subtitle="Toutes les informations essentielles à portée de main."
      />
      <div
        ref={headerRef}
        className="relative flex flex-col-reverse items-center gap-16 md:min-h-[700px] lg:grid lg:grid-cols-2 lg:gap-24"
      >
        {/* Bloc Infos sous forme de timeline animée */}
        <div className="flex flex-col gap-8 overflow-hidden">
          {[
            {
              id: "01",
              label: "Diplômé STAPS",
              desc: "Licence STAPS en physiologie, biomécanique et entraînement sportif.",
            },
            {
              id: "02",
              label: "Préparateur physique",
              desc: "Spécialisé en performance et prévention des blessures.",
            },
            {
              id: "03",
              label: "Coach Basic Fit",
              desc: "Expérience terrain avec accompagnement quotidien en salle.",
            },
          ].map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-xl border border-[--border-color] bg-[--card-bg] px-6 py-5 transition-all duration-300 hover:scale-[1.015]"
            >
              <div className="flex items-start gap-4">
                <div className="text-xl font-semibold text-[--subtext]">
                  {" "}
                  {item.id}{" "}
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-bold text-white lg:text-2xl">
                    {item.label}
                  </h2>
                  <p className="text-sm leading-snug text-[--subtext] lg:text-base">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:max-[40vw] w-full max-w-[400px] overflow-hidden rounded-xl border border-[--border-color] bg-[--card-bg]">
          <video
            src="/videos/infos/info.mp4"
            className="h-full w-full object-contain"
            loop
            muted
            autoPlay
            controls
            playsInline
          />
        </div>
      </div>
      <div className="mt-20 flex w-full flex-col items-center gap-8">
      <div className="relative w-full flex md:items-center justify-center h-[70vh] md:h-screen md:px-20">  
        <Image src="/images/about/calum.jpg" alt="calum-von-moger" width={1000}  height={1000} quality={100} className="absolute inset-0 -z-10" />
       <Overlay/>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-4">
          <h1 ref={firstParaTitle} className="text-4xl lg:text-7xl font-bold uppercase">Du déclic <br /> à la passion</h1>

<div className="flex gap-4">
  <Button asChild className="bg-violet-400 text-white">
    <Link href="/coachings">
      Coachings
    </Link>
  </Button>
  <Button asChild className="bg-violet-400 text-white">
    <Link href="/programs">
      Programmes
    </Link>
  </Button>
</div>
          </div>
            <div className="flex flex-col gap-2"
            >
              <p
               ref={firstParaRef}
              className="text-justify text-[--subtext] lg:text-xl "
            >
              Depuis mon plus jeune âge, je me voyais comme un{" "}
              <span className="font-bold text-white">garçon frêle</span>,
              manquant de{" "}
              <span className="font-bold text-white">confiance</span> en lui.
              Mon frère, passionné de{" "}
              <span className="font-bold text-white">sport</span>, avait réussi
              à transformer son{" "}
              <span className="font-bold text-white">physique</span>, et cette{" "}
              <span className="font-bold text-white">métamorphose</span>{" "}
              m&apos;a profondément inspiré. Cela m&apos;a conduit à me poser
              une question qui ne cessait de me hanter :{" "}
              <span className="italic">
                &quot;De quoi suis-je réellement capable ?&quot;
              </span>{" "}
              À 17 ans, j&apos;ai décidé de ne plus rester dans
              l&apos;incertitude. 
            </p>
            <p  ref={secondParaRef}             
            className="text-justify text-[--subtext] lg:text-xl"
            > En découvrant la{" "}
              <span className="font-bold text-white">musculation</span>,
              j&apos;ai trouvé bien plus qu&apos;un moyen de me transformer{" "}
              <span className="font-bold text-white">physiquement</span> :
              j&apos;ai trouvé une{" "}
              <span className="font-bold text-white">passion</span> et une
              <span className="font-bold text-white">discipline</span> qui
              m&apos;ont appris le{" "}
              <span className="font-bold text-white">dépassement de soi</span>{" "}
              et m&apos;ont changé à jamais. Cette quête de mon{" "}
              <span className="font-bold text-white">potentiel</span>, portée
              par une envie irrésistible de devenir la{" "}
              <span className="font-bold text-white">meilleure version</span> de
              moi-même, m&apos;a permis de comprendre que le{" "}
              <span className="font-bold text-white">corps</span> et l&apos;
              <span className="font-bold text-white">esprit</span> sont
              indissociables dans cette{" "}
              <span className="font-bold text-white">transformation</span>.
              </p>
              <div className="bg-violet-400 w-full h-[1px] mt-4"></div>
            </div>
          </div>
          </div>
        {/* <div
          ref={imgRef}
          className="flex w-full lg:mb-[20vh] lg:mt-[20vh] lg:px-72"
        >
          <Image
            src="/images/about/photo-output.jpeg"
            alt=""
            width={2000}
            height={2000}
            className="h-full w-full rounded-xl object-cover"
            layout="responsive"
            quality={100}
          />
        </div> */}
        <div className="flex flex-col items-center gap-10 lg:items-start md:px-20">
          <div className="flex flex-col gap-8">
            <h1 ref={secondParaTitle} className="text-4xl lg:text-7xl text-center uppercase font-bold">Une passion en vocation</h1>
            <p
              ref={thirdParaRef}
              className="text-justify text-[--subtext] lg:text-xl"
            >
              La <span className="font-bold text-white">musculation</span>{" "}
              n&apos;est plus seulement une quête{" "}
              <span className="font-bold text-white">physique</span> pour moi,
              mais une véritable{" "}
              <span className="font-bold text-white">philosophie de vie</span>,
              un levier pour cultiver la{" "}
              <span className="font-bold text-white">santé</span>, la{" "}
              <span className="font-bold text-white">résilience</span> et la{" "}
              <span className="font-bold text-white">confiance en soi</span>.
              Dès l&apos;âge de{" "}
              <span className="font-bold text-white">18 ans</span>, j&apos;ai
              décidé de formaliser ma{" "}
              <span className="font-bold text-white">passion</span> en suivant
              une <span className="font-bold text-white">Licence STAPS</span>,
              option{" "}
              <span className="font-bold text-white">Entraînement Sportif</span>{" "}
              et <span className="font-bold text-white">Haltérophilie</span>.
              Durant cette période, j&apos;ai également obtenu mes{" "}
              <span className="font-bold text-white">brevets fédéraux</span> en{" "}
              <span className="font-bold text-white">musculation</span> et en{" "}
              <span className="font-bold text-white">haltérophilie</span>, un
              parcours qui m&apos;a permis de renforcer mes{" "}
              <span className="font-bold text-white">connaissances</span> et de
              poser les bases de ma{" "}
              <span className="font-bold text-white">carrière</span>. Au fil des
              années, mes{" "}
              <span className="font-bold text-white">expériences</span> sur le
              terrain m&apos;ont permis de développer une{" "}
              <span className="font-bold text-white">approche complète</span> et{" "}
              <span className="font-bold text-white">efficace</span> pour
              accompagner chaque personne dans sa{" "}
              <span className="font-bold text-white">transformation</span>.
              Aujourd&apos;hui, je continue à approfondir mes{" "}
              <span className="font-bold text-white">compétences</span> pour
              rester à la pointe des dernières{" "}
              <span className="font-bold text-white">avancées</span> en{" "}
              <span className="font-bold text-white">musculation</span> et{" "}
              <span className="font-bold text-white">préparation physique</span>
              .
            </p>
            <p
              ref={fourthParaRef}
              className="text-justify text-[--subtext] lg:text-2xl"
            >
              En tant que{" "}
              <span className="font-bold text-white">coach sportif</span> et{" "}
              <span className="font-bold text-white">
                préparateur physique diplômé
              </span>
              , ma mission est claire : vous aider à révéler votre{" "}
              <span className="font-bold text-white">potentiel</span>, atteindre
              vos <span className="font-bold text-white">objectifs</span>, et
              découvrir cette{" "}
              <span className="font-bold text-white">force intérieure</span> et
              cet <span className="font-bold text-white">équilibre</span> qui
              peuvent transformer votre vie. Que ce soit pour vous sentir mieux{" "}
              <span className="font-bold text-white">physiquement</span>,{" "}
              <span className="font-bold text-white">mentalement</span> ou
              améliorer votre{" "}
              <span className="font-bold text-white">santé</span>, je suis là
              pour vous <span className="font-bold text-white">guider</span> à
              chaque étape de votre{" "}
              <span className="font-bold text-white">parcours</span>.
            </p>
          </div>{" "}
        </div>
      </div>
    </main>
  );
}
