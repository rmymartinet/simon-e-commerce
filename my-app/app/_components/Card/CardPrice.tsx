"use client";

import { CardPriceProps } from "@/types/types";
import { IoCheckmarkOutline } from "react-icons/io5";
import Price from "./Price";
import useWindowWidth from "@/hooks/useWindowWidth";
import Divider from "../Divider";
import AddToCartButton from "../AddToCartButton";
import useHandleAction from "@/hooks/useHandleAction";
import Image from "next/image";

const CardPrice = ({ productData, filterName, session }: CardPriceProps) => {
  const { width } = useWindowWidth();
  const { handleAction, loading } = useHandleAction(session);

  return (
    <>
      <div
        className={`card relative flex h-full w-[95vw] flex-col rounded-xl p-10 transition-transform duration-300 ease-in-out md:w-[90vw] lg:w-[30vw] ${
          productData.mostPopular
            ? `${width >= 1024 ? "scale-[1.03]" : ""} z-50`
            : "z-40"
        }`}
      >
        {filterName === "programmes" && (
          <div className="absolute inset-0 -z-40">
            <Image
              src={productData.imageUrl}
              alt=""
              width={500}
              height={500}
              className="h-full w-full rounded-xl object-cover opacity-100 brightness-[0.65]"
              quality={100}
            />
          </div>
        )}
        {productData.mostPopular && (
          <div className="popular-box absolute -right-10 -top-4 -z-10 w-max -translate-x-1/2 rounded-full p-2 font-semibold">
            Plus populaire
          </div>
        )}
        <div className="mb-20 flex justify-between">
          <h1 className="text-4xl font-semibold">{productData.titlePlan}</h1>
        </div>
        <Price
          price={productData.price}
          mounth={productData.month}
          dayPrice={productData.dayPrice}
        />
        <div className="mb-2 mt-4">
          <Divider bgColor="bg-textOpacity" />
        </div>
        <div className="grid grid-rows-cardPrice">
          <p className="mt-2 text-center font-medium md:text-start">
            {productData.description}
          </p>
          <div className="mb-10 flex flex-col">
            <button
              className="padding w-full self-end rounded-xl bg-button-gradient text-center text-lg font-semibold text-white"
              onClick={() =>
                handleAction({
                  productData,
                  filterName,
                })
              }
              disabled={loading}
            >
              {loading ? "  Chargement..." : "Acheter"}
            </button>
            {filterName === "programmes" && (
              <AddToCartButton productData={productData} />
            )}
          </div>
          <ul className="flex flex-col gap-3">
            <p className="text-slate-300">Inclus:</p>
            {productData.includes?.map((include, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="card rounded-full p-1">
                  <IoCheckmarkOutline color="violet" />
                </div>
                {include}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CardPrice;
