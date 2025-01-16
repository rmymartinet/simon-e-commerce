import { useCart } from "@/app/context/CartContext";
import { CartItemProps } from "@/types/types";

export const useRemoveItem = () => {
  const { cart, setCart } = useCart();

  const removeItem = (titlePlan: string) => {
    const itemIndex = cart.findIndex(
      (item: CartItemProps) => item.titlePlan === titlePlan,
    );

    if (itemIndex !== -1) {
      const newCart = [...cart];
      newCart.splice(itemIndex, 1);
      setCart(newCart);
    }
  };

  return removeItem;
};
