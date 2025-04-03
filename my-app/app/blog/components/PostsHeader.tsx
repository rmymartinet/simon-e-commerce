"use client";

import TitleComponent from "@/app/_components/TitleComponent";
import React from "react";

function PostsHeader() {
  return (
    <section>
      <TitleComponent
        title="Articles & Conseils"
        titleIndication="blog"
        subtitle="Découvrez nos derniers articles et conseils."
      />
    </section>
  );
}

export default PostsHeader;
