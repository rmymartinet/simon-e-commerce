import Link from "next/link";

const FooterLinkSection = ({
  title,
  links,
}: {
  title: string;
  links: { title: string; link: string }[];
}) => {
  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <h3 className="w-24 text-start text-lg font-medium text-slate-200 lg:text-2xl">
        {title}
      </h3>
      <ul className="flex flex-col items-start gap-2 text-lg font-medium text-muted lg:gap-4 lg:text-2xl">
        {links.map((link, idx) => (
          <li key={idx}>
            <Link href={link.link}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinkSection;
