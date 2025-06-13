import { UserDataProps } from "@/types/types";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";

export const usePayment = ({ userData }: { userData?: UserDataProps } = {}) => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePayment = async (
    priceId: string | string[],
    titlePlan: string | string[],
    month: number | number[],
    subscription: boolean,
    guest: boolean,
    email?: string,
  ) => {
    setError(null);
    setLoading(true);

    console.log("userData", userData); 

    try {
      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        throw new Error("Configuration Stripe manquante");
      }

      const requestBody = {
        userId: userData?.id,
        priceId: Array.isArray(priceId) ? priceId : [priceId],
        titlePlan: Array.isArray(titlePlan) ? titlePlan : [titlePlan],
        month,
        subscription,
        guest,
        email: email || userData?.email,
      };


      const response = await fetch(`/api/payments/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();


      if (!response.ok) {
        console.error("Erreur de réponse:", data);
        throw new Error(data.error || "Erreur lors de la création de la session");
      }

      if (data.sessionId) {
        const stripe = await stripePromise;
        if (!stripe) {
          throw new Error("Impossible de charger Stripe");
        }
        await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });
      } else {
        throw new Error("Session ID manquant");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Une erreur est survenue";
      console.error("Erreur de paiement:", error);
      setError(message);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return { handlePayment, error, loading };
};
