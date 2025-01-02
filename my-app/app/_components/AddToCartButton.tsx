import React from "react";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useCart } from "../context/CartContext";
import { AddToCartButtonProps } from "@/types/types";

const AddToCartButton = ({ productData }: AddToCartButtonProps) => {
  const addToCart = useAddToCart();
  const { setIsOpen } = useCart();

  console.log("productData", productData);

  const handleClick = () => {
    setIsOpen(true);
    addToCart({
      type: productData.type,
      id: productData.priceId,
      titlePlan: productData.titlePlan,
      price: productData.price,
      img: productData.imageUrl,
      month: productData.month,
    });
  };

  return (
    <div className="relative mt-4 w-full">
      <button
        onClick={handleClick}
        className="program-button-container padding w-full rounded-xl bg-button-gradient font-bold"
      >
        Ajouter au panier
      </button>
    </div>
  );
};

export default AddToCartButton;
