import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configure nodemailer avec le service SMTP de Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASSWORD, 
  },
});



export async function sendProgramEmail(email: string, programTitle: string) {

  const pdfAdvanced =
    "https://asset.cloudinary.com/dnkhbxpji/ce505e576514b559f3f62ee1ef1c9dcc";
  const pdfIntermediate =
    "https://asset.cloudinary.com/dnkhbxpji/fa1add14f226724bf445fdcb490c8386";
  const pdfBeginner =
    "https://asset.cloudinary.com/dnkhbxpji/d3e19a9781fa2dcbeace055a38040c74";

  let textContent = `Bonjour, voici ton programme acheté : ${programTitle}.`;
  let htmlContent = `<p>Bonjour,</p><p>Voici ton programme acheté : <strong>${programTitle}</strong>.</p>`;

  if (programTitle.includes("Débutant")) {
    textContent += `\n- Débutant : ${pdfBeginner}`;
    htmlContent += `<p><a href="${pdfBeginner}">Télécharger le programme Débutant</a></p>`;
  }
  if (programTitle.includes("Intermédiaire")) {
    textContent += `\n- Intermédiaire : ${pdfIntermediate}`;
    htmlContent += `<p><a href="${pdfIntermediate}">Télécharger le programme Intermédiaire</a></p>`;
  }
  if (programTitle.includes("Avancé")) {
    textContent += `\n- Avancé : ${pdfAdvanced}`;
    htmlContent += `<p><a href="${pdfAdvanced}">Télécharger le programme Avancé</a></p>`;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Ton programme ${programTitle} est prêt !`,
    text: textContent,
    html: htmlContent,
  };

  try {
     await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    console.error("Code d'erreur:", error.code);
    console.error("Message d'erreur:", error.message);
    console.error("Stack d'erreur:", error.stack);
  }
}
