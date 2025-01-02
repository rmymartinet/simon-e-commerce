import { FeedBackCardProps } from "@/types/types";
import Image from "next/image";
import { RiStarSFill } from "react-icons/ri";

const FeedBackCard = ({ firstName, imgUrl, text }: FeedBackCardProps) => {
  return (
    <div className="card grid h-[35vh] grid-rows-feedBackCard justify-between rounded-2xl border border-[#424242] p-6">
      <div className="mb-8 flex gap-2">
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <RiStarSFill key={index} color="#E0AAFF" />
          ))}
      </div>
      <p className="text-xl">{text}</p>
      <div className="flex items-center gap-4 self-end">
        <div className="h-10 w-10 overflow-hidden rounded-full">
          <Image
            width={300}
            height={300}
            src={imgUrl}
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
