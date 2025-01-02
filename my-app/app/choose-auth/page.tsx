"use client";

import { usePayment } from "@/hooks/usePayment";
import { LoginForm } from "../login/LoginForm";
import { useCheckout } from "../context/CheckoutContext";

const ChooseAuth = () => {
  const { handleCheckout } = usePayment();
  const { checkoutData } = useCheckout();

  const allPriceIds = checkoutData
    ? Object.values(checkoutData.productData).map(
        (product: { id: string }) => product.id,
      )
    : [];

  const allTitles = checkoutData
    ? Object.values(checkoutData.productData).map(
        (product: { titlePlan: string }) => product.titlePlan,
      )
    : [];

  const allMonths = checkoutData
    ? Object.values(checkoutData.productData).map(
        (product: { month: number }) => product.month,
      )
    : [];

  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl">
        Connectez-vous pour régler vos achats plus rapidement.
      </h1>
      <div className="mt-[10vh] flex w-full flex-col items-center justify-between px-4 lg:flex-row lg:px-[20vw]">
        <div className="program-button-container flex flex-col gap-2 rounded-xl p-4 lg:p-10">
          <LoginForm />
        </div>
        <div className="mt-10 h-[1px] w-full bg-slate-400 lg:mt-0 lg:h-[40vh] lg:w-[1px]"></div>
        <div className="mt-10 flex flex-col items-center gap-2 lg:mt-0">
          <h1 className="text-xl font-semibold">
            Vous n’avez pas de compte Sm Coaching
          </h1>
          <p className="text-center">
            Poursuivez ainsi. Vous créerez un compte Sm Coaching ultérieurement.
          </p>
          <button
            className="padding program-button-container mt-4 rounded-lg text-lg font-semibold"
            onClick={() => {
              if (allPriceIds) {
                handleCheckout(
                  allPriceIds,
                  allTitles,
                  allMonths[0],
                  false,
                  false,
                );
              } else {
                console.error("priceId is undefined");
              }
            }}
          >
            Continuer en tant qu&apos;invité
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChooseAuth;
