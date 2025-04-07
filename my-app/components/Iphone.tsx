import Image from "next/image";

const Iphone = ({
  title,
  video,
  imgUrl,
}: {
  title?: string;
  video?: string;
  imgUrl?: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-10">
      {title && (
        <h1 className="card padding rounded-xl text-xl font-bold">{title}</h1>
      )}
      <div className="relative z-50 h-full overflow-hidden lg:scale-150 xl:scale-100">
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src="/images/iphonee.png"
            alt=""
            width={1000}
            height={1000}
            className="scale z-20 h-full w-full object-cover"
            quality={100}
          />
          {imgUrl && (
            <Image
              src={imgUrl}
              alt=""
              width={1000}
              height={1000}
              className="absolute inset-0 left-1/2 top-1/2 -z-10 flex h-[90%] w-[87%] -translate-x-1/2 -translate-y-1/2 items-center justify-center object-cover lg:h-[95%] lg:w-[90%]"
              quality={100}
            />
          )}
          {video && (
            <div className="absolute inset-0 left-1/2 top-1/2 -z-10 flex h-[95%] w-[90%] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden lg:h-[95%] lg:w-[88%]">
              <video
                autoPlay
                playsInline
                loop
                muted
                preload="auto"
                src={video}
                className="h-full w-full object-cover"
              ></video>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Iphone;
