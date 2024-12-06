export default function Infos() {
  return (
    <div className="relative mt-40 flex min-h-screen flex-col items-center justify-center gap-40">
      <div className="relative w-[80%] overflow-hidden rounded-3xl">
        <video
          src="/videos/header_bg.mp4"
          className="h-full w-full object-contain"
          loop
          muted
          autoPlay
          controls
        ></video>

        {/* <div className="absolute left-20 top-40 flex w-[70%] flex-col">
          <h1 className="text-9xl font-semibold uppercase text-white mix-blend-difference">
            simon
          </h1>
          <h1 className="self-end text-9xl font-semibold uppercase text-white mix-blend-difference">
            martinet
          </h1>
        </div> */}
      </div>
      <div className="relative flex gap-20">
        <div className="fixed-bg-purple absolute right-0 top-0 -z-20 h-[80%] w-full" />
        <div className="relative rounded-xl border border-white p-10">
          <span className="text-xl font-medium">Diplomé Staps</span>
        </div>
        <div className="rounded-xl border border-white p-10">
          <span className="text-xl font-medium">Préparateur physique</span>
        </div>
        <div className="rounded-xl border border-white p-10">
          <span className="text-xl font-medium">Coach Basic-Fit</span>
        </div>
      </div>
      <div className="grid grid-cols-2 place-items-center gap-20 px-20">
        <div className="flex flex-col gap-4">
          <p className="text-pretty">
            J’ai commencé la <strong>musculation</strong> à 17 ans, poussé par
            plusieurs raisons : je me trouvais trop <strong>maigre</strong>,
            trop <strong>fragile</strong>, et je manquais de{" "}
            <strong>confiance en moi</strong>.
          </p>

          <p className="text-pretty">
            Puis, en 2017, j’ai découvert une vidéo de{" "}
            <strong>Calum Von Moger</strong>, et là, ce fut le{" "}
            <strong>déclic</strong>, un véritable{" "}
            <strong>coup de foudre</strong> pour le{" "}
            <strong>bodybuilding</strong>. Dès ce moment, je savais que je
            voulais m’inscrire en <strong>salle</strong>.
          </p>

          <p className="text-pretty">
            Mais, sans savoir vraiment par où commencer, je me suis lancé, porté
            par une envie irrépressible de pousser les limites de mon{" "}
            <strong>potentiel physique</strong> et de voir mon corps{" "}
            <strong>évoluer</strong>. Je me suis entraîné <strong>seul</strong>,
            sans expérience, sans guide… et comme beaucoup, j’ai commis cette
            erreur de vouloir aller trop vite.
          </p>

          <p className="text-pretty">
            C’est pourquoi mes progrès n’ont pas été aussi rapides que je
            l’avais espéré. J’ai alors pris la décision de ne pas brûler les
            étapes : je me suis plongé dans la <strong>théorie</strong>, en{" "}
            <strong>musculation</strong>, mais aussi en{" "}
            <strong>nutrition</strong>, qui est essentielle pour progresser.
          </p>

          <p className="text-pretty">
            Je voulais comprendre le pourquoi de chaque{" "}
            <strong>exercice</strong>, le rôle de chaque{" "}
            <strong>aliment</strong>. Ce n’était plus qu’une simple activité,
            c’était devenu une véritable <strong>passion</strong>.
          </p>

          <p className="text-pretty">
            Cette <strong>soif de savoir</strong> m’a poussé à m’inscrire, après
            le lycée, en <strong>études supérieures de sport</strong>.
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl">
          <img
            src="/images/about/about_simon.webp"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 place-items-center gap-20 px-20">
        <div className="overflow-hidden rounded-3xl">
          <img
            src="/images/about/about_simon.webp"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-pretty">
            Ainsi à l&apos;âge de <strong>18 ans</strong>, j&apos;ai suivi un
            cursus <strong>STAPS</strong> en faculté, cela m&apos;a permis
            d&apos;avoir des connaissances sur la{" "}
            <strong>préparation physique</strong>, <strong>mentale</strong>...
            Mais il n&apos;y avait pas assez de spécialisation sur ce que
            j&apos;aimais vraiment, en l&apos;occurrence la{" "}
            <strong>musculation</strong> et la <strong>nutrition</strong>,
            c&apos;est pourquoi je me suis renseigné sur ces domaines, en dehors
            des cours, par <strong>passion</strong>.
          </p>

          <p className="text-pretty">
            J&apos;ai donc effectué une <strong>Licence STAPS</strong> avec pour
            option <strong>Entrainement Sportif</strong> et{" "}
            <strong>Haltérophilie</strong>, comprenant plusieurs{" "}
            <strong>stages</strong>, dans des structures sportives, afin de
            pratiquer mon futur métier en qualité de{" "}
            <strong>préparateur physique</strong> et{" "}
            <strong>coach sportif</strong>.
          </p>

          <p className="text-pretty">
            Depuis le début de cette <strong>passion</strong> jusqu&apos;à
            l&apos;obtention de mon <strong>diplôme</strong> en{" "}
            <strong>2022</strong>, j&apos;ai acquis de l&apos;
            <strong>enseignement</strong>, de l&apos;
            <strong>expérience</strong> et du <strong>vécu</strong>, me
            permettant d&apos;évoluer <strong>physiquement</strong> et{" "}
            <strong>mentalement</strong> et c&apos;est la raison pour laquelle
            j&apos;ai envie de transmettre ma passion et vous aider à réaliser
            votre <strong>idéal</strong> en atteignant vos{" "}
            <strong>objectifs</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
