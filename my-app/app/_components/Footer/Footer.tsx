import FooterContact from "./FooterContact";
import FooterHeader from "./FooterHeader";
import FooterLinks from "./FooterLinks";

const Footer = () => {
  return (
    <footer className="relative mt-8 flex min-h-screen flex-col items-start justify-between space-y-20 overflow-hidden bg-[#181818] px-6 py-4 text-center text-sm text-white lg:space-y-0">
      <FooterHeader />
      <FooterLinks />
      <FooterContact />
    </footer>
  );
};

export default Footer;
