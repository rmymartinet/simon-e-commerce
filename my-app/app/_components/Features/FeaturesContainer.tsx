import { FeaturesContainerProps } from "@/types/types";

const FeaturesContainer = ({
  title,
  text,
  children,
}: FeaturesContainerProps) => {
  return (
    <div className="relative mt-40 flex justify-end gap-10 pb-[24vh]">
      <div className="flex h-full w-full flex-col gap-28">
        <div className="flex flex-col gap-4 lg:items-center">
          <h1 className="text-3xl md:text-4xl lg:text-center lg:text-7xl">
            {title}
          </h1>
          <p className="max-w-5xl font-medium text-muted md:text-xl lg:text-center">
            {text}
          </p>
        </div>
        <div className="flex flex-col gap-20 lg:grid lg:grid-flow-row lg:grid-cols-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FeaturesContainer;
