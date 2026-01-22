"use client";

const ProgramsDetails = () => {
  return (
    <section className="mt-[20vh] flex flex-col items-center gap-8">
      <div className="mx-auto flex flex-col items-center gap-14 md:flex-row">
        {/* VIDEO */}
        <div className="flex w-full justify-center md:max-h-[50vw] md:w-1/2">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-200 to-purple-200 shadow-xl">
            <video
              src="/videos/program/program_overview_mobile.mp4"
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
        </div>

        {/* CONTENU */}
        <div className="flex w-full flex-col gap-6 md:w-1/2">
          <h2 className="mb-2 text-4xl font-bold leading-tight md:text-5xl">
            DANS VOTRE <br className="hidden md:block" /> PROGRAMME
          </h2>
          <p className="mb-4 text-lg text-white">
            Des contenus simples efficaces et pensés pour t&apos;accompagner à
            chaque étape.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="py-4 md:border-none">
              <h3 className="mb-1 text-xl font-bold">2 EN 1</h3>
              <p className="text-base text-[--subtext]">
                <span className="text-white">Deux cycles progressifs</span>{" "}
                inclus pour te faire évoluer{" "}
                <span className="text-white">étape par étape</span>, quel que
                soit ton <span className="text-white">niveau</span>.
              </p>
            </div>
            <div className="border-t border-gray-700 py-4 md:border-none">
              <h3 className="mb-1 text-xl font-bold">NUTRITION</h3>
              <p className="text-base text-[--subtext]">
                Des <span className="text-white">bases claires</span> pour{" "}
                <span className="text-white">mieux manger</span> sans te
                compliquer la vie, avec des{" "}
                <span className="text-white">conseils applicables</span> dès le
                départ.
              </p>
            </div>
            <div className="border-t border-gray-700 py-4 md:border-none">
              <h3 className="mb-1 text-xl font-bold">EXERCICES</h3>
              <p className="text-base text-[--subtext]">
                <span className="text-white">Deux cycles progressifs</span>{" "}
                inclus pour te faire évoluer{" "}
                <span className="text-white">étape par étape</span>, quel que
                soit ton <span className="text-white">niveau</span>.
              </p>
            </div>
            <div className="border-t border-gray-700 py-4 md:border-none">
              <h3 className="mb-1 text-xl font-bold">PROGRESSION</h3>
              <p className="text-base text-[--subtext]">
                Des <span className="text-white">bases claires</span> pour{" "}
                <span className="text-white">mieux manger</span> sans te
                compliquer la vie, avec des{" "}
                <span className="text-white">conseils applicables</span> dès le
                départ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsDetails;
