interface ItemsFeaturesProps {
  logo: React.ReactNode;
  title: string;
  paragraph: string;
}

const ItemsFeatures = ({ logo, title, paragraph }: ItemsFeaturesProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div>{logo}</div>
      <h2 className="text-2xl">{title}</h2>
      <p className="text-slate-400 text-pretty w-full lg:w-[24vw]">
        {paragraph}
      </p>
    </div>
  );
};

export default ItemsFeatures;
