export default function BackgroundTransition({
  orientation = 180,
  yPosition = "bottom-0",
}: {
  orientation?: number;
  yPosition?: string;
}) {
  return (
    <div
      className={`absolute ${yPosition} z-20 h-20 w-full`}
      style={{
        background: `linear-gradient(${orientation}, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 56%)`,
      }}
    />
  );
}
