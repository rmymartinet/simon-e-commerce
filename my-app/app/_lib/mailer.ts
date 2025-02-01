import { Resend } from "resend";
import { EmailTemplateResetPassword } from "../_components/EmailTemplate/EmailTemplateResetPassword";
import { EmailTemplateProgramContent } from "../_components/EmailTemplate/EmailTemplateProgramContent";

import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

export async function sendProgramEmail(email: string, programTitles: string[]) {
  const isProgramTitlesArray = Array.isArray(programTitles)
    ? programTitles
    : [programTitles];

  console.log("isProgramTitlesArray", isProgramTitlesArray);

  const pdfLinks: { [key: string]: string } = {
    Débutant:
      "https://asset.cloudinary.com/dnkhbxpji/d3e19a9781fa2dcbeace055a38040c74",
    Intermédiaire:
      "https://asset.cloudinary.com/dnkhbxpji/fa1add14f226724bf445fdcb490c8386",
    Avancé:
      "https://asset.cloudinary.com/dnkhbxpji/ce505e576514b559f3f62ee1ef1c9dcc",
  };

  // Construction de la liste des programmes avec les titres et URLs
  const programs = isProgramTitlesArray
    .map((title) => ({
      title,
      url: pdfLinks[title] || "",
    }))
    .filter((program) => program.url);

  console.log("Programs", programs);

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_USER as string,
      to: email,
      subject: "Vos programmes disponibles",
      react: EmailTemplateProgramContent({ programs: programs }),
    });

    if (error) {
      console.error(
        "Erreur lors de l'envoi de l'email pour les programmes :",
        error,
      );
      throw new Error("Erreur lors de l'envoi de l'email des programmes.");
    }

    console.log("Email de programmes envoyé à :", email);
    return data;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    throw new Error("Erreur lors de l'envoi de l'email des programmes.");
  }
}

export async function sendResetPasswordEmail(email: string, token: string) {
  const resetUrl = `https://www.smartinet-coaching.com/reset-password?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_USER as string,
      to: email,
      subject: "Réinitialisation du mot de passe",
      react: await EmailTemplateResetPassword({
        firstName: "Utilisateur",
        resetUrl,
      }),
    });

    if (error) {
      console.error(
        "Erreur lors de l'envoi de l'email de réinitialisation :",
        error,
      );
      throw new Error("Erreur lors de l'envoi de l'email de réinitialisation.");
    }

    console.log("Email de réinitialisation envoyé à :", email);
    return data;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    throw new Error("Erreur lors de l'envoi de l'email de réinitialisation.");
  }
}
