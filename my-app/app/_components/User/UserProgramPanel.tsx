import { UserDataProps } from "@/types/types";

const UserProgramPanel = ({ userData }: { userData: UserDataProps }) => {
  const selectProgramPurchase = userData.Purchase.filter(
    (purchase) => purchase.userPurchaseData,
  );

  return (
    <div className="program-button-container flex h-[40vh] flex-col gap-4 overflow-y-auto rounded-xl border-card p-6 lg:h-full">
      {selectProgramPurchase.length > 0 ? (
        selectProgramPurchase.map((purchase, index) => (
          <div
            key={index}
            className="program-button-container flex items-center justify-between rounded-xl border-card p-6"
          >
            <strong className="text-xl">
              {purchase.userPurchaseData?.titlePlan || "N/A"}
            </strong>
            <p>{purchase.amount / 100},00 €</p>
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
