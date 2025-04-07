import Image from "next/image";
import Iphone from "../Iphone";
import { images } from "@/app/data/youtubeData";
import { BackgroundYoutubeImgProps } from "@/types/types";

const BackgroundYoutubeImg = ({
  imagesRefs,
  iphoneRef,
}: BackgroundYoutubeImgProps) => {
  return (
    <div className="relative flex h-[80vh] flex-col items-center">
      <div className="absolute flex h-full w-full justify-center gap-4 overflow-hidden">
        {images.map((img, index) => (
          <div
            ref={(el) => {
              imagesRefs.current[index] = el;
            }}
            key={index}
            className="flex flex-col"
            style={{ marginTop: img.mt }}
          >
            <div>
              <Image
                src={img.src1}
                width={img.width}
                height={img.height}
                className="rounded-3xl"
                quality={100}
                alt=""
                style={{ opacity: img.opacity / 100 }}
              />
              <Image
                src={img.src2}
                width={img.width}
                height={img.height}
                className="rounded-3xl"
                quality={100}
                alt=""
                style={{ opacity: img.opacity / 100 }}
              />
            </div>
            <div>
              <Image
                src={img.src1}
                width={img.width}
                height={img.height}
                className="rounded-3xl"
                quality={100}
                alt=""
                style={{ opacity: img.opacity / 100 }}
              />
              <Image
                src={img.src2}
                width={img.width}
                height={img.height}
                className="rounded-3xl"
                quality={100}
                alt=""
                style={{ opacity: img.opacity / 100 }}
              />
            </div>
            <div>
              <Image
                src={img.src1}
                width={img.width}
                height={img.height}
                className="rounded-3xl"
                quality={100}
                alt=""
                style={{ opacity: img.opacity / 100 }}
              />
              <Image
                src={img.src2}
                width={img.width}
                height={img.height}
                className="rounded-3xl"
                quality={100}
                alt=""
                style={{ opacity: img.opacity / 100 }}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        ref={iphoneRef}
        className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 opacity-100"
      >
        <div className="relative h-full w-full">
          <Iphone video="/videos/exercices/video1.mp4" />
        </div>
      </div>
    </div>
  );
};

export default BackgroundYoutubeImg;
