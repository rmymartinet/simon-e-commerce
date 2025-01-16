import { useCart } from "@/app/context/CartContext";
import { FaCartShopping } from "react-icons/fa6";

//  right-5 top-10
const MobileCart = ({
  position,
  xPostion,
  yPostion,
}: {
  position?: string;
  xPostion?: string;
  yPostion?: string;
}) => {
  const { cart } = useCart();

  return (
    <div
      className={`${position} ${xPostion} ${yPostion} z-[9999] flex w-max flex-col`}
    >
      <div className="absolute -bottom-4 -right-4 grid h-6 w-6 place-content-center rounded-full bg-violet-400 text-sm text-white">
        {cart.length}
      </div>
      <FaCartShopping className="text-xl" color="white" />
    </div>
  );
};

export default MobileCart;
