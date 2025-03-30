import FooterLinkSection from "./FooterLinkSection";

const FooterLinks = () => {
  const pageLinks = [
    {
      title: "Tarifs",
      link: "/pricing",
    },
    {
      title: "Infos",
      link: "/infos",
    },
    {
      title: "Blog",
      link: "/blog",
    },
  ];

  const socialLinks = [
    {
      title: "YouTube",
      link: "https://www.youtube.com/channel/UC9ZJ3JY2JQzr3v7e7vJ1J8A",
    },
    {
      title: "Instagram",
      link: "https://www.instagram.com/simonmrtz/",
    },
    {
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/simonmrtz/",
    },
    {
      title: "TikTok",
      link: "https://www.tiktok.com/@simonmrtnt",
    },
  ];

  const legalLinks = [
    {
      title: "Légal",
      link: "/legal",
    },
    {
      title: "Termes et services",
      link: "/terms",
    },
  ];

  return (
    <div className="flex flex-wrap gap-20 md:grid md:grid-cols-3">
      <FooterLinkSection title="Découvrir" links={pageLinks} />
      <FooterLinkSection title="Social" links={socialLinks} />
      <FooterLinkSection title="Ressources" links={legalLinks} />
    </div>
  );
};

export default FooterLinks;
