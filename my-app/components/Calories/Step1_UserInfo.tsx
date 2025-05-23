import { Step1_UserInfoProps } from "@/types/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";

const Step1_UserInfo = ({
  formState,
  updateField,
  errors,
  setErrors,
  setFormIsValid,
}: Step1_UserInfoProps) => {
  const {
    age,
    height,
    weight,
    activities,
    bodyFatMode,
    trainingDays,
    sessionDuration,
    intensity,
  } = formState;

  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!age) newErrors.age = "Veuillez entrer votre âge.";
    if (!height) newErrors.height = "Veuillez entrer votre taille.";
    if (!weight) newErrors.weight = "Veuillez entrer votre poids.";
    if (!activities)
      newErrors.activities = "Veuillez sélectionner votre niveau d'activité.";
    if (!bodyFatMode) newErrors.bodyFatMode = "Veuillez sélectionner un mode.";
    if (!trainingDays)
      newErrors.trainingDays =
        "Veuillez entrer le nombre de jours d'entraînement.";
    if (!sessionDuration)
      newErrors.sessionDuration = "Veuillez entrer la durée de vos séances.";
    if (!intensity)
      newErrors.intensity = "Veuillez sélectionner une intensité.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    if (Object.keys(newErrors).length === 0) {
      setFormIsValid(true);
    }
  };

  useGSAP(() => {
    gsap.from(formRef.current, {
      y: 100,
      filter: "blur(70px)",
      duration: 1,
      ease: "power2.Out",
      opacity: 0,
    });
  }, []);

  return (
    <form
      ref={formRef}
      className="relative flex w-screen flex-col gap-4 rounded-xl border border-[--border-color] bg-[--card-bg] p-8 lg:w-full"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      {/* Genre */}
      <div className="flex flex-col">
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl">
            <span className="font-bold text-violet-400">Étape 1</span> :
            informations générales
          </h2>
          <p className="lg:max-w-[40vw]">
            Commence par renseigner tes données de base : âge, sexe, taille,
            poids, niveau d’activité et fréquence d’entraînement. Ces infos nous
            permettent de calculer précisément ton métabolisme de base (BMR) et
            tes besoins énergétiques
          </p>
        </div>

        <label className="mb-2 text-lg font-semibold">Genre</label>
        <div className="flex gap-4">
          {["male", "female"].map((value) => (
            <label key={value} className="flex items-center gap-2">
              <input
                type="radio"
                name="genre"
                value={value}
                checked={formState.genre === value}
                onChange={(e) => updateField("genre", e.target.value)}
                className="accent-blue"
              />
              {value === "male" ? "Homme" : "Femme"}
            </label>
          ))}
        </div>
        {errors.genre && <span className="text-red-400">{errors.genre}</span>}
      </div>

      {/* Âge */}
      <div className="flex flex-col">
        <label htmlFor="age" className="mb-2 text-lg font-semibold">
          Âge
        </label>
        <input
          type="number"
          id="age"
          value={formState.age === 0 ? "" : formState.age} // Affiche une chaîne vide si l'âge est 0
          onChange={(e) => updateField("age", Number(e.target.value))}
          className={`rounded-lg bg-slate-100 p-2 text-black ${errors.age ? "border border-red-400" : ""}`}
        />
        {errors.age && <span className="text-red-400">{errors.age}</span>}
      </div>

      {/* Taille */}
      <div className="flex flex-col">
        <label htmlFor="height" className="mb-2 text-lg font-semibold">
          Taille (cm)
        </label>
        <input
          type="number"
          id="height"
          value={formState.height === 0 ? "" : formState.height} // Affiche une chaîne vide si la taille est 0
          onChange={(e) => updateField("height", Number(e.target.value))}
          className={`rounded-lg bg-slate-100 p-2 text-black ${errors.height ? "border border-red-400" : ""}`}
        />
        {errors.height && <span className="text-red-400">{errors.height}</span>}
      </div>

      {/* Poids */}
      <div className="flex flex-col">
        <label htmlFor="weight" className="mb-2 text-lg font-semibold">
          Poids (kg)
        </label>
        <input
          type="number"
          id="weight"
          value={formState.weight === 0 ? "" : formState.weight} // Affiche une chaîne vide si le poids est 0
          onChange={(e) => updateField("weight", Number(e.target.value))}
          className={`rounded-lg bg-slate-100 p-2 text-black ${errors.weight ? "border border-red-400" : ""}`}
        />
        {errors.weight && <span className="text-red-400">{errors.weight}</span>}
      </div>

      {/* Masse grasse */}
      <div className="flex flex-col">
        <label className="mb-2 text-lg font-semibold">Masse grasse</label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="bodyFatMode"
            value="auto"
            checked={formState.bodyFatMode === "auto"}
            onChange={() => updateField("bodyFatMode", "auto")}
          />
          Calcul automatique (d&apos;après mon IMC)
        </label>
        <label className="flex cursor-not-allowed items-center gap-2 opacity-50">
          <input type="radio" name="bodyFatMode" value="manual" disabled />
          Calcul précis (bientôt dispo)
        </label>
        {errors.bodyFatMode && (
          <span className="text-red-400">{errors.bodyFatMode}</span>
        )}
      </div>

      {/* Activité quotidienne */}
      {/* Activité quotidienne */}
      <div className="flex flex-col">
        <label className="mb-2 text-lg font-semibold">
          Activité quotidienne
        </label>
        {[
          { value: "1.2", label: "Sédentaire : assis(e) (bureau...)" },
          { value: "1.375", label: "Légèrement actif(ve) : debout souvent" },
          { value: "1.55", label: "Actif(ve) : activité modérée" },
          { value: "1.725", label: "Très actif(ve) : physique régulière" },
          { value: "1.9", label: "Extrême : chantier / sport intensif" },
        ].map((option) => (
          <label key={option.value} className="flex items-center gap-2">
            <input
              type="radio"
              name="activities"
              value={option.value}
              checked={formState.activities === Number(option.value)}
              onChange={(e) =>
                updateField("activities", Number(e.target.value))
              }
              className="accent-blue"
            />
            {option.label}
          </label>
        ))}
        {errors.activities && (
          <span className="text-red-400">{errors.activities}</span>
        )}
      </div>

      {/* Jours d'entraînement */}
      <div className="flex flex-col">
        <label htmlFor="trainingDays" className="mb-2 text-lg font-semibold">
          Jours d&apos;entraînement/semaine
        </label>
        <input
          type="number"
          id="trainingDays"
          value={formState.trainingDays === 0 ? "" : formState.trainingDays} // Affiche une chaîne vide si le nombre de jours est 0
          min={0}
          max={7}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= 0 && value <= 7) {
              updateField("trainingDays", value); // Met à jour uniquement si la valeur est valide
            }
          }}
          className={`rounded-lg bg-slate-100 p-2 text-black ${
            errors.trainingDays ? "border border-red-400" : ""
          }`}
        />
        {errors.trainingDays && (
          <span className="text-red-400">{errors.trainingDays}</span>
        )}
      </div>

      {/* Durée des séances */}
      <div className="flex flex-col">
        <label htmlFor="sessionDuration" className="mb-2 text-lg font-semibold">
          Durée moyenne (minutes)
        </label>
        <input
          type="number"
          id="sessionDuration"
          value={
            formState.sessionDuration === 0 ? "" : formState.sessionDuration
          } // Affiche une chaîne vide si la durée est 0
          onChange={(e) =>
            updateField("sessionDuration", Number(e.target.value))
          }
          className={`rounded-lg bg-slate-100 p-2 text-black ${errors.sessionDuration ? "border border-red-400" : ""}`}
        />
        {errors.sessionDuration && (
          <span className="text-red-400">{errors.sessionDuration}</span>
        )}
      </div>

      {/* Intensité */}
      <div className="flex flex-col">
        <label className="mb-2 text-lg font-semibold">
          À quelle intensité t&apos;entraînes-tu ?
        </label>
        {[4, 6, 8, 10].map((val) => (
          <label key={val} className="flex items-center gap-2">
            <input
              type="radio"
              name="intensity"
              value={val}
              checked={formState.intensity === val}
              onChange={(e) => updateField("intensity", Number(e.target.value))}
              className="accent-blue"
            />
            {val === 4
              ? "Légère : je m'entraîne surtout pour m'entretenir."
              : val === 6
                ? "Modérée : je force de temps en temps pour me challenger."
                : val === 8
                  ? "Élevée : je me donne à fond et transpire beaucoup."
                  : "Intense : je suis ici pour en découdre afin de repousser mes limites."}
          </label>
        ))}
        {errors.intensity && (
          <span className="text-red-400">{errors.intensity}</span>
        )}
      </div>

      {/* Bouton */}
      <button
        type="submit"
        className="padding mt-10 w-max self-center rounded bg-button-gradient px-6 py-2 font-bold text-white"
      >
        Continuer
      </button>
    </form>
  );
};

export default Step1_UserInfo;
