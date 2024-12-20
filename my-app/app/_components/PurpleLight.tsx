import { PurpleLightProps } from "@/types/types";

const PurpleLight = ({
  yposition,
  xposition,
  width,
  height,
}: PurpleLightProps) => {
  return (
    <div
      className={`fixed-bg-purple absolute ${yposition} ${xposition} -z-10 ${height} ${width}`}
    />
  );
};

export default PurpleLight;
