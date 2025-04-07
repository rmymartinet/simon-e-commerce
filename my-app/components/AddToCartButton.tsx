import React from "react";
import { useAddToCart } from "@/hooks/useAddToCart";
import { AddToCartButtonProps, CartItemProps } from "@/types/types";

const AddToCartButton = ({
  productData,
  isHighlighted,
}: AddToCartButtonProps) => {
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
    <div className="tex relative mt-4 w-full">
      <button
        onClick={handleClick}
        className={`h-12 w-full rounded px-6 font-medium ${isHighlighted ? "bg-primary text-secondary" : "border border-[--border-color]"}`}
      >
        Ajouter au panier
      </button>
    </div>
  );
};

export default AddToCartButton;
