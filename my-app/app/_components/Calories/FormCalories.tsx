import { useEffect, useRef, useState } from "react";
import LineChartWeight from "./LineChartWeight";
import WaterCard from "./WaterCard";
import BMRCard from "./BMRCard";
import CaloriesCard from "./CaloriesCard";
import { IoFastFoodOutline } from "react-icons/io5";
import gsap from "gsap";
import { FormProps } from "@/types/types";
import Stars from "../Stars";

const FormCalories = ({
  showResults,
  setShowResults,
  data,
  inputData,
}: FormProps) => {
  const resultRef = useRef(null);
  const formRef = useRef(null);
  const backButtonRef = useRef(null);

  const {
    setGenre,
    age,
    setAge,
    height,
    setHeight,
    weight,
    setWeight,
    targetWeight,
    setTargetWeight,
    activities,
    setActivities,
    goals,
    setGoals,
    setWeightChange,
    weightChange,
  } = inputData;

  const { grams, totalCalories, BMR } = data;
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (!weight) newErrors.weight = "Veuillez entrer votre poids.";
    if (!targetWeight)
      newErrors.targetWeight = "Veuillez entrer votre poids cible.";
    if (!activities)
      newErrors.activities = "Veuillez sélectionner votre niveau d'activité.";
    if (!goals) newErrors.goals = "Veuillez sélectionner votre objectif.";
    if (!weightChange)
      newErrors.weightChange =
        "Veuillez entrer votre objectif de perte de poids.";
    if (!age) newErrors.age = "Veuillez entrer votre âge.";
    if (!height) newErrors.height = "Veuillez entrer votre taille.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setShowResults(true);
  };

  useEffect(() => {
    if (showResults) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      gsap.to(resultRef.current, {
        x: 0,
        duration: 1,
        ease: "power2.out",
      });
      gsap.to(formRef.current, {
        x: -2000,
        duration: 1,
        ease: "power2.out",
      });

      gsap.from(backButtonRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    } else {
      gsap.to(formRef.current, {
        x: 0,
        duration: 1,
        ease: "power2.out",
      });
      gsap.to(resultRef.current, { x: 2000 });
    }
  }, [showResults]);

  return (
    <div className="relative flex w-full flex-col items-center">
      <div
        className={`flex flex-wrap items-end gap-2 ${showResults ? "mb-16" : "mb-8"}`}
      >
        <h1 className="text-center text-3xl font-semibold md:text-4xl lg:text-7xl">
          Calculez vos calories
        </h1>
        <IoFastFoodOutline size={40} />
      </div>
      <div
        className={`relative gap-4 p-10 ${showResults ? "mb-[30vh]" : "mb-20"}`}
      >
        {showResults && (
          <button
            ref={backButtonRef}
            onClick={() => setShowResults(false)}
            className="padding absolute left-1/2 top-0 z-50 -translate-x-1/2 rounded-2xl bg-button-gradient text-white"
          >
            Précedent
          </button>
        )}
        <div className="test absolute top-40 -z-20 h-full w-[70%] blur-3xl"></div>

        <div
          ref={resultRef}
          className="program-button-container absolute left-1/2 top-[60%] mt-[30vh] flex h-max w-screen -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl border-2 border-red-400 p-2 md:w-screen lg:w-full"
        >
          <Stars
            yposition="-top-10"
            xposition="left-0"
            height="h-20"
            weight="w-full"
            isTop={false}
          />
          <Stars
            yposition="-bottom-10"
            xposition="left-0"
            height="h-20"
            weight="w-full"
            isTop={false}
          />
          <Stars
            yposition="top-0"
            xposition="-right-10"
            height="h-full"
            weight="w-20"
            isTop={true}
          />

          <Stars
            yposition="top-0"
            xposition="-left-10"
            height="h-full"
            weight="w-20"
            isTop={true}
          />
          <div className="flex flex-col gap-4">
            <CaloriesCard
              showResults={showResults}
              totalCalories={totalCalories}
              grams={grams}
            />
            <div className="flex flex-col gap-4 md:grid md:grid-flow-row md:grid-cols-2">
              <WaterCard />
              <BMRCard BMR={BMR} />
            </div>
          </div>
          <LineChartWeight
            startWeight={weight}
            weightChange={weightChange}
            targetWeight={targetWeight}
          />
        </div>
        <form
          ref={formRef}
          className="program-background relative flex w-screen flex-col gap-4 rounded-xl p-8 lg:w-full"
          action="submit"
          onSubmit={handleSubmit}
        >
          <Stars
            yposition="-top-10"
            xposition="left-0"
            height="h-20"
            weight="w-full"
            isTop={false}
          />
          <Stars
            yposition="-bottom-10"
            xposition="left-0"
            height="h-20"
            weight="w-full"
            isTop={false}
          />
          <Stars
            yposition="top-0"
            xposition="-right-10"
            height="h-full"
            weight="w-20"
            isTop={true}
          />

          <Stars
            yposition="top-0"
            xposition="-left-10"
            height="h-full"
            weight="w-20"
            isTop={true}
          />
          <div className="flex flex-col">
            <label htmlFor="genre" className="mb-2">
              Genre
            </label>
            <select
              name="genre"
              id="genre"
              className={`rounded-lg bg-slate-100 p-2 text-black ${errors.genre ? "border border-red-400" : ""}`}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="female">Femme</option>
              <option value="male">Homme</option>
            </select>
            {errors.genre && (
              <span className="text-red-400">{errors.genre}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="age" className="mb-2">
              Age
            </label>
            <input
              className={`rounded-lg bg-slate-100 p-2 text-black ${errors.age ? "border border-red-400" : ""}`}
              type="number"
              name="age"
              id="age"
              onChange={(e) => setAge(Number(e.target.value))}
            />
            {errors.age && <span className="text-red-400">{errors.age}</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="height" className="mb-2">
              Taille (cm)
            </label>
            <input
              className={`rounded-lg bg-slate-100 p-2 text-black ${errors.height ? "border border-red-400" : ""}`}
              type="number"
              name="height"
              id="height"
              onChange={(e) => setHeight(Number(e.target.value))}
            />
            {errors.height && (
              <span className="text-red-400">{errors.height}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="weight" className="mb-2">
              Poids (kg)
            </label>
            <input
              className={`rounded-lg bg-slate-100 p-2 text-black ${errors.weight ? "border border-red-400" : ""}`}
              type="number"
              name="weight"
              id="weight"
              onChange={(e) => setWeight(Number(e.target.value))}
            />
            {errors.weight && (
              <span className="text-red-400">{errors.weight}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="targetWeight" className="mb-2">
              Poids que vous souhaitez atteindre (kg)
            </label>
            <input
              className={`rounded-lg bg-slate-100 p-2 text-black ${errors.targetWeight ? "border border-red-400" : ""}`}
              type="number"
              name="targetWeight"
              id="targetWeight"
              onChange={(e) => setTargetWeight(Number(e.target.value))}
            />
            {errors.targetWeight && (
              <span className="text-red-400">{errors.targetWeight}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="activities" className="mb-2">
              Niveau d&apos;Activité
            </label>
            <select
              name="activities"
              id="activities"
              className={`rounded-lg bg-slate-100 p-2 text-black ${errors.activities ? "border border-red-400" : ""}`}
              onChange={(e) => setActivities(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Sélectionner
              </option>
              <option value="1.2">
                Sédentaire (Aucune activité physique et travail de bureau)
              </option>
              <option value="1.375">
                Modéré (1 à 3 séances d&apos;entraînement par semaine et travail
                de bureau)
              </option>
              <option value="1.55">
                Actif (2 à 4 séances par semaine et travail physique)
              </option>
              <option value="1.725">
                Très actif (5 à 6 séances d&apos;entraînement par semaine et
                travail de bureau)
              </option>
              <option value="1.9">
                Extrême (plus de 6 séances d&apos;entraînement par semaine et
                travail physique)
              </option>
            </select>
            {errors.activities && (
              <span className="text-red-400">{errors.activities}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="activite" className="mb-2">
              Objectifs
            </label>
            <select
              name="activite"
              id="activite"
              className={`rounded-lg bg-slate-100 p-2 text-black ${errors.goals ? "border border-red-400" : ""}`}
              onChange={(e) => setGoals(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Sélectionner
              </option>
              <option value="perte">Perte de gras</option>
              <option value="maintien">Maintien</option>
              <option value="gain">Prise de muscle</option>
            </select>
            {errors.goals && (
              <span className="text-red-400">{errors.goals}</span>
            )}
          </div>
          <div
            className={`flex items-center gap-4 ${goals === "" ? "opacity-100" : ""}`}
          >
            <label htmlFor="weight-loss-slider ">
              Objectif {goals !== "maintien" ? goals : ""} de poids par semaine
              (en kg) :
            </label>
            <div
              className={`flex items-center rounded-full bg-slate-100 p-2 ${errors.weightChange ? "border border-red-400" : ""}`}
            >
              <input
                className="cursor-pointer"
                type="range"
                id="weight-loss-slider"
                name="weight-loss"
                min="0"
                max="1"
                step="0.1"
                value={weightChange}
                onChange={(e) => setWeightChange(Number(e.target.value))}
                disabled={goals === "" || goals === "maintien"}
              />
            </div>
            <span className="font-medium">{weightChange} kg</span>
            {errors.weightChange && (
              <span className="text-red-400">{errors.weightChange}</span>
            )}
          </div>
          <button
            type="submit"
            className="padding mt-10 w-full self-center rounded-lg bg-button-gradient font-bold text-white"
          >
            Calculer
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormCalories;
