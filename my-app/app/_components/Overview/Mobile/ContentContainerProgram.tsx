import { forwardRef } from "react";

const ContentContainerProgram = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children }, ref) => {
  return (
    <div
      ref={ref}
      className="absolute left-1/2 top-1/2 z-50 grid h-full w-full -translate-x-1/2 -translate-y-1/2 place-content-center gap-20 overflow-hidden rounded-3xl border-2 border-red-400 p-4"
    >
      {children}
    </div>
  );
});

ContentContainerProgram.displayName = "ContentContainerProgram";

export default ContentContainerProgram;
