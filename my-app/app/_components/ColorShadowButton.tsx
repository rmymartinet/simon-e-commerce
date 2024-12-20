const ColorShadowButton = ({
  title,
  color,
}: {
  title: string;
  color: string;
}) => {
  return (
    <div className="relative mt-4 w-max">
      <button className="program-button-container padding rounded-xl bg-button-gradient font-bold">
        {title}
      </button>
      <div
        className={`absolute inset-0 -z-10 h-full w-full rounded-xl bg-[${color}] blur-sm`}
      />
      <div className="absolute inset-0 -z-10 h-full w-full rounded-xl bg-[#0b0d14]" />
    </div>
  );
};

export default ColorShadowButton;
