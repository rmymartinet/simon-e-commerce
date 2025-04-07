import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import UserDashboard from "@/components/User/UserDashboard";
import { getUserDashboardData } from "@/lib/getUserDashboard";
import { calculateNextPayment, formattedDate } from "@/utils/dateUtils";

export default async function Dashboard() {
  const { userData } = await getUserDashboardData();

  const allPurchases = userData.Purchase || [];
  const subscriptionPurchase = allPurchases.find((p) => p.subscriptionData);

  const subscriptionInfos = subscriptionPurchase
    ? {
        amount: (subscriptionPurchase.amount ?? 0) / 100,
        subscriptionPlan:
          subscriptionPurchase.subscriptionData?.titlePlan ?? "N/A",
        startDate: formattedDate(
          subscriptionPurchase.subscriptionData?.startDate,
        ),
        endDate: formattedDate(subscriptionPurchase.subscriptionData?.endDate),
        nextPaymentDate: calculateNextPayment(
          subscriptionPurchase.subscriptionData?.startDate,
          subscriptionPurchase.subscriptionData?.endDate,
        ),
        isSubscribed: true,
      }
    : {
        amount: 0,
        subscriptionPlan: "N/A",
        startDate: "N/A",
        endDate: "N/A",
        nextPaymentDate: "N/A",
        isSubscribed: false,
      };

  return (
    <div className="mt-40 flex min-h-screen flex-col gap-20 px-4 pb-40 lg:px-20">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2 font-semibold">
          <p className="text-violet-400">Votre dashboard</p>
          <h1 className="text-4xl font-black uppercase lg:text-6xl">
            Bonjour, {userData.name || "Utilisateur"}
          </h1>
          <form
            action={async () => {
              "use server";
              await auth.api.signOut({
                headers: await headers(),
              });
              redirect("/auth/signin");
            }}
          >
            <Button variant="blackBg" className="w-max">
              Déconnexion
            </Button>
          </form>
        </div>
        <p className="text-pretty lg:w-[30vw]">
          Bienvenue sur votre dashboard! Ici vous pourrez voir vos achats,
          abonnements en cours, et gérer votre profil.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-gray-900 p-4 shadow">
          <p className="text-sm text-gray-400">Abonnement</p>
          <p className="text-xl font-bold">
            {subscriptionInfos.subscriptionPlan}
          </p>
        </div>
        <div className="rounded-xl bg-gray-900 p-4 shadow">
          <p className="text-sm text-gray-400">Prochain paiement</p>
          <p className="text-xl font-bold">
            {subscriptionInfos.nextPaymentDate}
          </p>
        </div>
        <div className="rounded-xl bg-gray-900 p-4 shadow">
          <p className="text-sm text-gray-400">Montant</p>
          <p className="text-xl font-bold">
            {subscriptionInfos.amount.toFixed(2)} €
          </p>
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
