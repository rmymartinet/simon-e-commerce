import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { formatDistanceToNow, format } from "date-fns";
import fr from "date-fns/locale/fr";

export default async function CalendarPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user) return null;

  const purchase = await prisma.purchase.findFirst({
    where: {
      userId: user.id,
      status: "paid",
      subscriptionData: {
        not: null,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      subscriptionData: true,
    },
  });

  if (!purchase || !purchase.subscriptionData) {
    return <p className="mt-40 text-white">Aucun abonnement actif trouvé.</p>;
  }

  const start = purchase.subscriptionData.startDate;
  const end = purchase.subscriptionData.endDate;
  const now = new Date();

  const remaining = formatDistanceToNow(new Date(end), {
    addSuffix: true,
    locale: fr,
  });

  return (
    <div className="mt-40 px-6">
      <h1 className="text-4xl font-bold text-white">Abonnement</h1>
      <p className="mt-2 text-gray-400">
        Détails de votre abonnement en cours :
      </p>

      <div className="mt-10 space-y-4 text-white">
        <p>📅 Début : {format(start, "dd MMMM yyyy", { locale: fr })}</p>
        <p>⏳ Fin prévue : {format(end, "dd MMMM yyyy", { locale: fr })}</p>
        <p>🧮 Temps restant : {remaining}</p>
      </div>
    </div>
  );
}
