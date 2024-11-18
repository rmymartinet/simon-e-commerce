import React from "react";

interface FeaturesContainerProps {
  title: string;
  children: React.ReactNode;
}

/**
 * !TODO mt-40
 */

const FeaturesContainer = ({ children, title }: FeaturesContainerProps) => {
  return (
    <div className="rounded-2xl flex justify-end gap-10 pb-[24vh] mt-40">
      <div className="h-full lg:w-[70vw] flex flex-col w-full gap-28">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl text-center md:text-start">{title}</h1>
          <p className="text-slate-400 text-lg">( sans suivi )</p>
        </div>
        <div className="flex flex-col gap-32 md:grid md:grid-cols-2 md:grid-flow-row">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FeaturesContainer;
