import FeedBackCarouselle from "./FeedbackCarouselle";

const FeedBackContainer = () => {
  return (
    <section className="grid grid-rows-feedBackContainer justify-items-center gap-10">
      <div className="flex flex-col items-center">
        <h1 className="text-center text-6xl font-bold md:text-7xl">
          Nos Résulats
        </h1>
        <p className="text-center text-lg font-semibold text-textOpacity">
          Découvrez ce que nos clients disent de notre équipe et de nos services
        </p>
      </div>
      <FeedBackCarouselle />
    </section>
  );
};

export default FeedBackContainer;
