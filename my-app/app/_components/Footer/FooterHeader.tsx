const FooterHeader = () => (
  <div className="flex flex-col gap-20 lg:gap-0 lg:grid lg:grid-cols-2 lg:items-center mt-20">
    <div className="flex flex-col gap-10 w-[70%]">
      <h1 className="text-xl lg:text-5xl text-start">
        Construisez votre physique maintenant
      </h1>
      <button className="bg-[#B06FF9] hover:bg-[#8452bc] p-4 lg:p-4 rounded-xl lg:text-lg w-max">
        Commencer
      </button>
    </div>
    <div className="relative p-2 z-50 w-screen">
      <div className="w-full lg:w-[70vw] h-[50vh] lg:h-[60vh] bg-white rounded-3xl lg:rounded-[4em]">
        <div className="absolute footer-gradient w-[80%] left-[40%] top-40 -translate-x-1/2 -translate-y-1/2 -rotate-6 h-[75%] -z-10"></div>
      </div>
    </div>
  </div>
);

export default FooterHeader;
