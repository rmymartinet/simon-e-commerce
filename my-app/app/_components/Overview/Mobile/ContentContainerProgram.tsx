import React, { forwardRef } from "react";

const ContentContainerProgram = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children }, ref) => {
  return (
    <div
      ref={ref}
      className="absolute w-full h-full grid place-content-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-3xl overflow-hidden p-4 gap-20 z-50"
    >
      {children}
    </div>
  );
});

export default ContentContainerProgram;
