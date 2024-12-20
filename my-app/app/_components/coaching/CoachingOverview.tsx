import Image from "next/image";
import Stars from "../Stars";
import ColorShadowButton from "../ColorShadowButton";

const CoachingOverview = () => {
  return (
    <div
      id="coaching"
      className="relative mt-[20vh] flex w-screen flex-col items-center gap-20 overflow-hidden md:mb-0 md:w-max"
    >
      <div className="flex items-center text-sm font-bold">
        <div className="coaching-title-gradient-l h-[2px] w-60 rounded-full"></div>
        <div className="relative">
          <div className="bg-coaching-title absolute left-1/2 top-1/2 -z-10 h-4 w-[9rem] -translate-x-1/2 -translate-y-1/2 blur-lg"></div>
          <p className="px-4 text-lg text-[#7cbdeb]">Coaching</p>
        </div>
        <div className="coaching-title-gradient-r h-[2px] w-60 rounded-full"></div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 md:gap-0">
        <h1 className="text-center text-3xl font-bold">Un suivi sur-mesure</h1>
        <p className="text-center text-lg font-medium text-textOpacity">
          Moins d&apos;effort pour 2x plus de résulats{" "}
        </p>
        <ColorShadowButton title="Voir les offres" color="#7cbdeb" />
      </div>
      <div className="relative flex h-[70vh] w-screen items-center justify-center overflow-hidden md:h-full md:py-10">
        <div className="program-background absolute -left-20 bottom-0 h-[70vh] w-[150vw] rounded-2xl p-3 md:left-0 md:h-max md:w-max lg:relative">
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

          <div className="absolute -right-10 top-0 -z-10 h-full w-20">
            <div className="relative flex h-full w-full gap-4">
              {Array.from({ length: 100 }, (_, index) => {
                const randomPositionY =
                  Math.floor(Math.random() * 99) + 1 + "%";
                const randomPositionX =
                  Math.floor(Math.random() * 99) + 1 + "%";

                return (
                  <div
                    key={index}
                    className="absolute h-[1px] w-[1px] rounded-full bg-white opacity-20"
                    style={{ top: randomPositionY, left: randomPositionX }}
                  />
                );
              })}
            </div>
          </div>
          <div className="relative flex h-[48vh] rounded-lg border-card lg:h-[80vh] lg:w-[80vw]">
            <div className="program-button-container padding text-md absolute -bottom-20 left-20 z-50 h-max w-full rounded-2xl font-bold lg:top-20 lg:w-[30%]">
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
            <Image
              src="/images/bb.png"
              alt=""
              width={2000}
              height={2000}
              className="h-full w-full rounded-lg object-fill"
              quality={100}
            />

            <div className="absolute left-[300px] top-1/2 h-[70%] w-[75%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl shadow-2xl md:left-1/2 lg:w-[70%]">
              <video
                src="/videos/call.mov"
                autoPlay
                loop
                muted
                preload="auto"
                playsInline
                className="aspect-video h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachingOverview;
