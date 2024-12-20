const Price = ({
  price,
  mounth,
  dayPrice,
}: {
  price: string;
  mounth?: number;
  dayPrice?: string;
}) => (
  <div className="flex flex-col gap-2">
    <div className="flex flex-1 items-center">
      <span className="mr-2 self-start text-2xl">€</span>
      <span className="mr-2 text-8xl font-semibold">{price}</span>
      {mounth ? (
        <div className="self-end">
          <p className="text-base">/ mois</p>
          <p className="tex text-base">engagement {mounth} mois</p>
        </div>
      ) : (
        <p className="self-end text-base">sans engagement</p>
      )}
    </div>
    {mounth && (
      <div>
        <p className="mt-6 pl-2 text-base font-semibold text-[#E0AAFF]">
          À moins de {dayPrice} €/jour
        </p>
      </div>
    )}
  </div>
);

export default Price;
