import BackgroundRadialColor from "../BackgroundRadialColor";
import Iphone from "../Iphone";

const CoachingsApps = () => {
  return (
    <section className="flex flex-col gap-16 py-12 relative rounded-xl overflow-hidden">
      {/* VirtualGym */}
      <div className="flex flex-col md:flex-row items-center gap-8 ">
        <BackgroundRadialColor/>
        {/* Vidéo/Image à gauche */}
        <div className="w-full  md:w-1/2 flex justify-center">
          {/* Remplace src par ta vidéo ou image */}
          <Iphone video="/videos/exercices/exercice_change.mp4"/>
        </div>
        {/* Texte à droite */}
        <div className="w-full md:w-1/3">
          <h2 className="text-4xl md:text-center text-left  font-bold mb-4">
            <span className="text-white">VirtuaGym</span>
          </h2>
          <p className="text-[--subtext]">
            <span className="text-white font-semibold">VirtualGym</span> est votre <span className="text-white font-semibold">coach sportif digital</span> : suivez des <span className="text-white font-semibold">séances personnalisées</span>, suivez vos <span className="text-white font-semibold">progrès</span> et restez <span className="text-white font-semibold">motivé</span> grâce à une interface intuitive.
            Accédez à des <span className="text-white font-semibold">programmes variés</span>, des <span className="text-white font-semibold">vidéos d&apos;exercices</span> et des <span className="text-white font-semibold">conseils adaptés</span> à votre niveau, où que vous soyez.
          </p>
        </div>
      </div>

      {/* Food */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-8">
        {/* Vidéo/Image à droite */}
        <div className="w-full md:w-1/2 flex justify-center">
          {/* Remplace src par ta vidéo ou image */}
          <Iphone imgUrl="/images/food_app/calorie.png" />

        </div>
        {/* Texte à gauche */}
        <div className="w-full md:w-1/3">
          <h2 className="text-4xl md:text-center text-left font-bold mb-4">
            <span className="text-white">Food</span>
          </h2>
          <p className="text-[--subtext]">
  <span className="text-white font-semibold">VirtualGym</span> est votre <span className="text-white font-semibold">coach sportif digital</span> : recevez vos <span className="text-white font-semibold">plans d&apos;entraînement personnalisés</span>, ajustés en fonction de votre <span className="text-white font-semibold">progression</span> et de vos <span className="text-white font-semibold">objectifs</span>.  
  Suivez vos cycles, accédez à des <span className="text-white font-semibold">programmes ciblés</span>, des <span className="text-white font-semibold">vidéos d&apos;exercices détaillées</span> et des <span className="text-white font-semibold">conseils adaptés</span> pour progresser efficacement, où que vous soyez.
</p>
        </div>
      </div>
    </section>
  );
};

export default CoachingsApps;