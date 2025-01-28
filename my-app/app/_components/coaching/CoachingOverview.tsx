import Iphone from "../Iphone";
import Button from "../Button";

const CoachingOverview = () => {
  return (
    <div
      id="coaching"
      className="relative mt-[20vh] flex flex-col items-center gap-20 overflow-hidden px-4"
    >
      <div className="flex flex-col gap-20">
        <div className="flex flex-col items-center justify-center gap-20">
          <h1 className="max-w-7xl whitespace-normal break-words text-center text-4xl lg:text-7xl">
            Vous préférez être accompagné, vous êtes unique, votre coaching
            aussi.
          </h1>
          <p className="text-3xl text-muted">
            Des appels réguliers pour un vrai suivi
          </p>

          <Button href="/pricing" />
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center gap-20">
        <div className="relative w-[90%]">
          <div className="absolute left-10 top-20 z-40 h-[80%] w-[20vw] bg-black blur-sm"></div>
          <video
            src="/videos/coaching/whats_app_coaching.mp4"
            loop
            muted
            autoPlay
            playsInline
            className="h-full w-full object-cover blur-[0px]"
          ></video>

          <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 xl:scale-125">
            <Iphone video="/videos/coaching/call.mp4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachingOverview;
