import Iphone from "../Iphone";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import useWindowWidth from "@/hooks/useWindowWidth";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AppOverview = () => {
  const iphoneContainerRef = useRef(null);
  const neonTitleRef = useRef(null);

  const { width } = useWindowWidth();

  useGSAP(() => {
    gsap.fromTo(
      iphoneContainerRef.current,
      {
        y: 1000,
      },
      {
        scrollTrigger: {
          trigger: neonTitleRef.current,
          start: "top bottom",
          end: "bottom center",
          once: false,
          scrub: 0.5,
        },
        duration: 2,
        y: 200,
        ease: "power1.inOut",
        stagger: 0.5,
      },
    );

    gsap.to(neonTitleRef.current, {
      scrollTrigger: {
        trigger: neonTitleRef.current,
        start: "top center",
        end: "bottom center",
        once: false,
        scrub: 1,
      },

      y: 300,
      duration: 2,
      scale: width < 498 ? 1 : 1.5,
    });
  }, []);

  return (
    <div className="mt-[20vh] flex w-screen flex-col items-center">
      <h1 className="text-xl font-bold lg:text-3xl">
        Une seule application, tout votre entraînement
      </h1>
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <p className="font-medium text-textOpacity md:text-lg">
          Simplifiez vos entraînements avec VirtualGym
        </p>
        <div className="h-[5vh] overflow-hidden rounded-xl">
          <Image
            src="/images/virtualgym_app/virtuagym.webp"
            alt=""
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="relative w-full">
        <h1
          ref={neonTitleRef}
          className="text-neon absolute left-1/2 top-40 w-full -translate-x-1/2 -translate-y-1/2 text-center text-8xl font-black lg:text-[12rem]"
        >
          Tout en 1
        </h1>
        <div
          ref={iphoneContainerRef}
          className="grid grid-cols-3 gap-10 overflow-hidden px-2"
        >
          <div className="absolute flex flex-wrap gap-4">
            {Array.from({ length: 10 }, (_, index) => (
              <div
                key={index}
                className="h-[30vh] w-[30vh] rounded-xl shadow-2xl"
              ></div>
            ))}
          </div>
          <Iphone imgUrl="/images/virtualgym_app/home_app.png" title="Home" />
          <Iphone
            imgUrl="/images/virtualgym_app/user_interface.png"
            title="Entraînement"
          />
          <Iphone
            imgUrl="/images/virtualgym_app/stat_app.png"
            title="Données"
          />
        </div>
      </div>
    </div>
  );
};

export default AppOverview;
