import FeedBackCarouselle from "./FeedbackCarouselle";

const FeedBackContainer = () => {
  return (
    <section className="grid grid-rows-feedBackContainer justify-items-center gap-10">
      <div className="flex flex-col items-start lg:items-center">
        <h1 className="text-3xl md:text-4xl lg:text-7xl">Nos Résultats</h1>
        <p className="max-w-5xl font-medium text-muted md:text-xl">
          Découvrez ce que nos clients disent de notre équipe et de nos services
        </p>
      </div>
      <FeedBackCarouselle />
    </section>
  );
};

export default FeedBackContainer;
