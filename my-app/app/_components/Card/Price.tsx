const Price = ({
  price,
  mounth,
  dayPrice,
}: {
  price: string;
  mounth?: string;
  dayPrice?: string;
}) => (
  <div className="flex flex-col gap-2">
    <div className="flex flex-1 items-center">
      <span className="mr-2 self-start text-2xl">€</span>
      <span className="mr-2 text-8xl font-semibold">{price}</span>
      {mounth ? (
        <p className="self-end text-base">/ mois</p>
      ) : (
        <p className="self-end text-base">Disponible à vie</p>
      )}
    </div>
    {mounth && (
      <div>
        <p className="pl-2 text-base font-semibold text-[#E0AAFF]">
          À moins de {dayPrice} €/jour
        </p>
      </div>
    )}
  </div>
);

export default Price;
