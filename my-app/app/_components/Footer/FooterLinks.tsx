import FooterLinkSection from "./FooterLinkSection";

const FooterLinks = () => {
  return (
    <div className="flex w-full flex-col items-start gap-20 lg:grid lg:grid-cols-4 lg:justify-items-start lg:gap-0">
      <h3 className="text-2xl font-semibold">S'M Coaching</h3>
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
