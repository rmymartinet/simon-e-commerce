import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import OfferSelector from "../Header/OfferSelector";

gsap.registerPlugin(useGSAP);

const Header = () => {
  return (
    <div className="relative flex min-h-screen w-screen items-center justify-center p-8">
      <div className="absolute h-full w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          src="/videos/yo.mp4"
          className="h-full w-full object-cover brightness-[0.9] filter"
          preload="true"
        ></video>
        <OfferSelector />
      </div>
    </div>
  );
};

export default Header;
