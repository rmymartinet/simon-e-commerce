import Image from "next/image";
import PurpleLight from "../PurpleLight";

const EvolvingProgram = () => {
  return (
    <div className="relative mt-[20vh] flex w-screen flex-col items-center gap-20 lg:grid lg:grid-cols-2">
      <div className="absolute right-0 top-0 -z-10 h-[20%] w-[100%]">
        <Image
          src="/images/blue_distortion_1.jpeg"
          alt=""
          width={2000}
          height={2000}
          className="h-max w-max object-contain"
        />
      </div>
      <PurpleLight
        yposition="-bottom-[40vh]"
        xposition="-left-[30vw]"
        height="h-full"
        width="w-[30%]"
      />
      <div className="w-[80%] justify-self-center text-center md:text-start">
        <h1 className="text-center text-3xl font-semibold md:text-start">
          Un programme, des possibilités{" "}
          <span className="text-violet-600">infinies</span>
        </h1>
        <p className="text-center text-xl font-medium text-textOpacity md:text-start">
          Plus qu&apos;un simple programme : un outil pour progresser à vie.
        </p>
        <p className="mt-10 text-lg font-semibold text-textOpacity md:mt-4">
          Chaque programme inclut{" "}
          <span className="text-white">
            plusieurs phases d&apos;entraînement
          </span>{" "}
          conçues pour vous accompagner à long terme. Une fois terminé,
          <span className="text-white">adaptez-le facilement</span> à vos
          besoins pour continuer à progresser,{" "}
          <span className="text-white">quel que soit votre objectif</span>.
        </p>
      </div>
      <div className="relative h-[25vh] w-full overflow-hidden rounded-xl lg:h-[30vh]">
        <div className="absolute -right-[60px] top-0 h-[70%] w-full rounded-xl md:h-full lg:right-0">
          <video
            muted
            loop
            autoPlay
            playsInline
            preload="auto"
            src="/videos/test.mov"
            className="h-full w-full rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default EvolvingProgram;
