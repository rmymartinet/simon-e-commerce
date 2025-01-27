"use client";

import { useEffect } from "react";

const LocomotiveScrollWrapper = () => {
  useEffect(() => {
    const loadLocomotiveScroll = async () => {
      const { default: LocomotiveScroll } = await import("locomotive-scroll");

      new LocomotiveScroll({
        // @ts-expect-error: LocomotiveScroll types might not match exactly
        el: document.querySelector("#main-container") as HTMLElement,
        smooth: true,
      });
    };

    loadLocomotiveScroll();
  }, []);

  return null;
};

export default LocomotiveScrollWrapper;
