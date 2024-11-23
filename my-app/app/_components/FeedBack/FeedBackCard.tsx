import { RiStarSFill } from "react-icons/ri";

const FeedBackCard = ({ firstName, imgUrl, text }) => {
  return (
    <div className="grid h-[30vh] grid-rows-3 justify-between rounded-2xl border border-white p-6">
      <div className="flex gap-2">
        <RiStarSFill color="#E0AAFF" />
        <RiStarSFill color="#E0AAFF" />
        <RiStarSFill color="#E0AAFF" />
        <RiStarSFill color="#E0AAFF" />
        <RiStarSFill color="#E0AAFF" />
      </div>
      <p className="text-xl">{text}</p>
      <div className="flex items-center gap-4 self-end">
        <div className="h-10 w-10 overflow-hidden rounded-full">
          <img
            src="/images/tete.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <p>{firstName}</p>
      </div>
    </div>
  );
};

export default FeedBackCard;
