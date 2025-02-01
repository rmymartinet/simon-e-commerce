import React from "react";

interface Program {
  title: string;
  url: string;
}

interface EmailTemplateProgramContentProps {
  programs: Program[];
}

export const EmailTemplateProgramContent: React.FC<
  EmailTemplateProgramContentProps
> = ({ programs }) => {
  console.log("ProgramsTEMPLATE", programs);
  return (
    <div>
      <p>Bonjour, voici tes programmes :</p>
      <ul>
        {programs.map((program, index) => (
          <li key={index}>
            <p>{program.title}</p>
            <p>
              Télécharge-le depuis ce lien :{" "}
              <a href={program.url}>Mon programme</a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
