const Question = ({ question }: { question: string }) => {
  return (
    <div className="card w-max rounded-full bg-white px-4 py-2 font-semibold">
      <p>{question}</p>
    </div>
  );
};

export default Question;
