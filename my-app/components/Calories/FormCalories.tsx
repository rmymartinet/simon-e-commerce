import { useState, useCallback, useMemo } from "react";
import Step1_UserInfo from "./Step1_UserInfo";
import Step2_UserGoals from "./Step2_UserGoals";
import Step3_UserDiet from "./Step3_UserDiet";
import Step4_Result from "./Step4_Result";
import { Button } from "@/components/ui/button";

interface FormState {
  genre: string;
  age: number | "";
  height: number | "";
  weight: number | "";
  activities: number;
  bodyFatMode: string;
  trainingDays: number | "";
  sessionDuration: number | "";
  intensity: number | "";
}

interface Macros {
  carbs: number;
  proteins: number;
  fats: number;
}

const FormCalories = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formState, setFormState] = useState<FormState>({
    genre: "",
    age: "",
    height: "",
    weight: "",
    activities: 1.2,
    bodyFatMode: "auto",
    trainingDays: "",
    sessionDuration: "",
    intensity: "",
  });

  const defaultGoals = useMemo<Macros>(
    () => ({ carbs: 45, proteins: 20, fats: 35 }),
    [],
  );
  const [goals, setGoals] = useState<Macros | null>(defaultGoals);
  const [totalCaloriesTraining, setTotalCaloriesTraining] = useState(0);
  const [totalCaloriesRest, setTotalCaloriesRest] = useState(0);
  const [trainingMacros, setTrainingMacros] = useState<Macros | null>(null);
  const [restMacros, setRestMacros] = useState<Macros | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const updateField = useCallback(
    (field: keyof typeof formState, value: string | number) => {
      setFormState((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  const [isTrainingDay, setIsTrainingDay] = useState(true);

  const steps = [
    { id: 1, label: "Infos" },
    { id: 2, label: "Objectif" },
    { id: 3, label: "Régime" },
    { id: 4, label: "Résultat" },
  ];

  const goNext = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const goPrev = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="relative flex w-full flex-col items-center">
      <div className="relative mb-20 flex w-full max-w-5xl flex-col gap-6 px-4 py-6 sm:gap-8 sm:py-10">
        <div className="grid w-full grid-cols-1 gap-3 text-xs sm:grid-cols-4 sm:text-sm">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center gap-3 rounded-full border px-4 py-2 ${
                currentStep >= step.id
                  ? "border-violet-400/40 bg-violet-500/10 text-white"
                  : "border-gray-700 bg-gray-900/50 text-gray-500"
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                  currentStep >= step.id
                    ? "bg-violet-400 text-gray-900"
                    : "bg-gray-800 text-gray-500"
                }`}
              >
                {step.id}
              </span>
              <span className="font-semibold">{step.label}</span>
            </div>
          ))}
        </div>

        {currentStep === 1 && (
          <Step1_UserInfo
            formState={formState}
            updateField={updateField}
            errors={errors}
            setErrors={setErrors}
            setFormIsValid={setFormIsValid}
            onNext={goNext}
          />
        )}

        {currentStep === 2 && (
          <div className="flex flex-col gap-6">
            <Step2_UserGoals
              formState={formState}
              setTotalCalories={setTotalCaloriesRest} // on n'utilise plus
              formIsValid={formIsValid}
              setTotalCaloriesTraining={setTotalCaloriesTraining}
              setTotalCaloriesRest={setTotalCaloriesRest}
              setTrainingMacros={setTrainingMacros}
              setRestMacros={setRestMacros}
              goals={goals}
              isTrainingDay={isTrainingDay}
              setIsTrainingDay={setIsTrainingDay}
            />
            <div className="flex items-center justify-center gap-4">
              <Button variant="secondary" onClick={goPrev}>
                Retour
              </Button>
              <Button variant="purpleBg" onClick={goNext}>
                Continuer
              </Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex flex-col gap-6">
            <Step3_UserDiet setGoals={setGoals} />
            <div className="flex items-center justify-center gap-4">
              <Button variant="secondary" onClick={goPrev}>
                Retour
              </Button>
              <Button variant="purpleBg" onClick={goNext}>
                Calculer mes besoins
              </Button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="flex flex-col gap-6">
            <Step4_Result
              formIsValid={formIsValid}
              totalCaloriesTraining={totalCaloriesTraining}
              totalCaloriesRest={totalCaloriesRest}
              goalsTraining={trainingMacros}
              goalsRest={restMacros}
              goals={goals}
              isTrainingDay={isTrainingDay}
              setIsTrainingDay={setIsTrainingDay}
            />
            <div className="flex items-center justify-center">
              <Button variant="secondary" onClick={goPrev}>
                Retour
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormCalories;
