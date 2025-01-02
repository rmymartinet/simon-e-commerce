import useNavigation from "@/hooks/useNavigation";
import FooterContact from "./FooterContact";
import FooterLinks from "./FooterLinks";

const Footer = () => {
  const { handlePricingNavigation } = useNavigation();
  return (
    <footer className="relative mt-40 flex h-[200vdh] w-full flex-col justify-between px-10 py-10 text-sm text-white lg:px-40 lg:py-10">
      <div className="animate-bg-purple absolute bottom-0 right-0 -z-20 h-[40%] w-full" />

      <div className="flex flex-col justify-between">
        <div className="mb-[20vh] flex flex-col justify-between gap-20 lg:flex-row lg:gap-0">
          <div className="relative flex h-max flex-col gap-6">
            <h1 className="text-2xl font-bold md:text-3xl">
              Commencer dès maintenant
            </h1>
            <button
              onClick={handlePricingNavigation}
              className="padding h-max w-max rounded-lg bg-button-gradient text-xl"
            >
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
