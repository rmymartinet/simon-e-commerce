import { useRouter } from "next/navigation";
import { useCheckout } from "@/app/context/CheckoutContext";
import { CartItemProps } from "@/types/types";
import { BetterAuthSession } from "@/types/session";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useCart } from "@/app/context/CartContext";
import Swal from "sweetalert2";

export default function useHandleAction(session: BetterAuthSession | null) {
  const router = useRouter();
  const { cart } = useCart();
  const addToCart = useAddToCart();
  const { setCheckoutData } = useCheckout();


  const handleAction = ({
    productData,
    filterName,
  }: {
    productData: CartItemProps[] | CartItemProps;
    filterName: string;
  }) => {
    const products = Array.isArray(productData) ? productData : [productData];

    if (!productData) {
      console.error("Aucun produit dans le panier.");
      return;
    }

    if (session) {
      // Vérification pour les coachings
      if (filterName === "coachings") {
        const alreadyHasCoaching = cart.some(
          item => item.type && item.type.toLowerCase().includes("coach")
        );
        if (alreadyHasCoaching) {
          Swal.fire({
            icon: "error",
            title: "Vous avez déjà une formule de coaching dans votre panier.",
            text: "Vous ne pouvez pas acheter deux coachings.",
          });
          return;
        }
      }
      // Ajout au panier
      products.forEach((product) => addToCart(product));
      setCheckoutData({
        productData: products,
        filterName,
        total: products.reduce((acc, item) => acc + Number(item.price), 0),
      });
      router.push("/checkout");
      return;
    }

    // Cas utilisateur non connecté
    setCheckoutData({
      productData: products,
      filterName,
      total: products.reduce((acc, item) => acc + Number(item.price), 0),
    });

    const params = new URLSearchParams({
      from: filterName,
      product: encodeURIComponent(JSON.stringify(products[0])),
    });

    if (filterName === "coachings") {
      router.push(`/auth/signup?${params.toString()}`);
    } else if (filterName === "programmes") {
      router.push(`/auth/choose-auth?${params.toString()}`);
    }
  };

  return { handleAction };
}
