const FooterLinkSection = ({
  title,
  links,
}: {
  title: string;
  links: string[];
}) => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="w-24 text-start text-2xl font-medium text-slate-200">
        {title}
      </h3>
      <ul className="flex flex-col items-start gap-4 text-2xl font-medium text-muted">
        {links.map((link, idx) => (
          <li key={idx}>{link}</li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinkSection;
