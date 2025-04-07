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
      "https://asset.cloudinary.com/dnkhbxpji/d3e19a9781fa2dcbeace055a38040c74",
    Intermédiaire:
      "https://asset.cloudinary.com/dnkhbxpji/fa1add14f226724bf445fdcb490c8386",
    Avancé:
      "https://asset.cloudinary.com/dnkhbxpji/ce505e576514b559f3f62ee1ef1c9dcc",
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
