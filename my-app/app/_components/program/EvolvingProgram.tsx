import Image from "next/image";
import PurpleLight from "../PurpleLight";

const EvolvingProgram = () => {
  return (
    <div className="relative mt-[20vh] flex w-screen flex-col items-center gap-20 md:pl-20 lg:grid lg:grid-cols-2">
      <PurpleLight
        yposition="-bottom-[40vh]"
        xposition="-left-[30vw]"
        height="h-full"
        width="w-[30%]"
      />
      <div className="px-4 text-center md:text-start">
        <h1 className="text-center text-xl font-semibold md:text-start md:text-3xl">
          Un programme, des possibilités infinies
        </h1>
        <p className="text-subtle text-center font-medium md:text-start md:text-xl">
          Plus qu&apos;un simple programme : un outil pour progresser à vie.
        </p>
        <p className="text-muted mt-10 text-lg font-medium md:mt-4">
          Chaque programme inclut{" "}
          <span className="text-white">
            plusieurs phases d&apos;entraînement
          </span>{" "}
          conçues pour vous accompagner à long terme. Une fois terminé,{" "}
          <span className="text-white">adaptez-le facilement</span> à vos
          besoins pour continuer à progresser,{" "}
          <span className="text-white">quel que soit votre objectif</span>.
        </p>
      </div>
      <div className="relative h-full w-full overflow-hidden rounded-2xl">
        <video
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
          src="/videos/program/test.mov"
          className="h-full w-full rounded-xl object-cover"
        />
      </div>
    </div>
  );
};

export default EvolvingProgram;
