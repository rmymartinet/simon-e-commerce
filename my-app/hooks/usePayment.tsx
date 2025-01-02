import useAuth from "./useAuth";
import useFetchUserData from "./useFetchUserData";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

export const usePayment = () => {
  const { userId } = useAuth();
  const { userData } = useFetchUserData();
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (
    priceId: string | string[],
    titlePlan: string | string[],
    month: number | number[],
    subscription: boolean,
    guest: boolean,
  ) => {
    setLoading(true);
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
          userId,
          priceId: priceIdsArray,
          subscription,
          guest,
          month,
          titlePlan: titlePlanArray,
          email: userData?.email,
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
      console.error("Error during checkout:", error);
      setError("An error occurred during checkout");
    } finally {
      setLoading(false);
    }
  };

  return { handleCheckout, loading, error };
};
