import { useState, useCallback } from "react";
import Step1_UserInfo from "./Step1_UserInfo";
import Step2_UserGoals from "./Step2_UserGoals";
import Step3_UserDiet from "./Step3_UserDiet";
import Step4_Result from "./Step4_Result";

interface FormState {
  genre: string;
  age: number;
  height: number;
  weight: number;
  activities: number;
  bodyFatMode: string;
  trainingDays: number;
  sessionDuration: number;
  intensity: number;
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
    age: 0,
    height: 0,
    weight: 0,
    activities: 1.2,
    bodyFatMode: "auto",
    trainingDays: 0,
    sessionDuration: 0,
    intensity: 0,
  });

  const [goals, setGoals] = useState<Macros | null>(null);
  const [totalCaloriesTraining, setTotalCaloriesTraining] = useState(0);
  const [totalCaloriesRest, setTotalCaloriesRest] = useState(0);
  const [trainingMacros, setTrainingMacros] = useState<Macros | null>(null);
  const [restMacros, setRestMacros] = useState<Macros | null>(null);

  const updateField = useCallback((
    field: keyof typeof formState,
    value: string | number,
  ) => {
    // Validation des champs numériques
    if (typeof value === 'number') {
      const newErrors = { ...errors };
      
      if (field === 'age') {
        if (value < 0 || value > 120) {
          newErrors[field] = "L'âge doit être compris entre 0 et 120 ans";
          setErrors(newErrors);
          return;
        }
      }
      if (field === 'height') {
        if (value < 50 || value > 250) {
          newErrors[field] = "La taille doit être comprise entre 50 et 250 cm";
          setErrors(newErrors);
          return;
        }
      }
      if (field === 'weight') {
        if (value < 20 || value > 300) {
          newErrors[field] = "Le poids doit être compris entre 20 et 300 kg";
          setErrors(newErrors);
          return;
        }
      }
      if (field === 'trainingDays') {
        if (value < 0 || value > 7) {
          newErrors[field] = "Le nombre de jours d'entraînement doit être compris entre 0 et 7";
          setErrors(newErrors);
          return;
        }
      }
      if (field === 'sessionDuration') {
        if (value < 0 || value > 480) {
          newErrors[field] = "La durée de la séance doit être comprise entre 0 et 480 minutes";
          setErrors(newErrors);
          return;
        }
      }
      if (field === 'intensity') {
        if (value < 0 || value > 10) {
          newErrors[field] = "L'intensité doit être comprise entre 0 et 10";
          setErrors(newErrors);
          return;
        }
      }

      // Si la validation est passée, on supprime l'erreur pour ce champ
      if (newErrors[field]) {
        delete newErrors[field];
        setErrors(newErrors);
      }
    }

    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, [errors]);

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
