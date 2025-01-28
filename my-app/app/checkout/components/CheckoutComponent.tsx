"use client";

import { useCart } from "@/app/context/CartContext";
import useHandleAction from "@/hooks/useHandleAction";
import { useRemoveItem } from "@/hooks/useRemoveItem";
import { CartItemProps } from "@/types/types";
import { Session } from "next-auth";
import Image from "next/image";
import { useEffect, useState } from "react";

function CheckoutComponent({ session }: { session: Session | null }) {
  const { cart } = useCart();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const { handleAction } = useHandleAction(session);
  const removeItem = useRemoveItem();

  const allProducts = cart.map((item: CartItemProps) => {
    return item;
  });

  useEffect(() => {
    const total = cart
      .flat()
      .reduce((acc, item) => acc + Number(item.price), 0);
    setTotalAmount(Number(total.toFixed(2)));
  }, [cart]);

  return (
    <section>
      <div className="mt-[20vh] flex w-full flex-col-reverse justify-center gap-40 overflow-hidden px-4 md:mt-[30vh] md:px-20 lg:grid lg:grid-cols-2">
        <div className="flex w-full flex-col gap-10 overflow-y-auto whitespace-nowrap">
          {cart.length > 0 ? (
            <>
              {cart.flat().map((item) => (
                <div
                  key={item.titlePlan}
                  className="flex h-[20vh] w-full items-start gap-10 border-b border-white pb-4"
                >
                  <div className="h-full w-[200px] bg-[#fafafa]">
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
                      <h3 className="text-md text-center font-normal">
                        {item.titlePlan}
                      </h3>
                      <p className="text-center text-base font-normal">
                        {item.price} €
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p>Quantité : 1</p>
                      <button
                        onClick={() => removeItem(item.titlePlan)}
                        className="mb-2 cursor-pointer text-sm underline"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <p>Votre panier est vide</p>
            </div>
          )}
        </div>
        <div className="hmax sticky bottom-0 flex w-full flex-col gap-8 px-2">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p>Total:</p>
              <p>{totalAmount},00 €</p>
            </div>
          </div>
          <button
            onClick={() => {
              handleAction({
                productData: allProducts,
                filterName: "programmes",
              });
            }}
            className={`w-full cursor-pointer px-4 py-3 text-black ${
              cart.length === 0 ? "cursor-not-allowed bg-white" : "bg-white"
            }`}
            disabled={cart.length === 0}
          >
            Payer
          </button>
        </div>
      </div>
    </section>
  );
}

export default CheckoutComponent;
