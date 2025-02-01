import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  socketTimeout: 10000,
  host: "smtp.gmail.com",
  port: 587,
  requireTLS: true,
  logger: true,
  debug: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendResetPasswordEmail(email: string, token: string) {
  const resetUrl = `https://www.smartinet-coaching.com/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Réinitialisation du mot de passe",
    text: `Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${resetUrl}`,
    html: `<p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien suivant pour réinitialiser votre mot de passe :</p><p><a href="${resetUrl}">Réinitialiser le mot de passe</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de l'email de réinitialisation :",
      error,
    );
    throw new Error("Erreur lors de l'envoi de l'email de réinitialisation.");
  }
}
