"use client";

import UserDashboard from "@/components/Dashboard/UserDashboard";
import Image from "next/image";
import SignOutButton from "./SignOutButton";
import { Session } from "better-auth/types";
import { PurchaseItemProps, UserDataProps } from "@/types/types";

interface CustomSession extends Session {
  user: {
    image?: string;
    name?: string;
    email?: string;
  };
}

interface DashboardClientProps {
  userData: UserDataProps;
  session: CustomSession | null;
  subscriptionInfos: {
    amount: number;
    subscriptionPlan: string;
    startDate: string;
    endDate: string;
    nextPaymentDate: string;
    isSubscribed: boolean;
  };
  allPurchases: PurchaseItemProps[];
}

export default function DashboardClient({ userData, session, subscriptionInfos, allPurchases }: DashboardClientProps) {
  return (
    <div className="flex min-h-screen w-full flex-col gap-20 px-4 pb-40 md:mt-40 lg:px-20">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex w-full flex-col gap-4 font-semibold">
          <p className="text-violet-400">Votre dashboard</p>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-200">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold">
                  {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0)}
                </span>
              )}
            </div>
            <h1 className="text-4xl font-black uppercase lg:text-6xl">
              Bonjour, {userData.name || "Utilisateur"}
            </h1>
          </div>
          <div className="mt-10 flex flex-col-reverse items-start justify-between gap-6 md:flex-row md:items-center">
          <form className="flex w-full flex-col gap-2">
           
            <SignOutButton />
          
          </form>       
          <p className="text-pretty lg:w-[30vw]">
              Bienvenue sur votre dashboard! Ici vous pourrez voir vos achats,
              abonnements en cours, et gérer votre profil.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-gray-900 p-4 shadow">
          <p className="text-sm text-gray-400">Abonnement</p>
          <p className="text-xl font-bold">{subscriptionInfos.subscriptionPlan}</p>
        </div>
        <div className="rounded-xl bg-gray-900 p-4 shadow">
          <p className="text-sm text-gray-400">Prochain paiement</p>
          <p className="text-xl font-bold">{subscriptionInfos.nextPaymentDate}</p>
        </div>
        <div className="rounded-xl bg-gray-900 p-4 shadow">
          <p className="text-sm text-gray-400">Montant</p>
          <p className="text-xl font-bold">{subscriptionInfos.amount.toFixed(2)} €</p>
        </div>
      </div>

      <UserDashboard
        userData={userData}
        allPurchases={allPurchases}
        subscriptionInfos={subscriptionInfos}
      />
    </div>
  );
} 

