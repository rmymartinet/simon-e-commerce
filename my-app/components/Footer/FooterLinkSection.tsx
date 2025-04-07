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
      <h3 className="w-24 text-start font-medium uppercase text-gray-400">
        {title}
      </h3>
      <ul className="flex flex-col items-start gap-4 font-medium uppercase">
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
