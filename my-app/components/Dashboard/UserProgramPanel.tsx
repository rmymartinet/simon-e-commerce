import { UserDataProps } from "@/types/types";

const UserProgramPanel = ({ userData }: { userData: UserDataProps }) => {
  const selectProgramPurchase = userData.Purchase.filter(
    (purchase) => purchase.userPurchaseData,
  );

  return (
    <div className="flex h-[40vh] flex-col gap-0 overflow-y-auto rounded-xl border-card bg-gray-900 p-6 lg:h-full">
      <div className="mb-4 border-b border-slate-200 pb-6">
        <strong className="text-xl">Mes programmes</strong>
      </div>
      {selectProgramPurchase.length > 0 ? (
        selectProgramPurchase.map((purchase, index) => (
          <div
            key={index}
            className={`flex justify-between p-4 font-bold ${
              index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
            }`}
          >
            <strong className="text-xl">
              {purchase.userPurchaseData?.titlePlan || "N/A"}
            </strong>
            <p>{purchase.amount},00 €</p>
          </div>
        ))
      ) : (
        <div className="grid h-full w-full place-content-center">
          <p className="text-center">Aucun programme trouvé.</p>
        </div>
      )}
    </div>
  );
};

export default UserProgramPanel;
