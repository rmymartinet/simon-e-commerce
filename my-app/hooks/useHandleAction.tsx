import { useRouter } from "next/navigation";
import { useCheckout } from "@/app/context/CheckoutContext";
import { BetterAuthSession, CartItemProps } from "@/types/types";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useCart } from "@/app/context/CartContext";
import Swal from "sweetalert2";
import {  useEffect, useState } from "react";

export default function useHandleAction(session: BetterAuthSession | null) {
  const router = useRouter();
  const { cart } = useCart();
  const addToCart = useAddToCart();
  const { setCheckoutData } = useCheckout();
  const [loading, setLoading] = useState(true);
  const [existingSubscription, setExistingSubscription] = useState(false);

  useEffect(() => {
    if (session) {
      const fetchSubscription = async () => {
        setLoading(true);
        const res = await fetch(`/api/user`);
        const data = await res.json();
        setExistingSubscription(data.isSubscribed ?? false);
        setLoading(false);
      };
      fetchSubscription();
    } else {
      setLoading(false);
    }
  }, [session]);

  const handleAction = async ({
    productData,
    filterName,
  }: {
    productData: CartItemProps[] | CartItemProps;
    filterName: string;
  }) => {
    setLoading(true);
    console.log("SESSION dans handleAction:", session);
    try {
      const products = Array.isArray(productData) ? productData : [productData];

      if (!productData) {
        console.error("Aucun produit dans le panier.");
        return;
      }

      switch (filterName) {
        case "coachings":
          if (!session) {
            // Non connecté
            redirectToSignup(products, filterName);
            return;
          }
          if (existingSubscription) {
            // Déjà abonné
            showAlreadySubscribedError();
            return;
          }
          if (cart.some(item => item.type?.toLowerCase().includes("coach"))) {
            // Déjà un coaching dans le panier
            showAlreadyInCartError();
            return;
          }
          // Cas OK : ajout au panier
          addToCartAndCheckout(products, filterName);
          return;

        case "programmes":
          if (!session) {
            redirectToChooseAuth(products, filterName);
            return;
          }
          // Cas OK : ajout au panier
          addToCartAndCheckout(products, filterName);
          return;

        default:
          // Autres produits
          addToCartAndCheckout(products, filterName);
          return;
      }
    } finally {
      setLoading(false);
    }
  };

  // Fonctions utilitaires pour la clarté
  function redirectToSignup(products: CartItemProps[], filterName: string) {
    setCheckoutData({ productData: products, filterName, total: products.reduce((acc, item) => acc + Number(item.price), 0) });
    const params = new URLSearchParams({ from: filterName, product: encodeURIComponent(JSON.stringify(products[0])) });
    router.push(`/auth/signup?${params.toString()}`);
  }

  function redirectToChooseAuth(products: CartItemProps[], filterName: string) {
    setCheckoutData({ productData: products, filterName, total: products.reduce((acc, item) => acc + Number(item.price), 0) });
    const params = new URLSearchParams({ from: filterName, product: encodeURIComponent(JSON.stringify(products[0])) });
    router.push(`/auth/choose-auth?${params.toString()}`);
  }

  function showAlreadySubscribedError() {
    Swal.fire({
      icon: "error",
      title: "Vous avez déjà un abonnement en cours.",
      text: "Vous ne pouvez pas acheter un nouveau coaching tant que votre abonnement est actif.",
    });
  }

  function showAlreadyInCartError() {
    Swal.fire({
      icon: "error",
      title: "Vous avez déjà une formule de coaching dans votre panier.",
      text: "Vous ne pouvez pas acheter deux coachings.",
    });
  }

  function addToCartAndCheckout(products: CartItemProps[], filterName: string) {
    products.forEach((product) => addToCart(product));
    setCheckoutData({ productData: products, filterName, total: products.reduce((acc, item) => acc + Number(item.price), 0) });
    router.push("/checkout");
  }

  return { handleAction, loading };
}
