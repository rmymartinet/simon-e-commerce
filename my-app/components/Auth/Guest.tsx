"use client";

import { usePayment } from "@/hooks/usePayment";
import { useRouter } from "next/navigation";
import { ProductDataProps, CartItemProps } from "@/types/types";
import { authClient } from "@/lib/auth-client";
import { useCheckout } from "@/app/context/CheckoutContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
const { useSession } = authClient;

const Guest = () => {
  const { handlePayment } = usePayment({});
  const { checkoutData } = useCheckout();
  const router = useRouter();
  const { data: session } = useSession();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (session) {
      router.push("/auth/dashboard");
    }
  }, [session, router]);

  const handleGuestCheckout = () => {
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Veuillez entrer votre email",
      });
      return;
    }
    if (checkoutData?.productData) {
      const cartItems: CartItemProps[] = Array.isArray(checkoutData.productData) 
        ? (checkoutData.productData as ProductDataProps[]).map(product => ({
            type: product.type,
            titlePlan: product.titlePlan,
            price: product.price,
            priceId: product.priceId,
            imageUrl: product.imageUrl,
            month: product.month,
            quantity: 1
          }))
        : [{
            type: (checkoutData.productData as ProductDataProps).type,
            titlePlan: (checkoutData.productData as ProductDataProps).titlePlan,
            price: (checkoutData.productData as ProductDataProps).price,
            priceId: (checkoutData.productData as ProductDataProps).priceId,
            imageUrl: (checkoutData.productData as ProductDataProps).imageUrl,
            month: (checkoutData.productData as ProductDataProps).month,
            quantity: 1
          }];

      handlePayment(cartItems, true, email);
    } else {
      console.error("Aucun produit sélectionné");
    }
  };

  return (
    <section className="flex w-full flex-col items-center justify-center md:gap-10">
      <div className="flex w-full flex-col items-center gap-4 text-center lg:mt-0">
        <Input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />
        <Button 
          variant="default"
          className="w-full"
          onClick={handleGuestCheckout}
        >
          Continuer en tant qu&apos;invité
        </Button>
      </div>
    </section>
  );
};

export default Guest;
