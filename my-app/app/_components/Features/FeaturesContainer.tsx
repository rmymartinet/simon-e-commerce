import { FeaturesContainerProps } from "@/types/types";

const FeaturesContainer = ({
  title,
  text,
  children,
}: FeaturesContainerProps) => {
  return (
    <div className="relative mt-40 flex justify-end gap-10 pb-[24vh]">
      <div className="flex h-full w-full flex-col gap-28">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center text-5xl lg:text-8xl">{title}</h1>
          <p className="max-w-3xl text-center text-lg">{text}</p>
        </div>
        <div className="flex flex-col gap-20 lg:grid lg:grid-flow-row lg:grid-cols-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FeaturesContainer;
