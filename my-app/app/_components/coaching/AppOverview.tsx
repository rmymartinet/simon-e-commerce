import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AppOverview = () => {
  return (
    <div className="mt-[20vh] flex w-screen flex-col">
      <div className="flex flex-col items-center gap-6 px-4">
        <h1 className="max-w-7xl whitespace-normal break-words text-center text-4xl lg:text-7xl">
          Une seule application, tout votre entraînement
        </h1>

        <div className="mb-40 flex items-center gap-4">
          <p className="font-medium text-muted md:text-4xl">
            Simplifiez vos entraînements avec VirtualGym
          </p>
          <div className="h-[30px] overflow-hidden rounded-xl lg:h-[5vh]">
            <Image
              src="/images/virtualgym_app/virtuagym.webp"
              alt=""
              width={100}
              height={100}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      <Image
        src="/images/virtualgym_app/hand_iphone.png"
        alt=""
        width={2000}
        height={2000}
        className="min-h-screen w-full object-cover"
        quality={100}
        layout="responsive"
      />
    </div>
  );
};

export default AppOverview;
