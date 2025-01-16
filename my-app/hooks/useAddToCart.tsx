import { useCart } from "@/app/context/CartContext";
import { CartItemProps } from "@/types/types";
import Swal from "sweetalert2";

export const useAddToCart = () => {
  const { cart, setCart } = useCart();

  const addToCart = ({
    type,
    titlePlan,
    imageUrl,
    price,
    priceId,
    month,
  }: CartItemProps) => {
    const isExistingProduct = cart.findIndex(
      (item: CartItemProps) => item.price === price,
    );

    if (isExistingProduct >= 0) {
      Swal.fire({
        icon: "error",
        title: "Produit déjà dans le panier",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const newProduct = {
        type,
        titlePlan,
        price,
        priceId,
        month,
        imageUrl,
        quantity: 1,
      };
      cart.push(newProduct);
    }

    setCart([...cart]);
  };

  return addToCart;
};
