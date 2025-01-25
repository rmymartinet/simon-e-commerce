import { UserDataProps } from "@/types/types";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

export const usePayment = ({ userData }: { userData?: UserDataProps } = {}) => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  );
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (
    priceId: string | string[],
    titlePlan: string | string[],
    month: number | number[],
    subscription: boolean,
    guest: boolean,
  ) => {
    setError(null);

    const priceIdsArray = Array.isArray(priceId) ? priceId : [priceId];
    const titlePlanArray = Array.isArray(titlePlan) ? titlePlan : [titlePlan];

    

    try {
      const response = await fetch(`/api/payments/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData?.id || undefined,
          priceId: priceIdsArray,
          subscription,
          guest,
          month,
          titlePlan: titlePlanArray,
          email: userData?.email || undefined,
        }),
      });

      const data = await response.json();

      if (data.sessionId) {
        const stripe = await stripePromise;
        await stripe?.redirectToCheckout({
          sessionId: data.sessionId,
        });
      } else {
        console.error("Failed to create checkout session");
        setError("Failed to create checkout session");
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error during checkout:", error);
      }
      setError("An error occurred during checkout");
    }
  };

  return { handleCheckout, error };
};
