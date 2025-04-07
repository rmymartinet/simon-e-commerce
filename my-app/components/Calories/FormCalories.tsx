import { useState } from "react";
import Step1_UserInfo from "./Step1_UserInfo";
import Step2_UserGoals from "./Step2_UserGoals";
import Step3_UserDiet from "./Step3_UserDiet";
import Step4_Result from "./Step4_Result";

const FormCalories = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formState, setFormState] = useState({
    genre: "",
    age: 0,
    height: 0,
    weight: 0,
    activities: 1.2,
    bodyFatMode: "auto",
    trainingDays: 0,
    sessionDuration: 0,
    intensity: 0,
  });

  const [goals, setGoals] = useState<{
    carbs: number;
    proteins: number;
    fats: number;
  } | null>(null);

  const [totalCaloriesTraining, setTotalCaloriesTraining] = useState(0);
  const [totalCaloriesRest, setTotalCaloriesRest] = useState(0);
  const [trainingMacros, setTrainingMacros] = useState<{
    carbs: number;
    proteins: number;
    fats: number;
  } | null>(null);

  const [restMacros, setRestMacros] = useState<{
    carbs: number;
    proteins: number;
    fats: number;
  } | null>(null);

  const updateField = (
    field: keyof typeof formState,
    value: string | number,
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const [isTrainingDay, setIsTrainingDay] = useState(true);

  return (
    <div className="relative flex w-full flex-col items-center">
      <div className="relative mb-20 flex flex-col gap-20 p-10">
        <Step1_UserInfo
          formState={formState}
          updateField={updateField}
          errors={errors}
          setErrors={setErrors}
          setFormIsValid={setFormIsValid}
        />

        <Step2_UserGoals
          formState={formState}
          setTotalCalories={setTotalCaloriesRest} // on n’utilise plus
          formIsValid={formIsValid}
          setTotalCaloriesTraining={setTotalCaloriesTraining}
          setTotalCaloriesRest={setTotalCaloriesRest}
          setTrainingMacros={setTrainingMacros}
          setRestMacros={setRestMacros}
          goals={goals}
          isTrainingDay={isTrainingDay}
          setIsTrainingDay={setIsTrainingDay}
        />

        <Step3_UserDiet setGoals={setGoals} />

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
      </div>
    </div>
  );
};

export default FormCalories;
