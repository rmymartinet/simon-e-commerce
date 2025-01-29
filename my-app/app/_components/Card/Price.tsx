const Price = ({
  price,
  mounth,
  dayPrice,
}: {
  price: number;
  mounth?: number;
  dayPrice?: string;
}) => (
  <div className="mb-10 flex flex-col gap-2">
    <div className="flex flex-1 items-center">
      <span className="mr-2 self-start text-2xl">€</span>
      <span className="mr-2 text-8xl font-semibold">{price}</span>
      {mounth !== 0 ? (
        <div className="self-end">
          <p>/ mois</p>
          <p className="text-sm font-semibold md:text-base">
            engagement {mounth} mois
          </p>
        </div>
      ) : (
        <p className="self-end text-sm font-semibold md:text-base">
          sans engagement
        </p>
      )}
    </div>
    {mounth !== 0 && (
      <div>
        <p className="mt-6 pl-2 text-base font-semibold text-[#E0AAFF]">
          À moins de {dayPrice} €/jour
        </p>
      </div>
    )}
  </div>
);

export default Price;
