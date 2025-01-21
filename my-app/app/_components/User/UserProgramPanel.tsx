const UserProgramPanel = ({
  programPurchases,
}: {
  programPurchases: {
    userPurchaseData: { titlePlan: string };
    amount: number;
  }[];
}) => {
  return (
    <div className="program-button-container flex h-[40vh] flex-col gap-4 overflow-y-auto rounded-xl border-card p-6 lg:h-full">
      {programPurchases.length > 0 ? (
        programPurchases.map(
          (
            purchase: {
              userPurchaseData: { titlePlan: string };
              amount: number;
            },
            index: number,
          ) => (
            <div
              key={index}
              className="program-button-container flex items-center justify-between rounded-xl border-card p-6"
            >
              <strong className="text-xl">
                {purchase.userPurchaseData.titlePlan}
              </strong>
              <p>{purchase.amount / 100},00 €</p>
            </div>
          ),
        )
      ) : (
        <div className="grid h-full w-full place-content-center">
          <p className="text-center">Aucun programme trouvé.</p>
        </div>
      )}
    </div>
  );
};

export default UserProgramPanel;
