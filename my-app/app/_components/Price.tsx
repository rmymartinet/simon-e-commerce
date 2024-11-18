const Price = ({ price, mounth }: { price: string; mounth?: string }) => (
  <div className="flex flex-col gap-2">
    <div className="flex flex-1 items-center">
      <span className="self-start mr-2 text-2xl">€</span>
      <span className="text-8xl mr-2 font-semibold">{price}</span>
      <p className="self-end text-base">/ mois</p>
    </div>
    {mounth && (
      <p className="text-slate-300 text-sm">
        Valable sur une durée de {mounth}
      </p>
    )}
  </div>
);

export default Price;
