import Image from "next/image";
import { imagesUrls } from "@/app/data/beforeAfterPhotoData";
import { ArrowRight } from "lucide-react";
import TitleComponent from "./TitleComponent";

const BeforeAfterPhoto = () => {
  return (
    <div className="relative mt-[20vh] flex w-full flex-col items-center justify-center">
      <TitleComponent
        title="Une méthode. Un accompagnement. Des résultats."
        titleIndication="transformations physiques"
        subtitle="Découvrez nos avants / après."
      />

      <div className="relative mt-20 flex w-full flex-col items-center gap-16">
        {imagesUrls.map((image, index) => {
          return (
            <div
              key={index}
              className="relative grid w-full grid-cols-[1fr_auto_1fr] gap-2 md:w-max md:grid-cols-[300px_100px_300px]"
            >
              <div className="flex justify-center">
                <div className="flex w-full max-w-[280px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-black font-semibold text-white">
                  <span className="w-full bg-violet-500 py-1 text-center text-xs font-semibold uppercase text-white">
                    Avant
                  </span>
                  <div className="flex w-full items-center justify-center gap-2 border-b border-white/10 px-4 py-3 text-sm uppercase tracking-wide text-white/80">
                    <span>{image.firstMoutnh}</span>
                  </div>
                  {image.before && (
                    <div className="relative h-64 w-full overflow-hidden md:h-80">
                      <Image
                        src={image.before}
                        alt={`Image avant ${image.name}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-[#121214] text-white/80 shadow-lg md:h-12 md:w-12">
                  <ArrowRight className="size-4" />
                </div>
              </div>

              <div className="flex justify-center">
                <div className="flex w-full max-w-[280px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-black font-semibold text-white">
                  <span className="w-full bg-violet-500 py-1 text-center text-xs font-semibold uppercase text-white">
                    Après
                  </span>
                  <div className="flex w-full items-center justify-between gap-2 border-b border-white/10 px-4 py-3 text-sm uppercase tracking-wide text-white/80">
                    <span>{image.lastMoutnh}</span>
                    {image.result && (
                      <span className="rounded-full bg-violet-500/10 px-2 py-0.5 font-semibold uppercase tracking-wide">
                        {image.result}
                      </span>
                    )}
                  </div>
                  {image.after && (
                    <div className="relative h-64 w-full overflow-hidden md:h-80">
                      <Image
                        src={image.after}
                        alt={`Image après ${image.name}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BeforeAfterPhoto;
