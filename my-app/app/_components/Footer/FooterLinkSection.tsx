interface FooterLinkSectionProps {
  title: string;
  links: string[];
}

const FooterLinkSection = ({ title, links }: FooterLinkSectionProps) => {
  return (
    <div className="flex gap-6 text-lg">
      <h4 className="w-24 text-start text-slate-200">{title}</h4>
      <ul className="flex flex-col items-start gap-2">
        {links.map((link, idx) => (
          <li key={idx}>{link}</li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinkSection;
