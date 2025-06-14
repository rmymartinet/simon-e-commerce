import React from "react";
import { IoCheckmarkOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import Link from "next/link";

interface OfferCardProps {
  month: string;
  price: string;
  description: string;
  features: string[];
  hasVioletBorder?: boolean;
  buttonText?: string;
  urlLink: string;
}

const OfferCard = ({
  month,
  price,
  description,
  features,
  hasVioletBorder = true,
  buttonText = "Acheter",
  urlLink,
}: OfferCardProps) => {
  return (
    <div
      className={`relative flex flex-col justify-between gap-4 rounded-xl ${!hasVioletBorder ? "bg-white" : "glassmorph"} text-black ${hasVioletBorder ? "border border-violet-500" : ""} px-4 py-6 sm:gap-6 sm:px-6 sm:py-8 lg:gap-8 lg:px-8 lg:py-10`}
    >
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="mb-4 flex flex-col items-center gap-2 sm:mb-6 sm:gap-4">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
            {month} mois
          </h2>
          <span className="text-base font-semibold text-violet-500 sm:text-lg">
            {price}
          </span>
          <p className="mt-2 text-sm sm:mt-4 sm:text-base md:text-lg">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="mb-1 text-sm sm:mb-2 sm:text-base">Inclus: </span>
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 font-semibold sm:gap-3"
            >
              <IoCheckmarkOutline className="text-base text-violet-500 sm:text-lg" />
              <p className="text-sm sm:text-base">{feature}</p>
            </div>
          ))}
        </div>
      </div>
      <Button
        className="w-full"
        variant="purpleBg"
      >
        <Link href={urlLink}>{buttonText}</Link>
      </Button>
    </div>
  );
};

export default OfferCard;
