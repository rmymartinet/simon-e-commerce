"use server";

import { createSession, deleteSession } from "@/app/_lib/session";
import { redirect } from "next/navigation";
import { prisma } from "@/app/_lib/prisma";
import bcrypt from "bcrypt";
import { loginSchema, signupSchema } from "../_lib/zod";

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    if (process.env.NODE_ENV === "development") {
      console.log("Validation errors:", result.error.flatten().fieldErrors);
    }
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordValid) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(existingUser.id);

  redirect("/dashboard");
}

export async function signup(prevState: any, formData: FormData) {
  const result = signupSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = result.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      errors: {
        email: ["User already exists"],
      },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      isTemporary: true,
      createdAt: new Date(),
    },
  });

  await createSession(newUser.id);

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
