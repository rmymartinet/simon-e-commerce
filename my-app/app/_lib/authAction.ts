"use server";

import { signIn } from "@/app/_lib/auth";
import { redirect } from "next/navigation";
import { executeAction } from "./executeAction";
import { prisma } from "./prisma";
import { signUpSchema } from "./zod";

import bcrypt from "bcrypt";

async function hashPassword(plainPassword: string) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
}

// ✅ Server Action pour l'authentification par email/mot de passe
export async function authenticate(formData: FormData) {
  try {
    const result: { success: boolean; message: string } = await signIn(
      "credentials",
      formData,
    );
    if (!result.success) {
      return redirect(`/sign-in?error=${encodeURIComponent(result.message)}`);
    }
    return redirect("/dashboard");
  } catch (error) {
    console.error(error);
    return redirect(
      `/sign-in?error=${encodeURIComponent("Votre adresse mail ou mot de passe sont incorrect.")}`,
    );
  }
}

// ✅ Server Action pour l'authentification via Google

export async function signInWithGoogle() {
  return await signIn("google", { redirectTo: "/dashboard" });
}

export async function signUp(formData: FormData) {
  return executeAction({
    actionFn: async () => {
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const validatedData = signUpSchema.parse({ name, email, password });
      const pswHash = await hashPassword(validatedData.password);

      const existingUser = await prisma.user.findUnique({
        where: { email: validatedData.email.toLocaleLowerCase() },
      });

      if (existingUser) {
        // En production, renvoyer une erreur générique
        throw new Error("Email déjà pris"); // Message d'erreur simplifié pour la production
      }

      await prisma.user.create({
        data: {
          name: name as string,
          email: validatedData.email.toLocaleLowerCase(),
          password: pswHash,
        },
      });
    },

    successMessage: "Inscription réussie",
  });
}
