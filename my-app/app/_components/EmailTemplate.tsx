import React from "react";

interface EmailTemplateProps {
  firstName: string;
  resetUrl: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  firstName,
  resetUrl,
}) => {
  return (
    <div>
      <p>Bonjour {firstName},</p>
      <p>
        Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le
        lien suivant pour réinitialiser votre mot de passe :
      </p>
      <p>
        <a href={resetUrl}>Réinitialiser le mot de passe</a>
      </p>
    </div>
  );
};
