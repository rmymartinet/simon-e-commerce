import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendResetPasswordEmail(email: string, token: string) {
  const resetUrl = `https://www.smartinet-coaching.com/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Réinitialisation du mot de passe",
    text: `Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${resetUrl}`,
    html: `<p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien suivant pour réinitialiser votre mot de passe :</p><p><a href="${resetUrl}">Réinitialiser le mot de passe</a></p>`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(
          "Erreur lors de l'envoi de l'email de réinitialisation :",
          error,
        );
        reject(
          new Error("Erreur lors de l'envoi de l'email de réinitialisation."),
        );
      } else {
        console.log("Email de réinitialisation envoyé à :", email);
        resolve(info);
      }
    });
  });
}

export { sendResetPasswordEmail };
