import { useCart } from "@/app/context/CartContext";
import { CartItemProps } from "@/types/types";
import Swal from "sweetalert2";

export const useAddToCart = () => {
  const { cart, setCart } = useCart();

  const addToCart = (item: CartItemProps) => {
    const isSubscription = item.type && item.type.toLowerCase().includes("coach"); // ou autre logique pour détecter l'abonnement
    const cartHasSubscription = cart.some(
      (p) => p.type && p.type.toLowerCase().includes("coach")
    );
    const cartHasOneShot = cart.some(
      (p) => !p.type || !p.type.toLowerCase().includes("coach")
    );

    // Cas 1 : On veut ajouter un abonnement alors qu'il y a déjà un produit unique
    if (isSubscription && cartHasOneShot) {
      Swal.fire({
        icon: "error",
        title: "Panier incompatible",
        text: "Vous ne pouvez pas acheter un abonnement et un produit unique en même temps.",
      });
      return;
    }

    // Cas 2 : On veut ajouter un produit unique alors qu'il y a déjà un abonnement
    if (!isSubscription && cartHasSubscription) {
      Swal.fire({
        icon: "error",
        title: "Panier incompatible",
        text: "Vous ne pouvez pas acheter un abonnement et un produit unique en même temps.",
      });
      return;
    }

    // ... logique d'ajout normale ...
    cart.push(item);
    setCart([...cart]);
  };

  return addToCart;
};
