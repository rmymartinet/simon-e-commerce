import FooterLinkSection from "./FooterLinkSection";

const FooterLinks = () => {
  return (
    <div className="grid grid-cols-2 gap-20 md:grid md:grid-cols-3">
      <FooterLinkSection
        title="Découvrir"
        links={["Tarifs", "Infos", "Blog"]}
      />
      <FooterLinkSection
        title="Social"
        links={["Instagram", "Tiktok", "Youtube", "Linkedin"]}
      />
      <FooterLinkSection
        title="Ressources"
        links={["Légal", "Termes et services"]}
      />
    </div>
  );
};

export default FooterLinks;
