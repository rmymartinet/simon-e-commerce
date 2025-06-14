import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { differenceInDays, format } from "date-fns";
import fr from "date-fns/locale/fr";

export default async function CalendarPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user) return null;

  const purchase = await prisma.purchase.findFirst({
    where: {
      userId: user.id,
      status: "paid",
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      subscriptionData: true,
    },
  });

  if (!purchase || !purchase.subscriptionData) {
    return (
      <div className="flex w-full flex-col items-center justify-center px-4 md:mt-40">
        <div className="max-w-md rounded-2xl border border-gray-700 bg-gray-900 p-8 text-center shadow-lg">
          <div className="mb-4 text-4xl text-yellow-400">⚠️</div>
          <h2 className="text-2xl font-semibold text-white">
            Aucun abonnement actif
          </h2>
          <p className="mt-2 text-gray-400">
            Vous n’avez pas encore de coaching actif. Activez votre abonnement
            pour accéder à votre suivi personnalisé et débloquer toutes les
            fonctionnalités !
          </p>
          <a
            href="/pricing?filter=coaching"
            className="mt-6 inline-block rounded-lg bg-violet-600 px-6 py-2 text-white transition hover:bg-violet-700"
          >
            Voir les offres
          </a>
        </div>
      </div>
    );
  }

  const start = new Date(purchase.subscriptionData.startDate);
  const end = new Date(purchase.subscriptionData.endDate);
  const now = new Date();

  const totalDays = differenceInDays(end, start);
  const passedDays = differenceInDays(now, start);
  const remainingDays = Math.max(differenceInDays(end, now), 0);
  const progress = Math.min(100, (passedDays / totalDays) * 100);

  return (
    <div className="mt-40 flex w-full flex-col items-center gap-10 px-4">
      <h1 className="text-4xl font-bold text-white">Abonnement</h1>
      <p className="mt-2 text-gray-400">
        Détails de votre abonnement en cours :
      </p>

      <div className="mt-10 space-y-4 text-white">
        <p>📅 Début : {format(start, "dd MMMM yyyy", { locale: fr })}</p>
        <p>⏳ Fin : {format(end, "dd MMMM yyyy", { locale: fr })}</p>
        <p>🧮 Temps restant : {remainingDays} jour(s)</p>

        <div className="relative mt-6 h-4 w-full overflow-hidden rounded-full bg-gray-800">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-400">
          {passedDays} jour(s) passé(s) / {totalDays} jours totaux
        </p>
      </div>
    </div>
  );
}
