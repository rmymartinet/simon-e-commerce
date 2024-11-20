import { FeaturesContainerProps } from "@/types/types";

/**
 * !TODO mt-40
 */

const FeaturesContainer = ({
  title,
  text,
  children,
}: FeaturesContainerProps) => {
  return (
    <div className="mt-40 flex justify-end gap-10 rounded-2xl pb-[24vh]">
      <div className="flex h-full w-full flex-col gap-28 lg:w-[70vw]">
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-5xl md:text-start">{title}</h1>
          <p className="text-center text-lg text-slate-400 md:text-start">
            ( {text} )
          </p>
        </div>
        <div className="flex flex-col gap-32 md:grid md:grid-flow-row md:grid-cols-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FeaturesContainer;
