import Iphone from "../Iphone";

const CoachingsApps = () => {
  return (
    <section className="relative flex flex-col gap-16 overflow-hidden rounded-xl py-12">
      {/* VirtualGym */}
      <div className="flex flex-col items-center gap-8 md:flex-row">
        {/* Vidéo/Image à gauche */}
        <div className="flex h-[80vh] min-h-0 w-full justify-center overflow-hidden md:w-1/2">
          {/* Remplace src par ta vidéo ou image */}
          <Iphone video="/videos/exercices/exercice_change.mp4" />
        </div>
        {/* Texte à droite */}
        <div className="w-full md:w-1/3">
          <h2 className="mb-4 text-center text-4xl font-bold md:text-left">
            <span className="text-white">VirtuaGym</span>
          </h2>
          <p className="text-center text-[--subtext] md:text-left">
            <span className="font-semibold text-white">VirtualGym</span> est
            votre{" "}
            <span className="font-semibold text-white">
              coach sportif digital
            </span>{" "}
            : suivez des{" "}
            <span className="font-semibold text-white">
              séances personnalisées
            </span>
            , suivez vos{" "}
            <span className="font-semibold text-white">progrès</span> et restez{" "}
            <span className="font-semibold text-white">motivé</span> grâce à une
            interface intuitive. Accédez à des{" "}
            <span className="font-semibold text-white">programmes variés</span>,
            des{" "}
            <span className="font-semibold text-white">
              vidéos d&apos;exercices
            </span>{" "}
            et des{" "}
            <span className="font-semibold text-white">conseils adaptés</span> à
            votre niveau, où que vous soyez.
          </p>
        </div>
      </div>

      {/* Food */}
      <div className="flex flex-col items-center gap-8 md:flex-row-reverse">
        {/* Vidéo/Image à droite */}
        <div className="flex min-h-0 w-full justify-center overflow-visible md:w-1/2">
          <div className="flex h-full w-full items-center justify-center">
            <Iphone imgUrl="/images/food_app/calorie.png" />
          </div>
        </div>
        {/* Texte à gauche */}
        <div className="w-full md:w-1/3">
          <h2 className="mb-4 text-center text-4xl font-bold md:text-left">
            <span className="text-white">Food</span>
          </h2>
          <p className="text-center text-[--subtext] md:text-left">
            <span className="font-semibold text-white">VirtualGym</span> est
            votre{" "}
            <span className="font-semibold text-white">
              coach sportif digital
            </span>{" "}
            : recevez vos{" "}
            <span className="font-semibold text-white">
              plans d&apos;entraînement personnalisés
            </span>
            , ajustés en fonction de votre{" "}
            <span className="font-semibold text-white">progression</span> et de
            vos <span className="font-semibold text-white">objectifs</span>.
            Suivez vos cycles, accédez à des{" "}
            <span className="font-semibold text-white">programmes ciblés</span>,
            des{" "}
            <span className="font-semibold text-white">
              vidéos d&apos;exercices détaillées
            </span>{" "}
            et des{" "}
            <span className="font-semibold text-white">conseils adaptés</span>{" "}
            pour progresser efficacement, où que vous soyez.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CoachingsApps;
