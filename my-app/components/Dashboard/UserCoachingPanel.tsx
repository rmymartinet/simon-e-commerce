import { SubscriptionInfosProps } from "@/types/types";

function UserCoachingPanel({
  subscriptionInfos,
}: {
  subscriptionInfos: SubscriptionInfosProps;
}) {
  return (
    <div className="overflow-hidden rounded-xl border-card bg-gray-900">
      <div className="flex flex-wrap justify-between p-6">
        <strong className="text-xl">Votre abonnement</strong>
        {subscriptionInfos.nextPaymentDate === "expired" ||
        subscriptionInfos.nextPaymentDate === "N/A" ? (
          <div className="flex items-center gap-2 text-red-500">
            <div className="duration-900 h-3 w-3 animate-pulse rounded-full bg-red-600 transition-all"></div>
            Aucun abonnement en cours
          </div>
        ) : (
          <div className="flex items-center gap-2 text-green-500">
            <div className="duration-900 h-3 w-3 animate-pulse rounded-full bg-green-600 transition-all"></div>
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
          <p className="text-3xl font-bold">
            {subscriptionInfos.subscriptionPlan}
          </p>
        </div>
        <div className="flex flex-col items-end justify-between border-b border-slate-400 p-6">
          <p className="self-start text-xl font-semibold">Prochain paiement</p>
          <p className="text-2xl font-bold text-violet-300">
            {subscriptionInfos.nextPaymentDate}
          </p>
        </div>
        <div className="flex flex-col items-end justify-between border-b border-r border-slate-400 p-6">
          <p className="self-start text-xl font-semibold">Montant par mois</p>
          <div className="text-3xl font-bold text-violet-300">
            {subscriptionInfos.amount === 0
              ? subscriptionInfos.amount
              : `${subscriptionInfos.amount}, 00€`}
          </div>
        </div>
        <div className="flex flex-col items-end justify-between border-b-2 border-slate-400 p-6">
          <p className="self-start text-xl font-semibold">
            Période d&apos;abonnement
          </p>
          <div className="flex flex-col gap-4 text-violet-300 md:flex-row flex-wrap">
            <p className="text-center">
              Début:{" "}
              <span className="text-lg md:text-xl font-bold break-words">
                {subscriptionInfos.startDate}
              </span>
            </p>
            <p className="text-center text-violet-300">
              Fin:{" "}
              <span className="text-lg md:text-xl font-bold break-words">
                {subscriptionInfos.endDate}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCoachingPanel;
