import Image from "next/image";
import Stars from "../Stars";
import useWindowWidth from "@/hooks/useWindowWidth";
import { MdWhatsapp } from "react-icons/md";
import Iphone from "../Iphone";
import Button from "../Button";

const CoachingOverview = () => {
  const { width } = useWindowWidth();

  return (
    <div
      id="coaching"
      className="relative mt-[20vh] flex w-screen flex-col items-center gap-20 overflow-hidden md:mb-0 md:w-max md:overflow-visible"
    >
      <div className="flex flex-col gap-20">
        <div className="flex items-center text-sm font-bold">
          <div className="coaching-title-gradient-l h-[2px] w-60 rounded-full"></div>
          <div className="relative">
            <div className="bg-coaching-title absolute left-1/2 top-1/2 -z-10 h-4 w-[9rem] -translate-x-1/2 -translate-y-1/2 blur-lg"></div>
            <p className="px-4 text-lg text-[#7cbdeb]">Coaching</p>
          </div>
          <div className="coaching-title-gradient-r h-[2px] w-60 rounded-full"></div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 md:gap-0">
          <h1 className="text-center text-3xl font-bold">
            Un suivi sur-mesure
          </h1>
          <p className="text-center text-lg font-medium text-subtle">
            Moins d&apos;effort pour 2x plus de résulats{" "}
          </p>
          <Button href="/pricing" />
        </div>
      </div>

      {width > 498 ? (
        <div className="program-background relative w-[200vw] rounded-2xl md:w-[80vw] md:p-3">
          <Stars
            yposition="-top-10"
            xposition="left-0"
            height="h-20"
            weight="w-full"
            isTop={false}
          />
          <Stars
            yposition="-bottom-10"
            xposition="left-0"
            height="h-20"
            weight="w-full"
            isTop={false}
          />
          <Stars
            yposition="top-0"
            xposition="-right-10"
            height="h-full"
            weight="w-20"
            isTop={true}
          />
          <Stars
            yposition="top-0"
            xposition="-left-10"
            height="h-full"
            weight="w-20"
            isTop={true}
          />
          <div className="relative overflow-hidden">
            <Image
              src="/images/mac-screen/mac-bgs-blue.png"
              alt=""
              width={2000}
              height={2000}
              className="h-full w-full rounded-lg object-fill"
              quality={100}
            />
            <video
              src="/videos/coaching/call.mp4"
              autoPlay
              loop
              muted
              preload="auto"
              playsInline
              className="absolute left-1/2 top-1/2 aspect-video h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-xl object-cover shadow-lg"
            />
            <div className="padding text-md absolute left-10 top-20 z-50 h-max w-[30%] rounded-2xl bg-white font-bold text-black">
              <h3 className="text-xl font-bold">
                Des appels réguliers pour un vrai suivi
              </h3>
              <p className="mt-2 w-[70%] text-pretty break-words text-sm md:w-full">
                En fonction de l’offre choisie,{" "}
                <span className="font-bold text-violet-500">
                  bénéficiez d’appels vidéo ou audio réguliers pour suivre vos
                  progrès
                </span>
                . Un échange direct, humain et motivant pour rester sur la bonne
                voie.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col items-center justify-center gap-20">
          <div className="absolute right-16 top-0 rotate-12">
            <MdWhatsapp size={40} color="" />
          </div>
          <Iphone video="/videos/coaching/call.mp4" />
          <div className="text-md z-50 rounded-2xl text-center font-bold">
            <h3 className="mb-4 text-xl font-bold">
              Des appels réguliers pour un vrai suivi
            </h3>
            <p className="mt-2 text-pretty break-words md:w-full">
              En fonction de l’offre choisie,{" "}
              <span className="font-bold text-violet-500">
                bénéficiez d’appels vidéo ou audio réguliers pour suivre vos
                progrès
              </span>
              . Un échange direct, humain et motivant pour rester sur la bonne
              voie.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoachingOverview;
