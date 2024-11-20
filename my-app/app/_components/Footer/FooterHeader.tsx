const FooterHeader = () => (
  <div className="mt-20 flex flex-col gap-20 lg:grid lg:grid-cols-2 lg:items-center lg:gap-0">
    <div className="flex w-[70%] flex-col gap-10">
      <h1 className="text-start text-xl lg:text-5xl">
        Construisez votre physique maintenant
      </h1>
      <button className="w-max rounded-xl bg-[#B06FF9] p-4 hover:bg-[#8452bc] lg:p-4 lg:text-lg">
        Commencer
      </button>
    </div>
    <div className="relative z-50 w-screen p-2">
      <div className="h-[50vh] w-full rounded-3xl bg-white lg:h-[60vh] lg:w-[70vw] lg:rounded-[4em]">
        <div className="footer-gradient absolute left-[40%] top-40 -z-10 h-[75%] w-[80%] -translate-x-1/2 -translate-y-1/2 -rotate-6"></div>
      </div>
    </div>
  </div>
);

export default FooterHeader;
