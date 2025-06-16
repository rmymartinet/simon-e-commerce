"use client";

import { useCart } from "@/app/context/CartContext";
import TitleComponent from "@/components/TitleComponent";
import { Button } from "@/components/ui/button";
import { usePayment } from "@/hooks/usePayment";
import { BetterAuthSession, UserDataProps } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoAdd, IoRemove, IoTrash } from "react-icons/io5";

function CheckoutComponent({ session }: { session: BetterAuthSession | null }) {
  const [userData, setUserData] = useState<UserDataProps | null>(null);
  const { cart, removeItem, updateCartQuantity } = useCart();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const { handlePayment } = usePayment({ userData: userData || undefined });

  const isGuest = !session?.user?.email;

  useEffect(()=>{
    const fetchUser = async () => {
      const res = await fetch("/api/user");
      const data = await res.json();
      setUserData(data);
    };

    fetchUser();
  },[])

  useEffect(() => {
    const total = cart.reduce((acc, item) => 
      acc + (Number(item.price) * (item.quantity || 1)), 0
    );
    setTotalAmount(Number(total.toFixed(2)));
  }, [cart]);

  const handleQuantityChange = (priceId: string, change: number) => {
    const item = cart.find(item => item.priceId === priceId);
    if (item) {
      const newQuantity = (item.quantity || 1) + change;
      if (newQuantity > 0) {
        updateCartQuantity(priceId, newQuantity);
      }
    }
  };

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
              {cart.map((item) => (
                <div
                  key={item.priceId}
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
                        {(item.price * (item.quantity || 1)).toFixed(2)} €
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleQuantityChange(item.priceId!, -1)}
                          className="rounded-full p-1 hover:bg-white/10"
                          disabled={!item.quantity || item.quantity <= 1}
                        >
                          <IoRemove className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity || 1}</span>
                        <button
                          onClick={() => handleQuantityChange(item.priceId!, 1)}
                          className="rounded-full p-1 hover:bg-white/10"
                        >
                          <IoAdd className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.priceId!)}
                        className="flex items-center gap-1 text-red-400 hover:text-red-600"
                      >
                        <IoTrash className="h-4 w-4" />
                        <span>Supprimer</span>
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
            variant="whiteBg"
            className="w-full"
            onClick={() => {
              if (!userData) return;
              handlePayment(
                cart,
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
