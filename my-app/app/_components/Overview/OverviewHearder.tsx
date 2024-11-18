import { OverViewHeaderProps } from "@/types/types";

const OverviewHearder = ({
  headerProps,
}: {
  headerProps: OverViewHeaderProps;
}) => {
  const { logo, title, subtitle, description } = headerProps;

  return (
    <div className="flex flex-col gap-32 pt-40 mb-10">
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
  );
};

export default OverviewHearder;
