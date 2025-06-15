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
    <div className="flex flex-col w-full h-full items-center gap-10">
      {title && (
        <h1 className="card padding rounded-xl text-xl font-bold">{title}</h1>
      )}
      <div className="relative z-50 h-full w-full max-w-[300px] mx-auto">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src="/images/iphonee.png"
            alt=""
            width={300}
            height={600}
            className="w-full h-full object-contain z-20"
            quality={100}
          />
          {imgUrl && (  
            <Image
              src={imgUrl}
              alt=""
              width={260}
              height={520}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[90%] w-[87%] object-contain z-10"
              quality={100}
            />
          )}
          {video && (
            <div className="absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-[90%] w-[87%] items-center justify-center overflow-hidden">
              <video
                autoPlay
                playsInline
                loop
                muted
                preload="auto"
                src={video}
                className="h-full w-full object-contain"
              ></video>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Iphone;
