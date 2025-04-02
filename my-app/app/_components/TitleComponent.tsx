import {
  textSplitLines,
  textSplitLinesScrollTrigger,
} from "@/utils/common/textAnimation";
import { useGSAP } from "@gsap/react";
import React from "react";

const TitleComponent = ({
  titleRef,
  subtitleRef,
  titleIndication,
  title,
  subtitle,
  isTextSplitLines = true,
}: {
  titleRef: React.RefObject<HTMLDivElement | null>;
  subtitleRef: React.RefObject<HTMLParagraphElement | null>;
  titleIndication?: string;
  title: string;
  subtitle: string;
  isTextSplitLines?: boolean;
}) => {
  useGSAP(() => {
    if (titleRef.current && subtitleRef.current && isTextSplitLines) {
      textSplitLines(titleRef as React.RefObject<HTMLElement>);
      textSplitLines(subtitleRef as React.RefObject<HTMLElement>);
    } else if (titleRef.current && subtitleRef.current && !isTextSplitLines) {
      textSplitLinesScrollTrigger(titleRef as React.RefObject<HTMLElement>);
      textSplitLinesScrollTrigger(subtitleRef as React.RefObject<HTMLElement>);
    }
  }, []);

  return (
    <div ref={titleRef} className="flex flex-col items-center justify-center">
      {titleIndication && (
        <p className="mb-4 text-sm uppercase text-[--subtext]">
          {titleIndication}
        </p>
      )}

      <h1 className="text-3xl md:text-6xl">{title}</h1>
      <p
        ref={subtitleRef}
        className="mt-2 font-medium text-[--subtext] md:text-xl"
      >
        {subtitle}
      </p>
    </div>
  );
};

export default TitleComponent;
