"use client";

import { useCart } from "@/app/context/CartContext";
import TitleComponent from "@/components/TitleComponent";
import { Button } from "@/components/ui/button";
import { usePayment } from "@/hooks/usePayment";
import { useRemoveItem } from "@/hooks/useRemoveItem";
import { BetterAuthSession, UserDataProps } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";

function CheckoutComponent({ session }: { session: BetterAuthSession | null }) {
  const { cart } = useCart();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const removeItem = useRemoveItem();
  const { handlePayment } = usePayment();


  const isGuest = !session?.user?.email;

const [userData, setUserData] = useState<UserDataProps | null>(null);

  useEffect(()=>{
    const fetchUser = async () => {
      const res = await fetch("/api/user");
      const data = await res.json();
      setUserData(data);
    };

    fetchUser();
  },[])

  useEffect(() => {
    const total = cart
      .flat()
      .reduce((acc, item) => acc + Number(item.price), 0);
    setTotalAmount(Number(total.toFixed(2)));
  }, [cart]);

  return (
    <section className="mt-[20vh]">
      <TitleComponent
        title="Votre panier"
        titleIndication="panier"
        subtitle="Vos futures achat"
      />
      <div className="mt-[10vh] flex w-full flex-col justify-center gap-20 overflow-hidden px-4 md:px-20 lg:grid lg:grid-cols-2">
        <div className="flex w-full flex-col gap-10 overflow-y-auto whitespace-nowrap">
          {cart.length > 0 ? (
            <>
              {cart.flat().map((item) => (
                <div
                  key={item.titlePlan}
                  className="flex h-[20vh] w-full items-start gap-6 rounded-xl border border-white/10 bg-[--card-bg] p-4 shadow-md"
                >
                  <div className="h-full w-[150px] overflow-hidden rounded-lg bg-[#fafafa]">
                    <Image
                      width={300}
                      height={300}
                      src={item.imageUrl || ""}
                      alt={item.titlePlan}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex h-full w-full flex-col justify-between">
                    <div className="flex w-full items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">
                        {item.titlePlan}
                      </h3>
                      <p className="text-base font-medium text-gray-300">
                        {item.price} €
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
                      <p>Quantité : 1</p>
                      <button
                        onClick={() => removeItem(item.titlePlan)}
                        className="text-red-400 underline hover:text-red-600"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-[--card-bg] p-10 text-center">
              <p className="text-lg font-medium">🛒 Votre panier est vide</p>
              <p className="mt-2 text-sm text-gray-400">
                Ajoutez des programmes ou du coaching pour continuer.
              </p>
            </div>
          )}
        </div>

        <div className="sticky top-[20vh] flex w-full flex-col gap-8 rounded-xl border border-white/10 bg-[--card-bg] p-8 shadow-md">
          <h2 className="text-xl font-semibold">Résumé de votre commande</h2>
          <div className="flex items-center justify-between text-lg">
            <span>Total :</span>
            <span>{totalAmount.toFixed(2)} €</span>
          </div>

          <Button
      variant="blackBg"
      onClick={() => {
        if (!userData) return;
        handlePayment(
          cart.map((item) => item.priceId).filter((id): id is string => !!id),
          cart.map((item) => item.titlePlan).filter((title): title is string => !!title),
          cart[0]?.month,
          userData.isSubscribed,
          isGuest,         
          session?.user?.email,
        );
      }}
      disabled={cart.length === 0 || !userData}
    >
      Procéder au paiement
    </Button>
        </div>
      </div>
    </section>
  );
}

export default CheckoutComponent;
