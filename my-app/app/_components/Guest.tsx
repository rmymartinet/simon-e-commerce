"use client";

import { usePayment } from "@/hooks/usePayment";
import { useCheckout } from "../context/CheckoutContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Guest = () => {
  const { handleCheckout } = usePayment();
  const { checkoutData } = useCheckout();
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/dashboard");
  }

  let allPriceIds: string[] = [];
  let allTitles: string[] = [];
  let allMonths: number[] = [];

  if (checkoutData) {
    if (Array.isArray(checkoutData.productData)) {
      allPriceIds = checkoutData.productData.map(
        (product: { priceId: string }) => product.priceId,
      );
      allTitles = checkoutData.productData.map(
        (product: { titlePlan: string }) => product.titlePlan,
      );
      allMonths = checkoutData.productData.map(
        (product: { month: number }) => product.month,
      );
    } else {
      allPriceIds = [checkoutData.productData.priceId || ""];
      allTitles = [checkoutData.productData.titlePlan];
      allMonths = [checkoutData.productData.month];
    }
  }

  return (
    <section className="flex w-full flex-col items-center justify-center md:gap-10">
      <div className="mt-10 flex flex-col items-center gap-2 text-center lg:mt-0">
        <h1 className="text-xl font-semibold">
          Vous n’avez pas de compte Sm Coaching
        </h1>
        <p className="text-center">
          Poursuivez ainsi. Vous créerez un compte Sm Coaching ultérieurement.
        </p>
        <button
          className="padding program-button-container mt-4 rounded-lg text-lg font-semibold"
          onClick={() => {
            if (allPriceIds) {
              handleCheckout(
                allPriceIds,
                allTitles,
                allMonths[0],
                false,
                false,
              );
            } else {
              console.error("priceId is undefined");
            }
          }}
        >
          Continuer en tant qu&apos;invité
        </button>
      </div>
    </section>
  );
};

export default Guest;
