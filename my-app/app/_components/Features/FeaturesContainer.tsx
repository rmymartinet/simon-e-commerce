import React from "react";

interface FeaturesContainerProps {
  children: React.ReactNode;
}

const FeaturesContainer = ({ children }: FeaturesContainerProps) => {
  return (
    <div className="rounded-2xl flex justify-end gap-10 pb-[24vh]">
      <div className="h-full lg:w-[70vw] flex flex-col w-full gap-28">
        <h1 className="text-4xl text-center md:text-start">
          Fonctionnalités supplémentaires
        </h1>
        <div className="flex flex-col gap-32 md:grid md:grid-cols-2 md:grid-flow-row">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FeaturesContainer;
