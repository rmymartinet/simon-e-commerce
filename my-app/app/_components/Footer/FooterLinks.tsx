import FooterLinkSection from "./FooterLinkSection";

const FooterLinks = () => {
  return (
    <div className="flex flex-col gap-20 lg:gap-0 items-start lg:grid lg:grid-cols-4 lg:justify-items-start w-full">
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
