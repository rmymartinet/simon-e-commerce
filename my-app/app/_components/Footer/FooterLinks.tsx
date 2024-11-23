import FooterLinkSection from "./FooterLinkSection";

const FooterLinks = () => {
  return (
    <div className="flex items-start gap-10">
      <FooterLinkSection
        title="Produits"
        links={["Fonctionnalités", "Tarifs"]}
      />
      <FooterLinkSection title="Entreprise" links={["Blog", "À propos"]} />
      <FooterLinkSection title="Ressources" links={["Légal"]} />
    </div>
  );
};

export default FooterLinks;
