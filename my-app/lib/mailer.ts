"use server";

import { Resend } from "resend";
import React from "react";

import dotenv from "dotenv";
import EmailTemplateProgramContent from "@/components/EmailTemplate/EmailTemplateProgramContent";
import { EmailTemplateResetPassword } from "@/components/EmailTemplate/EmailTemplateResetPassword";

dotenv.config();

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);


export async function sendProgramEmail(
  email: string,
  programTitles: string[] | string,
) {

  const isProgramTitlesArray = Array.isArray(programTitles)
    ? programTitles
    : programTitles.split(",").map((title) => title.trim());

  const pdfLinks: { [key: string]: string } = {
    Débutant:
      "https://res.cloudinary.com/dnkhbxpji/image/upload/v1738186631/Programmes_de_musculation_pour_les_de%CC%81butants._oh73ea.pdf",
    Intermédiaire:
      "https://res.cloudinary.com/dnkhbxpji/image/upload/v1738186609/Programmes_de_musculation_pour_les_interme%CC%81diaires._qc1rnz.pdf",
    Avancé:
      "https://res.cloudinary.com/dnkhbxpji/image/upload/v1738184043/Programmes_de_musculation_pour_les_avance%CC%81_e_s._1_tqz2uw.pdf",
  };

  const programs = isProgramTitlesArray.map((title) => {
    const url = pdfLinks[title] || "";

    return { title, url };
  });

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_USER as string,
      to: email,
      subject: "Vos programmes disponibles",
      react: React.createElement(EmailTemplateProgramContent, {
        programs: programs,
      }),
    });

    if (error) {
      console.error(
        "Erreur lors de l'envoi de l'email pour les programmes :",
        error,
      );
      throw new Error("Erreur lors de l'envoi de l'email des programmes.");
    }

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
      react: React.createElement(EmailTemplateResetPassword, {
        firstName: "Utilisateur",
        resetUrl: resetUrl,
      }),
    });

    if (error) {
      console.error(
        "Erreur lors de l'envoi de l'email de réinitialisation :",
        error,
      );
      throw new Error("Erreur lors de l'envoi de l'email de réinitialisation.");
    }

    return data;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    throw new Error("Erreur lors de l'envoi de l'email de réinitialisation.");
  }
}
