import { CartItemProps } from "@/types/types";
import useAuth from "./useAuth";
import { usePayment } from "./usePayment";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/app/context/CheckoutContext";

export const useHandleAction = () => {
  const { isAuthenticated, userData } = useAuth();
  const { handleCheckout } = usePayment();
  const { setCheckoutData } = useCheckout();

  const isSubscribed = userData?.isSubscribed;

  const router = useRouter();

  const handleAction = ({
    productData,
    filterName,
  }: {
    productData: CartItemProps[] | CartItemProps;
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

        console.error("Vous êtes déjà abonné");
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
          console.log("products", products);
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
        setCheckoutData({ productData: products[0], filterName });
        router.push("/choose-auth");
        break;

      default:
        console.error(
          `Le produit "${Array.isArray(productData) ? productData[0].titlePlan : productData.titlePlan}" n'a pas de priceId.`,
        );
    }
  };

  return { handleAction };
};
