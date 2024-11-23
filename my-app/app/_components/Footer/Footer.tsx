import FooterContact from "./FooterContact";
import FooterLinks from "./FooterLinks";

const Footer = () => {
  return (
    <footer className="footer-glassmorph relative mt-40 flex min-h-[90vh] w-full flex-col justify-between px-10 py-10 text-sm text-white lg:px-40 lg:py-10">
      <div className="animate-bg-purple absolute bottom-0 right-0 -z-20 h-[80%] w-full" />
      <div className="flex flex-col items-center gap-40">
        <h1 className="text-5xl font-bold uppercase md:text-8xl lg:text-[12rem]">
          SM Coaching
        </h1>
        <div className="flex flex-col gap-2"></div>
      </div>
      <div className="flex flex-col justify-between gap-20">
        <div className="flex flex-col justify-between gap-20 lg:flex-row lg:gap-0">
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl">Commencer dès maintenant</h1>
            <button className="h-max w-max rounded-lg bg-button p-2 px-4 font-semibold">
              Commencer
            </button>
          </div>
          <FooterLinks />
        </div>
        <FooterContact />
      </div>
    </footer>
  );
};

export default Footer;
