"use client";

import { usePayment } from "@/hooks/usePayment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ProductDataProps } from "@/types/types";
import { useCheckout } from "@/app/context/CheckoutContext";

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
        (product: ProductDataProps) => product.priceId || "",
      );
      allTitles = checkoutData.productData.map(
        (product: ProductDataProps) => product.titlePlan || "",
      );
      allMonths = checkoutData.productData.map(
        (product: ProductDataProps) => product.month || 0,
      );
    } else {
      allPriceIds = [
        (checkoutData.productData as ProductDataProps).priceId || "",
      ];
      allTitles = [(checkoutData.productData as ProductDataProps).titlePlan];
      allMonths = [(checkoutData.productData as ProductDataProps).month];
    }
  }

  return (
    <section className="flex w-full flex-col items-center justify-center md:gap-10">
      <div className="flex w-full flex-col items-center gap-2 text-center lg:mt-0">
        <button
          className="mt-4 w-full rounded-full border px-2 py-1 font-semibold lg:px-4 lg:py-2"
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
