import React from "react";
import TitleComponent from "../TitleComponent";
import FeedBackCarouselle from "./FeedbackCarouselle";

const FeedBackContainer = () => {
  const titleRef = React.useRef<HTMLDivElement>(null);
  const subtitleRef = React.useRef<HTMLParagraphElement>(null);
  return (
    <section className="mt-[20vh] grid grid-rows-feedBackContainer justify-items-center gap-10">
      <TitleComponent
        titleRef={titleRef}
        subtitleRef={subtitleRef}
        title="Nos Résultats"
        subtitle="Découvrez ce que nos clients disent de notre équipe et de nos services "
        isTextSplitLines={false}
      />

      <FeedBackCarouselle />
    </section>
  );
};

export default FeedBackContainer;
