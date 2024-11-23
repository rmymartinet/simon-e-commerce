import { OverViewHeaderProps } from "@/types/types";

const HeaderOverview = ({
  headerProps,
}: {
  headerProps: OverViewHeaderProps;
}) => {
  const { logo, title, subtitle, description } = headerProps;

  return (
    <div className="mb-10 flex flex-col gap-10 pt-40 lg:gap-32">
      <div className="flex flex-col gap-14">
        <div className="flex items-center gap-6">
          <div className="rounded-2xl bg-white p-4">{logo}</div>
          <h1 className="text-xl md:text-4xl lg:text-5xl">{title}</h1>
        </div>
        <span className="text-3xl md:text-6xl lg:text-8xl">{subtitle}</span>
      </div>
      <p className="w-full text-pretty md:w-[60%] md:text-xl lg:w-[45%] lg:text-2xl">
        {description}
      </p>
    </div>
  );
};

export default HeaderOverview;
