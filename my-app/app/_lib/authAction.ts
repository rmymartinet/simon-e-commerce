"use server";

import { signIn } from "@/app/_lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { signUpSchema } from "./zod";
import { hashPassword } from "./hashPassword";

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

export async function signInWithGoogle() {
  return await signIn("google", { redirectTo: "/dashboard" });
}

export async function signUp(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const validatedData = signUpSchema.parse({ name, email, password });
  const pswHash = await hashPassword(validatedData.password);

  const existingUser = await prisma.user.findUnique({
    where: { email: validatedData.email.toLowerCase() },
  });

  if (existingUser) {
    return {
      success: false,
      message: "L'adresse email est déjà utilisée.",
    };
  }

  await prisma.user.create({
    data: {
      name: name as string,
      email: validatedData.email.toLowerCase(),
      password: pswHash,
    },
  });

  return { success: true, message: "Inscription réussie" };
}
