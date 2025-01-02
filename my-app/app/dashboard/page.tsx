"use client";

import { useState } from "react";
import { logout } from "../login/actions";
import Image from "next/image";
import useFecthUserData from "@/hooks/useFetchUserData";

export default function Dashboard() {
  const { userData } = useFecthUserData();
  const [isProgram, setIsProgram] = useState<string>("program");
  function calculateNextPayment(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const currentDate = new Date();

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return "Invalid Date";
    }

    if (currentDate < start) return start;
    if (currentDate > end) return "Abonnement expiré";

    const nextPaymentDate = new Date(start);

    while (nextPaymentDate <= currentDate) {
      nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
    }

    if (nextPaymentDate > end) return "Dernier paiement effectué";

    return nextPaymentDate;
  }

  const defaultSubscription = {
    amount: 0,
    subscriptionData: {
      subscriptionPlan: "N/A",
      startDate: "N/A",
      endDate: "N/A",
    },
  };
  const allPurchases = userData?.Purchase || [];
  const programPurchases = allPurchases.filter(
    (purchase) => purchase.userPurchaseData !== null,
  );

  //Parcour les données de l'utilisateur pour savoir si elle a un abonnement
  const subscriptionPurchase =
    allPurchases.find((purchase) => purchase.subscriptionData) ||
    defaultSubscription.subscriptionData;
  console.log(subscriptionPurchase);

  const formattedDate = (date: string) => {
    return new Date(date).toLocaleDateString("fr-FR");
  };

  const subscriptionInfos = {
    amount: subscriptionPurchase?.amount / 100 || defaultSubscription.amount,
    subscriptionData: {
      subscriptionPlan:
        subscriptionPurchase?.subscriptionData?.titlePlan ??
        defaultSubscription.subscriptionData.subscriptionPlan,
      startDate:
        formattedDate(subscriptionPurchase?.subscriptionData?.startDate) ||
        defaultSubscription.subscriptionData.startDate,
      endDate:
        formattedDate(subscriptionPurchase?.subscriptionData?.endDate) ||
        defaultSubscription.subscriptionData.endDate,
    },
    nextPaymentDate: calculateNextPayment(
      subscriptionPurchase?.subscriptionData?.startDate,
      subscriptionPurchase?.subscriptionData?.endDate,
    ),
  };

  console.log("ALLPURCHASE", allPurchases);

  return (
    <div>
      {userData ? (
        <div className="mt-40 flex flex-col gap-20 px-4 lg:px-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-2 font-semibold">
              <p className="text-violet-400">Votre dashboard</p>
              <h1 className="text-4xl font-black uppercase lg:text-6xl">
                Bonjour, {userData.name || "Utilisateur"}
              </h1>
              <button
                className="mt-4 w-max rounded-md bg-button-gradient px-4 py-2 font-bold text-white"
                onClick={() => logout()}
              >
                Déconnexion
              </button>
            </div>
            <p className="text-pretty lg:w-[30vw]">
              Bienvenue sur votre dashboard! Ici vous pourrez voir vos achats,
              abonnements en cours, et gérer votre profil.
            </p>
          </div>
          <div className="relative flex flex-col gap-10">
            <div className="absolute right-0 top-0 -z-10 h-[20%] w-[90%]">
              <Image
                src="/images/cube_mono.jpeg"
                alt=""
                width={2000}
                height={2000}
                className="h-max w-max object-contain"
              />
            </div>
            <div className="program-button-container flex flex-col rounded-xl p-10">
              <p className="mb-4 text-xl font-bold">Profil</p>
              <div className="flex items-center gap-2">
                <strong>Nom:</strong>
                <p>{userData.name || "N/A"}</p>
              </div>
              <div className="flex items-center gap-2">
                <strong>Email:</strong>
                <p>{userData.email || "N/A"}</p>
              </div>
              <button
                onClick={() => {}}
                className="w-max self-end rounded-md bg-button-gradient px-4 py-2 font-bold text-white"
              >
                Gérer
              </button>
            </div>

            <div className="program-button-container padding flex items-center gap-10 self-end rounded-xl">
              <button
                onClick={() => setIsProgram("program")}
                className={`padding ${isProgram === "program" ? "bg-button-gradient" : "bg-black opacity-50"} rounded-xl`}
              >
                Programme
              </button>
              <button
                onClick={() => setIsProgram("subscription")}
                className={`padding ${isProgram === "subscription" ? "bg-button-gradient" : "bg-black opacity-50"} rounded-xl`}
              >
                Abonnement
              </button>
            </div>

            <div className="relative flex flex-col-reverse gap-10 lg:grid lg:grid-cols-2">
              <div className="program-button-container relative flex h-[40vh] flex-col overflow-y-auto rounded-xl border-card pb-6 lg:h-full">
                <div className="p-6">
                  <strong className="text-xl">Historique</strong>
                </div>
                <div className="flex justify-between border-t border-slate-200 px-10 py-6">
                  <strong className="text-xl">Achat</strong>
                  <strong className="pr-12 text-xl">Date</strong>
                </div>
                <div className="px-6">
                  {allPurchases.length > 0 ? (
                    allPurchases.map((purchase, index) => (
                      <div
                        key={index}
                        className={`flex justify-between p-4 font-bold ${
                          index % 2 !== 0
                            ? "program-button-container rounded-md"
                            : "bg-inherit"
                        }`}
                      >
                        <p>
                          {purchase.subscriptionData?.titlePlan ||
                            purchase.userPurchaseData.titlePlan}
                          {purchase.subscriptionData ? " (abonnement)" : ""}
                        </p>
                        <p>
                          {purchase.subscriptionData?.startDate
                            ? new Date(
                                purchase.subscriptionData.startDate,
                              ).toLocaleDateString("fr-FR")
                            : new Date(purchase.createdAt).toLocaleDateString(
                                "fr-FR",
                              )}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center">Aucun achat trouvé.</p>
                  )}
                </div>
              </div>
              {isProgram === "program" ? (
                <div className="program-button-container flex h-[40vh] flex-col gap-4 overflow-y-auto rounded-xl border-card p-6 lg:h-full">
                  {programPurchases.length > 0 ? (
                    programPurchases.map((purchase, index: number) => (
                      <div
                        key={index}
                        className="program-button-container flex items-center justify-between rounded-xl border-card p-6"
                      >
                        <strong className="text-xl">
                          {purchase.userPurchaseData.titlePlan}
                        </strong>
                        <p>{purchase.amount / 100},00 €</p>
                      </div>
                    ))
                  ) : (
                    <div className="grid h-full w-full place-content-center">
                      <p className="text-center">Aucun programme trouvé.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="program-button-container rounded-xl border-card">
                  <div className="flex justify-between p-6">
                    <strong className="text-xl">Votre abonnement</strong>
                    {subscriptionInfos.nextPaymentDate ===
                    "Abonnement expiré" ? (
                      <div className="flex items-center gap-2 text-red-500">
                        <div className="h-3 w-3 animate-pulse rounded-full bg-red-600 transition-all duration-100"></div>
                        Aucun abonnement en cours
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-green-500">
                        <div className="h-3 w-3 animate-pulse rounded-full bg-green-600 transition-all duration-100"></div>
                        En cours
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 grid-rows-2 border-t">
                    <div className="flex h-[25vh] flex-col items-end justify-between border-b border-r border-slate-400 p-6">
                      <div className="self-start">
                        <p className="text-xl font-semibold">Plan actuel</p>
                        <p className="text-slate-200">(Avec engagement)</p>
                      </div>
                      <p className="text-5xl font-bold">
                        {subscriptionInfos.subscriptionData.subscriptionPlan}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between border-b border-slate-400 p-6">
                      <p className="self-start text-xl font-semibold">
                        Prochain paiement
                      </p>
                      <p className="text-3xl font-bold text-violet-300">
                        {typeof subscriptionInfos.nextPaymentDate === "string"
                          ? subscriptionInfos.nextPaymentDate
                          : subscriptionInfos.nextPaymentDate.toLocaleDateString(
                              "fr-FR",
                            )}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between border-b border-r border-slate-400 p-6">
                      <p className="self-start text-xl font-semibold">
                        Montant par mois
                      </p>
                      <div className="text-3xl font-bold text-violet-300 md:text-5xl">
                        {subscriptionInfos.amount === 0
                          ? subscriptionInfos.amount
                          : `${subscriptionInfos.amount}, 00€`}
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between border-b-2 border-slate-400 p-6">
                      <p className="self-start text-xl font-semibold">
                        Période d&apos;abonnement
                      </p>
                      <div className="flex flex-col gap-4 text-violet-300 md:flex-row">
                        <p className="text-center">
                          Début:{" "}
                          <span className="text-xl font-bold">
                            {subscriptionInfos.subscriptionData.startDate}
                          </span>
                        </p>
                        <p className="text-center text-violet-300">
                          Fin:{" "}
                          <span className="text-xl font-bold">
                            {subscriptionInfos.subscriptionData.endDate}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid h-screen place-content-center">
          {/* <h1 className="text-7xl font-bold">Chargement de vos données...</h1> */}
        </div>
      )}
    </div>
  );
}
