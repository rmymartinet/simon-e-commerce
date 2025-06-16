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
    try {
      const products = Array.isArray(productData) ? productData : [productData];

      if (!productData) {
        console.error("Aucun produit dans le panier.");
        return;
      }

      // Cas non connecté
      if (!session && filterName === "coachings") {
        setCheckoutData({
          productData: products,
          filterName,
          total: products.reduce((acc, item) => acc + Number(item.price), 0),
        });
        const params = new URLSearchParams({
          from: filterName,
          product: encodeURIComponent(JSON.stringify(products[0])),
        });
        router.push(`/auth/signup?${params.toString()}`);
        return;
      }

      // Cas déjà abonné
      if (existingSubscription && filterName === "coachings") {
        Swal.fire({
          icon: "error",
          title: "Vous avez déjà un abonnement en cours.",
          text: "Vous ne pouvez pas acheter un nouveau coaching tant que votre abonnement est actif.",
        });
        return;
      }

      // Cas pas abonné mais déjà un coaching dans le panier
      if (!existingSubscription && filterName === "coachings") {
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
        // Ajout au panier et redirection
        products.forEach((product) => addToCart(product));
        setCheckoutData({
          productData: products,
          filterName,
          total: products.reduce((acc, item) => acc + Number(item.price), 0),
        });
        router.push("/checkout");
        return;
      }

      // Cas général (autres produits, ou programmes)
      setCheckoutData({
        productData: products,
        filterName,
        total: products.reduce((acc, item) => acc + Number(item.price), 0),
      });


      const params = new URLSearchParams({
        from: filterName,
        product: encodeURIComponent(JSON.stringify(products[0])),
      });

      if (filterName === "programmes") {
        console.log("PROGRAMMES")
        router.push(`/auth/choose-auth?${params.toString()}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleAction, loading };
}
