import { prisma } from "@/app/_lib/prisma";
import crypto from "crypto";
import { sendResetPasswordEmail } from "./mailer";

export async function generateResetToken(email: string) {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 3600000); // 1 heure

  await prisma.user.update({
    where: { email },
    data: {
      resetPasswordToken: token,
      resetPasswordExpires: expires,
    },
  });

  await sendResetPasswordEmail(email, token);
}
