import { feedBack } from "@/app/data/feedbackData";
import Image from "next/image";

function FeedBackCoaching() {
  return (
    <div className="grid h-screen place-content-center px-4">
      <div className="flex flex-col items-center gap-10">
        <p className="max-w-5xl text-pretty text-center text-2xl lg:text-4xl">
          {feedBack[1].feedback}
        </p>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <p className="text-2xl lg:text-4xl">{feedBack[1].firstName}</p>
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
