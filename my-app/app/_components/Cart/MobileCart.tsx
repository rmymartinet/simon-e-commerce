"use client";

import { usePathname } from "next/navigation";
import useWindowWidth from "@/hooks/useWindowWidth";
import { useCart } from "@/app/context/CartContext";
import { FaCartShopping } from "react-icons/fa6";

const MobileCart = ({
  position,
  xPostion,
  yPostion,
}: {
  position?: string;
  xPostion?: string;
  yPostion?: string;
}) => {
  const pathname = usePathname();
  const { width } = useWindowWidth();
  const { cart } = useCart();

  const isDisplayNavBar =
    !/^\/studio/.test(pathname) &&
    pathname !== "/success" &&
    pathname !== "/cancel";

  return (
    <>
      {isDisplayNavBar && width < 1024 && (
        <div
          className={`${position} ${xPostion} ${yPostion} z-[9999] flex w-max flex-col`}
        >
          <div className="absolute -bottom-4 -right-4 grid h-6 w-6 place-content-center rounded-full bg-violet-400 text-sm text-white">
            {cart.length}
          </div>
          <FaCartShopping className="text-xl" color="white" />
        </div>
      )}
    </>
  );
};

export default MobileCart;
