"use client";

import { useCart } from "@/app/context/CartContext";

const ClearCartComponent = () => {
  const { clearCart } = useCart();

  clearCart();
  return null;
};

export default ClearCartComponent;
