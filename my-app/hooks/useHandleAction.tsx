import { useRouter } from "next/navigation";
import { useCheckout } from "@/app/context/CheckoutContext";
import { CartItemProps, UserDataProps } from "@/types/types";
import { useEffect, useState } from "react";
import { usePayment } from "./usePayment";
import Swal from "sweetalert2";
import { Session } from "next-auth";

export default function useHandleAction(session: Session | null) {
  const [userData, setUserData] = useState<UserDataProps | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { handleCheckout } = usePayment({
    userData: userData || ({} as UserDataProps),
  });
  const { setCheckoutData } = useCheckout();

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        console.log("session?.user?.email", session?.user?.email);
        try {
          const res = await fetch(`/api/auth/userData`);
          const data = await res.json();
          setUserData(data);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (session?.user?.email) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [session]);

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
      case session && filterName === "coaching" && userData?.isSubscribed:
        Swal.fire({
          icon: "error",
          title: "Vous êtes déjà abonné",
          text: "Vous ne pouvez pas acheter un autre abonnement",
        });

        if (process.env.NODE_ENV === "development") {
          console.error("Vous êtes déjà abonné");
        }
        break;

      case session && filterName === "coaching":
        if (products[0].priceId) {
          handleCheckout(
            products[0].priceId,
            products[0].titlePlan,
            products[0].month,
            true,
            false,
          );
        } else if (process.env.NODE_ENV === "development") {
          console.error(
            `Le produit "${products[0].titlePlan}" n'a pas de priceId.`,
          );
        }
        break;

      case session && filterName === "programmes":
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
          } else if (process.env.NODE_ENV === "development") {
            console.error(`Le produit n'a pas de priceId.`);
          }
        } else if (process.env.NODE_ENV === "development") {
          console.error("Aucun produit valide trouvé.");
        }
        break;

      case !session && filterName === "coaching":
        router.push("/sign-in");
        break;
      case !session && filterName === "programmes":
        setCheckoutData({ productData: products[0], filterName });
        router.push("/choose-auth");
        break;

      default:
        if (process.env.NODE_ENV === "development") {
          console.error(
            `Le produit "${Array.isArray(productData) ? productData[0].titlePlan : productData.titlePlan}" n'a pas de priceId.`,
          );
        }
    }
  };

  return { handleAction, loading };
}
