interface FooterLinkSectionProps {
  title: string;
  links: string[];
}

const FooterLinkSection = ({ title, links }: FooterLinkSectionProps) => {
  return (
    <div className="flex gap-10 text-lg">
      <h4 className="text-[#696868] text-start w-24">{title}</h4>
      <ul className="flex flex-col items-start gap-2">
        {links.map((link, idx) => (
          <li key={idx}>{link}</li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinkSection;
