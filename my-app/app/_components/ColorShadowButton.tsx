import useNavigation from "@/utils/navigationUtils";

const ColorShadowButton = ({
  title,
  color,
}: {
  title: string;
  color: string;
}) => {
  const { handlePricingNavigation } = useNavigation();

  return (
    <div className="relative mt-8 w-max">
      <button
        onClick={handlePricingNavigation}
        className="program-button-container padding rounded-xl bg-button-gradient font-bold"
      >
        {title}
      </button>
      <div
        className={`absolute inset-0 -z-10 h-full w-full rounded-xl blur-sm`}
        style={{ backgroundColor: color }}
      />
      <div className="absolute inset-0 -z-10 h-full w-full rounded-xl bg-[#0b0d14]" />
    </div>
  );
};

export default ColorShadowButton;
