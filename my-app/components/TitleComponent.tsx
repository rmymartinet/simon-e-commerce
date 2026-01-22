"use client";

import {
  textSplitLines,
  textSplitLinesScrollTrigger,
} from "@/utils/common/textAnimation";
import { useGSAP } from "@gsap/react";
import React from "react";

const TitleComponent = ({
  titleIndication,
  title,
  subtitle,
  isTextSplitLines = true,
  scrollTrigger = false,
}: {
  titleIndication?: string;
  title: string;
  subtitle: string;
  isTextSplitLines?: boolean;
  scrollTrigger?: boolean;
}) => {
  const titleRef = React.useRef<HTMLDivElement>(null);
  const subtitleRef = React.useRef<HTMLParagraphElement>(null);
  const titleIndicationRef = React.useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (titleRef.current && subtitleRef.current && isTextSplitLines) {
      textSplitLines(titleRef as React.RefObject<HTMLElement>);
      textSplitLines(subtitleRef as React.RefObject<HTMLElement>);
      textSplitLines(titleIndicationRef as React.RefObject<HTMLElement>);
    } else if (
      titleRef.current &&
      subtitleRef.current &&
      titleIndicationRef.current &&
      !isTextSplitLines &&
      scrollTrigger
    ) {
      textSplitLinesScrollTrigger(titleRef as React.RefObject<HTMLElement>);
      textSplitLinesScrollTrigger(subtitleRef as React.RefObject<HTMLElement>);
      textSplitLinesScrollTrigger(
        titleIndicationRef as React.RefObject<HTMLElement>,
      );
    }
  }, []);

  return (
    <div
      ref={titleRef}
      className="mb-0 flex flex-col items-center justify-center text-center md:mb-20"
    >
      <div ref={titleIndicationRef}>
        {titleIndication && (
          <p className="mb-4 rounded-full border-2 border-violet-500 px-4 py-2 text-sm uppercase text-[--subtext]">
            {titleIndication}
          </p>
        )}
      </div>

      <h1 className="text-3xl font-bold md:text-5xl">{title}</h1>
      <p
        ref={subtitleRef}
        className="mt-2 text-center text-[--subtext] md:max-w-5xl md:text-lg"
      >
        {subtitle}
      </p>
    </div>
  );
};

export default TitleComponent;
