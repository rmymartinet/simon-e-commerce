"use client";

import { verticalDisplay } from "@/utils/common/moveYAxisEl";
import { useGSAP } from "@gsap/react";
import React from "react";
import { useRef } from "react";

function PostsHeader() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    verticalDisplay(titleRef as React.RefObject<HTMLElement>, 2);
  }, []);

  return (
    <div className="overflow-hidden pb-2">
      <h1 ref={titleRef} className="text-7xl lg:text-9xl">
        Blog
      </h1>
    </div>
  );
}

export default PostsHeader;
