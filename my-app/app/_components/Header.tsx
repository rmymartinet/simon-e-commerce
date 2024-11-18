import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { IoIosArrowRoundForward } from "react-icons/io";

gsap.registerPlugin(useGSAP);

const Header = () => {
  return (
    <div className="relative flex items-center justify-center p-8 min-h-screen">
      <div className="absolute  overflow-hidden w-[100%] h-[100%]">
        <video
          autoPlay
          loop
          muted
          src="/videos/text.mp4"
          className="w-full h-full object-cover filter brightness-[0.9]"
        ></video>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full gap-2 flex flex-col items-center">
          <div className="flex flex-col items-center"></div>
        </div>
        <div className="flex flex-col p-4 text-black rounded-3xl items-center absolute bottom-10 left-1/2 -translate-x-1/2 border-2 bg-black border-slate-100 shadow-2xl">
          <div className="gap-4 flex overflow-hidden">
            <div className="bg-white p-2 rounded-xl ">
              <div className="w-42  flex flex-col justify-between items-center p-2 gap-4 ">
                <div>
                  <h1 className="text-xl text-black">Programme</h1>
                </div>
                <button className="py-2 px-4 bg-black text-white rounded-xl flex justify-between items-center w-full">
                  <p>Commencer</p>
                  <div className="-rotate-45">
                    <IoIosArrowRoundForward size={20} />
                  </div>
                </button>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-white">
              <div className="w-42  flex flex-col justify-between items-center p-2 gap-4 ">
                <div>
                  <h1 className="text-xl text-black">Coaching</h1>
                </div>
                <button className="py-2 px-4 bg-black text-white rounded-xl flex justify-between items-center w-full">
                  <p>Commencer</p>
                  <div className="-rotate-45">
                    <IoIosArrowRoundForward size={20} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
