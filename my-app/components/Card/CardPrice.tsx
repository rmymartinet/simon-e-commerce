"use client";

import { CardPriceProps } from "@/types/types";
import { IoCheckmarkOutline } from "react-icons/io5";
import Price from "./Price";
import AddToCartButton from "../AddToCartButton";
import useHandleAction from "@/hooks/useHandleAction";

const CardPrice = ({
  productData,
  filterName,
  session,
  isHighlighted,
}: CardPriceProps) => {
  const { handleAction, loading } = useHandleAction(session);
  return (
    <>
      <div
        className={`relative flex h-full w-full flex-col rounded-2xl border border-[--border-color] bg-[--card-bg] p-10 ${isHighlighted ? "bg-violet-700 text-white" : "bg-[var(--card-bg)]"}`}
      >
        <div className="mb-20 flex justify-between">
          <h1 className="text-4xl font-semibold">{productData.titlePlan}</h1>
        </div>
        <Price
          price={productData.price}
          mounth={productData.month}
          dayPrice={productData.dayPrice}
          isHighlighted={isHighlighted}
        />
        <p className="mb-8 text-sm">{productData.description}</p>
        <div className="grid grid-rows-cardPrice">
          <div className="mb-10">
            <button
              className={`${isHighlighted ? "bg-secondary text-primary" : "text-secondary bg-violet-600"} h-12 w-full rounded px-6 font-medium`}
              onClick={() => {
                  handleAction({
                    productData,
                    filterName,
                  });            
              }}
              disabled={loading}
            >
              {filterName === "programmes" ? "Acheter" : "S'abonner"}
            </button>
            {filterName === "programmes" && (
              <AddToCartButton
                productData={productData}
                isHighlighted={isHighlighted}
              />
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
