import { FeaturesContainerProps } from "@/types/types";
import Link from "next/link";

/**
 * !TODO mt-40
 */

const FeaturesContainer = ({
  coaching,
  title,
  text,
  children,
}: FeaturesContainerProps) => {
  return (
    <div className="relative mt-40 flex justify-end gap-10 self-end pb-[24vh]">
      <div className="animate-bg-purple absolute -left-[900px] bottom-0 h-1/2 w-1/2"></div>
      <div className="flex h-full w-full flex-col gap-28 lg:w-[70vw]">
        <div className="flex flex-col items-center gap-4 lg:items-start">
          <h1 className="text-center text-5xl font-bold md:text-start">
            {title}
          </h1>
          <p className="text-center text-lg text-slate-400 md:text-start">
            ( {text} )
          </p>
          <div className="relative mt-4 w-max">
            <Link href={coaching ? "/#coaching" : "/#program"}>
              <button className="program-button-container padding rounded-xl font-bold">
                En voir plus
              </button>
            </Link>
            <div className="absolute inset-0 -z-10 h-full w-full rounded-xl bg-[#f690ff] blur-sm"></div>
            <div className="absolute inset-0 -z-10 h-full w-full rounded-xl bg-[#0b0d14]"></div>
          </div>
        </div>
        <div className="flex flex-col gap-32 lg:grid lg:grid-flow-row lg:grid-cols-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FeaturesContainer;
