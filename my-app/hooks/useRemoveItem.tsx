import { useCart } from "@/app/context/CartContext";
import { CartItemProps } from "@/types/types";

export const useRemoveItem = () => {
  const { cart, setCart } = useCart();

  const removeItem = (titlePlan: string) => {
    const findItem = cart.find(
      (item: CartItemProps) => item.titlePlan === titlePlan,
    );

    if (findItem) {
      const newCart = [...cart];
      newCart.splice(findItem, 1);
      setCart(newCart);
    }
  };

  return removeItem;
};
