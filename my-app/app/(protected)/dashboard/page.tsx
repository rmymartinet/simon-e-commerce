import { auth } from "@/auth";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import UserDashboard from "@/app/_components/User/UserDashboard";
import { prisma } from "@/app/_lib/prisma";

export default async function Dashboard() {
  const session = await auth();

  if (!session || !session.user) return redirect("/login");

  const userData = await prisma.user.findUnique({
    where: {
      email: session.user.email || undefined,
    },
    include: {
      Purchase: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  console.log(userData);

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
    (purchase: { userPurchaseData: { titlePlan: string } }) =>
      purchase.userPurchaseData !== null,
  );

  interface Purchase {
    subscriptionData?: {
      titlePlan: string;
      startDate: string;
      endDate: string;
      amount: number; // Ajout de la propriété 'amount' ici
    };
    userPurchaseData: {
      titlePlan: string;
    };
    createdAt: string;
    amount: number;
  }

  const subscriptionPurchase =
    allPurchases.find((purchase: Purchase) => purchase.subscriptionData) ||
    defaultSubscription.subscriptionData;

  function formattedDate(date: string | undefined) {
    return date ? new Date(date).toLocaleDateString("fr-FR") : undefined;
  }

  // Vérification des données avant d'y accéder
  const subscriptionInfos = {
    amount: subscriptionPurchase?.amount / 100 || defaultSubscription.amount, // Assure-toi que amount est accessible
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

  return (
    <div className="mt-40 flex flex-col gap-20 px-4 lg:px-20">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2 font-semibold">
          <p className="text-violet-400">Votre dashboard</p>
          <h1 className="text-4xl font-black uppercase lg:text-6xl">
            Bonjour, {userData?.name || "Utilisateur"}
          </h1>

          <form
            action={async () => {
              "use server";
              await signOut();
            }}
            className="mt-4 w-max cursor-pointer rounded-md bg-button-gradient px-4 py-2 font-bold text-white"
          >
            Déconnexion
          </form>
        </div>
        <p className="text-pretty lg:w-[30vw]">
          Bienvenue sur votre dashboard! Ici vous pourrez voir vos achats,
          abonnements en cours, et gérer votre profil.
        </p>
      </div>
      <UserDashboard
        userData={userData}
        allPurchases={allPurchases}
        programPurchases={programPurchases}
        subscriptionInfos={subscriptionInfos}
      />
    </div>
  );
}
