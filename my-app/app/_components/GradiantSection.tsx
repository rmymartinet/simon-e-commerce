import React from "react";

interface GradiantSectionProps {
  gradiant: string;
  logo: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  titleContent: string;
  descriptionContent: string;
  children?: React.ReactNode;
}

const GradiantSection = ({
  gradiant,
  logo,
  title,
  subtitle,
  description,
  titleContent,
  descriptionContent,
  children,
}: GradiantSectionProps) => {
  return (
    <section className="flex flex-col">
      <div className="relative px-2 lg:px-6 flex flex-col gap-6">
        <div
          className={`absolute ${gradiant} w-screen -z-10 top-0 left-0 h-1/4 md:h-1/3 lg:h-1/3`}
        ></div>
        <div className="flex flex-col gap-32 pt-40 mb-10 ">
          <div className="flex flex-col gap-14">
            <div className="flex items-center gap-6">
              <div className="bg-white rounded-2xl p-4">{logo}</div>
              <h1 className="text-5xl">{title}</h1>
            </div>
            <span className="text-8xl">{subtitle}</span>
          </div>
          <p className="md:text-xl lg:text-2xl text-pretty w-[70%] md:w-[60%] lg:w-[45%]">
            {description}
          </p>
        </div>
        <div className="flex flex-col">
          <div className="bg-white rounded-2xl h-[50vh] md:h-[70vh] lg:h-[80vh] flex flex-col-reverse gap-10 lg:gap-0  lg:grid lg:grid-cols-custom lg:items-end p-4 lg:p-7">
            <div className="flex flex-col lg:col-start-1-end-2">
              <h4>{titleContent}</h4>
              <p className="text-slate-400 text-pretty pr-8">
                {descriptionContent}
              </p>
            </div>
            <div
              className={`${gradiant} rounded-2xl h-full w-full lg:col-start-2-end-4 relative`}
            >
              <div className="absolute glassmorph top-20 left-20 w-40 h-40 rounded-2xl">
                Bonjour
              </div>
            </div>
          </div>
          <div className="rounded-2xl h-[80vh] flex flex-col lg:grid lg:grid-cols-custom gap-7 pt-7 ">
            <div className="bg-white h-[65vh] w-full rounded-2xl lg:col-start-2-end-3"></div>
            <div className="bg-white h-[60vh] w-full rounded-2xl lg:col-start-3-end-4"></div>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
};

export default GradiantSection;
