import { Resend } from "resend";
import dotenv from "dotenv";
import { EmailTemplate } from "../_components/EmailTemplate";

dotenv.config();

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

export async function sendResetPasswordEmail(email: string, token: string) {
  const resetUrl = `https://www.smartinet-coaching.com/reset-password?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_USER as string,
      to: email,
      subject: "Réinitialisation du mot de passe",
      react: await EmailTemplate({ firstName: "Utilisateur", resetUrl }),
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
