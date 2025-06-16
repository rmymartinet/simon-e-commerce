import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
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
            Vous n'avez pas encore de coaching actif. Activez votre abonnement
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


  return (
    <div className="mt-40 flex w-full flex-col items-center gap-10 px-4">
      <h1 className="text-4xl font-bold text-white">Abonnement</h1>
      <p className="text-gray-400">
        Détails de votre abonnement en cours
      </p>

      <div className="max-w-xl mx-auto mt-16 p-8 bg-white rounded-2xl shadow-lg flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6 text-violet-700">Votre période d&apos;abonnement</h1>
        <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
          <div className="flex-1 bg-violet-50 rounded-xl p-6 flex flex-col items-center shadow">
            <span className="text-gray-500 text-sm mb-2">Début</span>
            <span className="text-xl font-bold text-violet-700">
              {format(start, "dd MMMM yyyy", { locale: fr })}
            </span>
          </div>
          <div className="flex-1 bg-violet-50 rounded-xl p-6 flex flex-col items-center shadow">
            <span className="text-gray-500 text-sm mb-2">Fin</span>
            <span className="text-xl font-bold text-violet-700">
              {format(end, "dd MMMM yyyy", { locale: fr })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
