import { useCart } from "@/app/context/CartContext";
import { CartItemProps, useAddToCartProps } from "@/types/types";
import Swal from "sweetalert2";

export const useAddToCart = () => {
  const { cart, setCart } = useCart();

  const addToCart = ({
    type,
    id,
    titlePlan,
    img,
    price,
    month,
  }: useAddToCartProps) => {
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
      console.log("cart", cart);
      const newProduct = {
        type,
        id,
        titlePlan,
        price,
        month,
        img,
        quantity: 1,
      };
      cart.push(newProduct);
    }

    setCart([...cart]);
  };

  return addToCart;
};
