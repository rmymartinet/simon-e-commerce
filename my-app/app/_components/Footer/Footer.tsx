import FooterLinks from "./FooterLinks";

const Footer = () => {
  return (
    <footer className="relative mt-40 flex w-full justify-between bg-[#D1D1D133] px-40 py-20 text-sm text-white">
      <div className="test-f absolute bottom-0 right-0 -z-20 h-[80%] w-full" />
      <div className="flex flex-col justify-between gap-2">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-semibold">SM Coaching</h3>
          <button className="w-max rounded-md bg-button px-4 py-2 text-white hover:bg-[#9D4EDD]">
            Commencer
          </button>
        </div>
        {/* <FooterContact /> */}
      </div>
      <FooterLinks />
    </footer>
  );
};

export default Footer;
