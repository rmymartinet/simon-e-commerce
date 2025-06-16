import { PurchaseItemProps } from "@/types/types";

const UserPurchaseHistory = ({
  allPurchases,
}: {
  allPurchases: PurchaseItemProps[];
}) => {
  return (
    <div className="relative flex h-[40vh] flex-col overflow-y-auto rounded-xl border-card bg-gray-900 pb-6 lg:h-full">
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
                index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
              }`}
            >
              <p>
                {purchase.subscriptionData?.titlePlan ||
                  purchase.userPurchaseData?.titlePlan}
                {purchase.subscriptionData ? " (abonnement)" : ""}
              </p>
              <p>
                {purchase.subscriptionData?.startDate
                  ? new Date(
                      purchase.subscriptionData.startDate,
                    ).toLocaleDateString("fr-FR")
                  : new Date(purchase.createdAt).toLocaleDateString("fr-FR")}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center">Aucun achat trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default UserPurchaseHistory;
