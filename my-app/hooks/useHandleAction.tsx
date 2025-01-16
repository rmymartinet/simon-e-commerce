import { CartItemProps } from "@/types/types";
import useAuth from "./useAuth";
import { usePayment } from "./usePayment";
import useFecthUserData from "./useFetchUserData";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/app/context/CheckoutContext";

export const useHandleAction = () => {
  const { isAuthenticated } = useAuth();
  const { handleCheckout } = usePayment();
  const { userData } = useFecthUserData();
  const isSubscribed = userData?.isSubscribed;
  const router = useRouter();
  const { setCheckoutData } = useCheckout();

  const handleAction = ({
    productData,
    filterName,
  }: {
    productData: CartItemProps;
    filterName: string;
  }) => {
    const products = Array.isArray(productData) ? productData : [productData];

    if (!productData) {
      console.error("Aucun produit dans le panier.");
      return;
    }

    switch (true) {
      case isAuthenticated &&
        filterName === "coaching" &&
        isSubscribed === true:
        Swal.fire({
          icon: "error",
          title: "Vous êtes déjà abonné",
          text: "Vous ne pouvez pas acheter un autre abonnement",
        });
        break;

      case isAuthenticated && filterName === "coaching":
        if (products[0].priceId) {
          handleCheckout(
            products[0].priceId,
            products[0].titlePlan,
            products[0].month,
            true,
            false,
          );
        } else {
          console.error(
            `Le produit "${products[0].titlePlan}" n'a pas de priceId.`,
          );
        }
        break;

      case isAuthenticated && filterName === "programmes":
        if (products.length > 1) {
          const allPriceIds = products
            .map((product) => product.priceId)
            .filter((id): id is string => id !== undefined);
          const allTitles = products
            .map((product) => product.titlePlan)
            .filter((title): title is string => title !== undefined);

          handleCheckout(allPriceIds, allTitles, 0, false, false);
        } else if (products.length === 1) {
          const product = products[0];

          if (product.priceId) {
            handleCheckout(
              product.priceId,
              product.titlePlan,
              product.month,
              false,
              false,
            );
          } else {
            console.error(`Le produit n'a pas de priceId.`);
          }
        } else {
          console.error("Aucun produit valide trouvé.");
        }
        break;

      case !isAuthenticated && filterName === "coaching":
        router.push("/login");
        break;
      case !isAuthenticated && filterName === "programmes":
        setCheckoutData({ productData: productData, filterName });
        router.push("/choose-auth");
        break;

      default:
        console.error(
          `Le produit "${productData.titlePlan}" n'a pas de priceId.`,
        );
    }
  };

  return { handleAction };
};
