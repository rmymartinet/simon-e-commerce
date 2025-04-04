import { auth } from "@/app/_lib/auths";
import { signOut } from "@/app/_lib/auths";
import { redirect } from "next/navigation";
import UserDashboard from "@/app/_components/User/UserDashboard";
import { prisma } from "@/app/_lib/prisma";

export default async function Dashboard() {
  const session = await auth();

  if (!session || !session.user) return redirect("/sign-in");

  const userData = await prisma.user.findUnique({
    where: { email: session.user.email ?? undefined },
    include: {
      Purchase: {
        select: {
          id: true,
          amount: true,
          createdAt: true,
          userPurchaseData: true,
          subscriptionData: true,
        },
      },
    },
  });

  if (!userData) {
    document.cookie =
      "next-auth.session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie =
      "next-auth.csrf-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";

    return redirect("/sign-in");
  }

  function formattedDate(date: Date | string | undefined) {
    return date ? new Date(date).toLocaleDateString("fr-FR") : undefined;
  }

  function calculateNextPayment(
    startDate: Date | string | undefined,
    endDate: Date | string | undefined,
  ) {
    const start = startDate ? new Date(startDate) : new Date();
    const end = endDate ? new Date(endDate) : new Date();
    const currentDate = new Date();

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return "Invalid Date";
    }

    if (currentDate < start) return start.toLocaleDateString("fr-FR");
    if (currentDate > end) return "expired";

    const nextPaymentDate = new Date(start);

    while (nextPaymentDate <= currentDate) {
      nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
    }

    if (nextPaymentDate > end) return "expired";

    return nextPaymentDate.toLocaleDateString("fr-FR");
  }
  const allPurchases = userData?.Purchase || [];

  const subscriptionPurchase =
    allPurchases.find((purchase) => purchase.subscriptionData) || null;

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

  if (!userData)
    return (
      <div className="grid h-screen place-content-center">
        <div className="animate-pulse duration-150 ease-linear">
          Chargement...
        </div>
      </div>
    );
  return (
    <div className="mt-40 flex min-h-screen flex-col gap-20 px-4 lg:px-20">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2 font-semibold">
          <p className="text-violet-400">Votre dashboard</p>
          <h1 className="text-4xl font-black uppercase lg:text-6xl">
            Bonjour, {userData?.name || userData?.firstName || "Utilisateur"}
          </h1>

          <form
            method="post"
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/sign-in" });
            }}
            className="mt-4 w-max cursor-pointer rounded-md bg-button-gradient px-4 py-2 font-bold text-white"
          >
            <button type="submit">Déconnexion</button>
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
        subscriptionInfos={subscriptionInfos}
      />
    </div>
  );
}
