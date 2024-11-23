import FeedBackCarouselle from "./FeedbackCarouselle";

const FeedBackContainer = () => {
  return (
    <section
      className="grid justify-items-center gap-10"
      style={{ gridTemplateRows: "max-content, 1fr" }}
    >
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-7xl">Nos Résulats</h1>
        <p className="text-slate-400">
          Découvrez ce que nos clients disent de notre équipe et de nos services
        </p>
      </div>
      <FeedBackCarouselle />
    </section>
  );
};

export default FeedBackContainer;
