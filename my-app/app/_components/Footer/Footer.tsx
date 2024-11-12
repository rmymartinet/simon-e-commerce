import FooterContact from "./FooterContact";
import FooterHeader from "./FooterHeader";
import FooterLinks from "./FooterLinks";

const Footer = () => {
  return (
    <footer className="relative min-h-screen bg-[#181818] mt-8 py-4 text-center text-white text-sm overflow-hidden flex flex-col items-start justify-between px-6 space-y-20 lg:space-y-0">
      <FooterHeader />
      <FooterLinks />
      <FooterContact />
    </footer>
  );
};

export default Footer;
