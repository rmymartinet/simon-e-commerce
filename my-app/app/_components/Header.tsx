const Header = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center p-8">
      <div className="rounded-xl overflow-hidden div5 relative">
        <video
          autoPlay
          loop
          muted
          src="/videos/sport.mp4"
          className="w-full h-full object-cover"
        ></video>
        <div className="absolute top-20 right-20  p-2 w-[30%]">
          <p className="text-white text-2xl">
            Accédez à des options flexibles et immédiates : PDF téléchargeables
            pour progresser en autonomie ou coaching pour un accompagnement sur
            mesure
          </p>
          <button className="bg-[#B06FF9] text-white p-4 rounded-xl">
            Commencer
          </button>
        </div>

        <div className="absolute bottom-[10%] left-[3%] flex gap-4 w-[40%] ">
          <h1 className="text-6xl text-emerald-100 rounded-xl p-2">
            Programme Adapté Coaching Personnalisé
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
