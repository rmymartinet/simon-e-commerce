import { feedBack } from "@/app/data/feedbackData";
import Image from "next/image";

function FeedBackCoaching() {
  return (
    <div className="text-secondary mb-[20vh] mt-[20vh] grid w-full place-content-center">
      <div className="flex flex-col items-center gap-10 rounded border border-[--border-color] bg-[--card-bg] p-10">
        <p className="whitespace-normal text-pretty text-center text-2xl md:max-w-5xl">
          &quot; {feedBack[1].feedback} &quot;
        </p>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <p className="text-2xl">{feedBack[1].firstName}</p>
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={feedBack[1].photo}
                width={300}
                height={300}
                alt="caroline profile pricture"
                className="h-[110%] w-[110%] object-cover"
              />
            </div>
          </div>
          <p className="text-xl text-muted">Membre depuis 7 mois</p>
        </div>
      </div>
    </div>
  );
}

export default FeedBackCoaching;
