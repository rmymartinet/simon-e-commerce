const FooterLinkSection = ({
  title,
  links,
}: {
  title: string;
  links: string[];
}) => {
  return (
    <div className="flex flex-col gap-6 text-lg">
      <h4 className="w-24 text-start text-xl font-bold text-slate-200">
        {title}
      </h4>
      <ul className="flex flex-col items-start gap-4 font-medium">
        {links.map((link, idx) => (
          <li key={idx}>{link}</li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinkSection;
