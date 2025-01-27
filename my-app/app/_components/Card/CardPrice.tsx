"use client";

import { CardPriceProps } from "@/types/types";
import { IoCheckmarkOutline } from "react-icons/io5";
import Price from "./Price";
import AddToCartButton from "../AddToCartButton";
import useHandleAction from "@/hooks/useHandleAction";

const CardPrice = ({ productData, filterName, session }: CardPriceProps) => {
  const { handleAction, loading } = useHandleAction(session);

  return (
    <>
      <div className="relative flex h-full w-full flex-col rounded-2xl border p-10">
        {productData.mostPopular && (
          <div className="absolute -right-10 -top-4 z-50 w-max -translate-x-1/2 rounded-full bg-button-gradient p-2 font-semibold">
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
        <div className="grid grid-rows-cardPrice">
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
              {filterName === "programmes" ? "Acheter" : "S'abonner"}
            </button>
            {filterName === "programmes" && (
              <AddToCartButton productData={productData} />
            )}
          </div>
          <ul className="mt-8 flex flex-col gap-3">
            <p className="text-slate-300">Inclus:</p>
            {productData.includes?.map((include, index) => (
              <li key={index} className="flex items-center gap-4">
                <IoCheckmarkOutline color="violet" />
                <p>{include}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CardPrice;
