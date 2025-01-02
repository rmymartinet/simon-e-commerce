import Image from "next/image";
import Iphone from "../Iphone";
import CircleChart from "./CircleChart";
import { FaCheck } from "react-icons/fa6";
import useWindowWidth from "@/hooks/useWindowWidth";

const NutritionGrid = () => {
  const data = [
    "Détails nutritionnels",
    "Origine des produits",
    "Portion",
    "Type de repas",
    "Ingrédients",
  ];

  const { width } = useWindowWidth();

  return (
    <div className="relative mt-[20vh] flex flex-col gap-6 lg:px-10 xl:px-40">
      <div className="absolute left-1/2 top-[65%] -z-[5px] h-[30%] w-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-t from-[#0b0d14] via-[#0b0d14]/95 to-black/0"></div>
      <div className="absolute left-0 -z-10 h-[60%] w-[90%] -translate-x-[30%]">
        <Image
          src="/images/raycast_purple.jpeg"
          alt=""
          width={2000}
          height={2000}
          className="h-max w-max object-contain"
        />
      </div>
      <div className="mb-10 flex flex-col gap-10 md:flex-row md:px-6">
        <div className="card relative flex flex-col items-center gap-20 rounded-xl p-4 px-10 opacity-100">
          <div className="test absolute inset-0 -left-[200px] -z-10 h-[20%] w-full blur-3xl"></div>
          <h1 className="text-center text-xl font-bold md:text-2xl">
            Des calories maîtrisées pour atteindre vos objectifs
          </h1>
          <div className="flex gap-10">
            <CircleChart
              progressValue={360}
              total={2800}
              type="Total"
              color="#0789f5"
            />
            {width > 498 && (
              <>
                <CircleChart
                  progressValue={200}
                  total={400}
                  type="Glucides"
                  color="#f5ea07"
                />
                <CircleChart
                  progressValue={100}
                  total={120}
                  type="Protéines"
                  color="#f5070e"
                />
                <CircleChart
                  progressValue={60}
                  total={70}
                  type="Lipides"
                  color="#07f532"
                />
              </>
            )}
          </div>
        </div>
        <div className="">
          <h1 className="z-50 mb-4 text-center text-3xl font-bold md:text-start">
            Une nutrition connectée à votre entraînement avec Food.
          </h1>
          <p className="text-muted mt-4 text-pretty break-words text-center text-lg md:mt-0 md:text-start">
            Grâce à l’intégration de Food avec Virtual Gym, vous avez tout à
            portée de main :{" "}
            <span className="font-semibold text-white">suivez vos progrès</span>{" "}
            en temps réel, ajustez votre alimentation en fonction de vos
            objectifs, et{" "}
            <span className="font-semibold text-white">gardez le contrôle</span>{" "}
            sur chaque aspect de votre parcours.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 md:justify-start">
            <div className="h-[5vh] overflow-hidden rounded-xl">
              <Image
                src="/images/virtualgym_app/virtuagym.webp"
                alt=""
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
            </div>
            <strong>+</strong>
            <div className="h-[5vh] overflow-hidden rounded-xl">
              <Image
                src="/images/food_app/food.webp"
                alt=""
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-full flex-col items-center gap-6 lg:grid lg:grid-cols-2 lg:grid-rows-2">
        <div className="card relative flex h-[45vh] w-screen flex-col overflow-hidden rounded-xl py-4 lg:w-full">
          <div className="radial-bg absolute -top-4 h-full w-full"></div>
          <div className="absolute inset-0 top-[100px] scale-150 md:top-10 md:scale-100">
            <Iphone imgUrl="/images/food_app/calorie.png" />
          </div>
        </div>
        <div className="card relative flex h-[45vh] w-screen flex-col overflow-hidden rounded-xl py-4 lg:w-full">
          <div className="radial-bg absolute -top-4 h-full w-full"></div>

          <div className="absolute -right-32 top-20 z-10 md:right-0 md:top-10">
            <Image
              alt=""
              src="/images/food_app/mockup.png"
              width={320}
              height={320}
            />
          </div>
          <div className="z-10 px-6 py-2">
            <h3 className="text-xl font-semibold">
              Détails complets de vos repas
            </h3>
            <div className="mt-6 flex flex-col gap-2">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 text-textOpacity"
                >
                  <div className="grid place-content-center rounded-full border-card p-2">
                    <FaCheck color="green" />
                  </div>
                  <p className="text-md font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card relative flex h-[45vh] w-screen flex-col overflow-hidden rounded-xl py-4 lg:w-full">
          <div className="radial-bg absolute -top-4 h-full w-full"></div>

          <div className="absolute -right-20 bottom-20 z-10 h-[40%] -rotate-[38deg]">
            <Image
              alt=""
              src="/images/food_app/food.png"
              width={400}
              height={400}
            />
          </div>
          <div className="z-10 px-6 py-2">
            <h3 className="text-xl font-semibold">Objectif : Perdre 13kg</h3>
            <p className="text-sm text-textOpacity">Commencer le 1 Jan 2025</p>
            <div className="mt-6 flex flex-col gap-2">
              <div className="flex w-32 flex-col items-center gap-2 rounded-xl border-card bg-[#6e6e6e32] px-10 py-4">
                <strong>83 kg</strong>
                <p>Départ</p>
              </div>
              <div className="flex w-32 flex-col items-center gap-2 rounded-xl border-card bg-[#6e6e6e32] px-10 py-4">
                <strong>83 kg</strong>
                <p>Actuelle</p>
              </div>
              <div className="flex w-32 flex-col items-center gap-2 rounded-xl border-card bg-[#6e6e6e32] px-10 py-4">
                <strong>83 kg</strong>
                <p>Objectif</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card relative flex h-[45vh] w-screen flex-col overflow-hidden rounded-xl py-4 lg:w-full">
          <div className="radial-bg absolute -top-4 h-full w-full"></div>

          <div className="absolute inset-0 z-10 h-full w-full">
            <Image
              alt=""
              src="/images/food_app/scan.png"
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionGrid;
