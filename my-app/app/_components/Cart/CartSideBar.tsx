"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useCart } from "../../context/CartContext";
import { IoClose } from "react-icons/io5";
import { useRemoveItem } from "@/hooks/useRemoveItem";
import { CartItemProps } from "@/types/types";
import Image from "next/image";
import useHandleAction from "@/hooks/useHandleAction";

gsap.registerPlugin(useGSAP);

const CartSideBar = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { cart, isOpen, setIsOpen } = useCart();
  const removeItem = useRemoveItem();
  const handleClose = () => {
    setIsOpen(false);
  };
  const { handleAction } = useHandleAction();

  useGSAP(() => {
    gsap.set(containerRef.current, { opacity: 0, width: "0%", height: "0%" });
  }, []);
  useGSAP(() => {
    if (isOpen) {
      gsap.to(containerRef.current, {
        width: "25vw",
        height: "55vh",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(containerRef.current, {
        width: "0%",
        height: "0%",
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [isOpen]);

  const allProducts = cart.map((item: CartItemProps) => {
    return item;
  });

  return (
    <div
      ref={containerRef}
      className="program-button-container fixed right-5 top-5 z-[99999] flex h-0 w-0 flex-col justify-end gap-6 rounded-xl p-6"
    >
      <button
        className="absolute left-5 top-5 grid h-7 w-7 place-content-center overflow-hidden rounded-full bg-button-gradient"
        onClick={handleClose}
      >
        <IoClose />
      </button>
      <div className="flex max-h-[34vh] w-full flex-col gap-4 self-center overflow-y-auto">
        {cart.map((item: CartItemProps, index: number) => (
          <div
            key={index}
            className="padding flex items-end justify-between rounded-xl border-2 border-slate-400"
          >
            <div className="relative flex w-full justify-between">
              <div className="h-[100px] overflow-hidden rounded-md">
                <Image
                  src={item.imageUrl || ""}
                  width={300}
                  height={300}
                  alt=""
                  className="h-full w-full rounded-md object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <strong className="text-xl"> {item.type}</strong>
                <span>{item.titlePlan}</span>
              </div>
              <div className="flex justify-end self-end">
                <span className="program-button-container rounded-md px-2 py-1 font-semibold">
                  {item.price} €
                </span>
              </div>
              <button
                className="absolute right-0 top-0 rounded-full bg-button-gradient p-1"
                onClick={() => removeItem(item.titlePlan)}
              >
                <strong className="">
                  <IoClose />
                </strong>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full flex-col gap-2 self-end rounded-xl">
        <div className="w-full">
          <button
            onClick={() => setIsOpen(false)}
            className="padding program-button-container w-full rounded-xl text-center"
          >
            Voir mon panier
          </button>
        </div>
        <div className="w-full">
          <button
            onClick={() => {
              setIsOpen(false);
              handleAction({
                productData: allProducts,
                filterName: "programmes",
              });
            }}
            className="padding w-full rounded-xl bg-button-gradient text-center"
          >
            Payer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSideBar;
