const Price = ({ price, mounth }: { price: string; mounth?: string }) => (
  <div className="flex flex-col gap-2">
    <div className="flex flex-1 items-center">
      <span className="mr-2 self-start text-2xl">€</span>
      <span className="mr-2 text-8xl font-semibold">{price}</span>
      <p className="self-end text-base">/ mois</p>
    </div>
    {mounth && (
      <p className="text-sm text-slate-300">
        Valable sur une durée de {mounth}
      </p>
    )}
  </div>
);

export default Price;
