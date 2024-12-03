const Question = ({ question }: { question: string }) => {
  return (
    <div className="w-max rounded-full bg-white px-4 py-2">
      <p>{question}</p>
    </div>
  );
};

export default Question;
