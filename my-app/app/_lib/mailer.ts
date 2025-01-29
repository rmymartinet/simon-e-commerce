import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configure nodemailer avec ton service d'email
const transporter = nodemailer.createTransport({
  service: "gmail", // Exemple avec Gmail
  auth: {
    user: process.env.EMAIL_USER, // Ton email
    pass: process.env.EMAIL_PASSWORD, // Ton mot de passe d'application
  },
});

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD);

export async function sendProgramEmail(email: string, programTitle: string) {
  const pdfAdvanced =
    "https://asset.cloudinary.com/dnkhbxpji/ce505e576514b559f3f62ee1ef1c9dcc";
  const pdfIntermediate =
    "https://asset.cloudinary.com/dnkhbxpji/fa1add14f226724bf445fdcb490c8386";
  const pdfBeginner =
    "https://asset.cloudinary.com/dnkhbxpji/d3e19a9781fa2dcbeace055a38040c74";

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Ton programme ${programTitle} est prêt !`,
    text: `Bonjour, voici ton programme acheté : ${programTitle}. Tu peux le télécharger en cliquant sur le lien suivant : ${programTitle === "Intermédiaire" ? pdfIntermediate : programTitle === "Avancé" ? pdfAdvanced : pdfBeginner}`,
    html: `<p>Bonjour,</p><p>Voici ton programme acheté : <strong>${programTitle}</strong>.</p><p>Tu peux le télécharger en cliquant sur le lien suivant : <a href="${programTitle === "Intermédiaire" ? pdfIntermediate : programTitle === "Avancé" ? pdfAdvanced : pdfBeginner}">Télécharger le programme</a></p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé:", info.response);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
  }
}
