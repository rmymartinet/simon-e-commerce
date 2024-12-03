import { FaLightbulb } from "react-icons/fa";

const StepCard = ({
  step,
  title,
  content,
  bgClass = "glassmorph",
  children,
}) => {
  return (
    <div
      className={`flex flex-col items-center gap-4 rounded-xl ${bgClass} border-2 border-white p-4 lg:w-[50vw]`}
    >
      <div className="flex flex-col items-center gap-4 text-center text-lg font-medium">
        <h3 className="rounded-full bg-white px-2 py-1">Etape: {step}</h3>
        <h3>{title}</h3>
      </div>
      <div className="flex gap-4 rounded-md bg-glassmorph p-4">
        <FaLightbulb size={16} />
        <p className="text-pretty">{content}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default StepCard;
