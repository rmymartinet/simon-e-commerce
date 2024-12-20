import FooterLinkSection from "./FooterLinkSection";

const FooterLinks = () => {
  return (
    <div className="flex flex-col items-start gap-20 md:flex-row">
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
