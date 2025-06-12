"use client";

import { usePayment } from "@/hooks/usePayment";
import { useRouter } from "next/navigation";
import { ProductDataProps } from "@/types/types";
import { authClient } from "@/lib/auth-client";
import { useCheckout } from "@/app/context/CheckoutContext";
import { useEffect } from "react";
import { Button } from "./ui/button";
const { useSession } = authClient;

const Guest = () => {
  const { handleCheckout } = usePayment();
  const { checkoutData } = useCheckout();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/auth/dashboard");
    }
  }, [session, router]);

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
        <Button 
          variant="default"
          className="w-full"
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
        </Button>
      </div>
    </section>
  );
};

export default Guest;
