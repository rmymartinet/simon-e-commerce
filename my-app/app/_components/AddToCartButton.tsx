import React from "react";
import { useAddToCart } from "@/hooks/useAddToCart";
import { AddToCartButtonProps, CartItemProps } from "@/types/types";

const AddToCartButton = ({ productData }: AddToCartButtonProps) => {
  const addToCart = useAddToCart();

  const handleClick = () => {
    const cartItem: CartItemProps = {
      type: productData.type,
      titlePlan: productData.titlePlan,
      price: productData.price,
      priceId: productData.priceId,
      imageUrl: productData.imageUrl,
      month: productData.month,
      quantity: 1,
    };
    addToCart(cartItem);
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
