"use client";

const ProgramsOverview = () => {
  return (
    <section className="w-full px-4 py-12 ">
      <div className=" mx-auto flex flex-col md:flex-row items-center gap-14">
        {/* VIDEO */}
        <div className="w-full md:w-1/2 max-h-[50vw] flex justify-center">
          <div className="rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br from-indigo-200 to-purple-200">
            <video src="/videos/program/program_overview_mobile.mp4" autoPlay muted loop className="w-full h-full object-cover rounded-xl"/>
          </div>
        </div>

        {/* CONTENU */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
  <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-2">
    DANS VOTRE <br className="hidden md:block" /> PROGRAMME
  </h2>
  <p className="text-lg mb-4 text-white">
    Des contenus simples efficaces et pensés pour t&apos;accompagner à chaque étape.
  </p>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4">
    <div>
      <h3 className="font-bold text-xl mb-1">2 EN 1</h3>
      <p className="text-[--subtext] text-base">
        <span className="text-white">Deux cycles progressifs</span> inclus pour te faire évoluer <span className="text-white">étape par étape</span>, quel que soit ton <span className="text-white">niveau</span>.
      </p>
    </div>
    <div>
      <h3 className="font-bold text-xl mb-1">NUTRITION</h3>
      <p className="text-[--subtext] text-base">
        Des <span className="text-white">bases claires</span> pour <span className="text-white">mieux manger</span> sans te compliquer la vie, avec des <span className="text-white">conseils applicables</span> dès le départ.
      </p>
    </div>
    <div>
      <h3 className="font-bold text-xl mb-1">EXERCICES</h3>
      <p className="text-[--subtext] text-base">
        <span className="text-white">Deux cycles progressifs</span> inclus pour te faire évoluer <span className="text-white">étape par étape</span>, quel que soit ton <span className="text-white">niveau</span>.
      </p>
    </div>
    <div>
      <h3 className="font-bold text-xl mb-1">PROGRESSION</h3>
      <p className="text-[--subtext] text-base">
        Des <span className="text-white">bases claires</span> pour <span className="text-white">mieux manger</span> sans te compliquer la vie, avec des <span className="text-white">conseils applicables</span> dès le départ.
      </p>
    </div>
  </div>
</div>
      </div>
    </section>
  );
};

export default ProgramsOverview;