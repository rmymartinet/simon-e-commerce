import React from "react";
import TitleComponent from "../TitleComponent";
import FeedBackCarouselle from "./FeedbackCarouselle";

const FeedBackContainer = () => {
  return (
    <section className="mt-[20vh] grid grid-rows-feedBackContainer justify-items-center gap-10">
      <TitleComponent
        title="Nos Résultats"
        subtitle="Découvrez ce que nos clients disent de notre équipe et de nos services "
        isTextSplitLines={false}
        scrollTrigger={false}
      />

      <FeedBackCarouselle />
    </section>
  );
};

export default FeedBackContainer;
