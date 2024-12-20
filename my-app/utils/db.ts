import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export async function getUserFromDb(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null; // L'utilisateur n'existe pas.
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null; // Mot de passe incorrect.
    }

    return user; // Authentification réussie.
  } catch (error) {
    console.error("Error fetching user from database:", error);
    throw error;
  }
}

export async function createUserInDb(email: string, password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return user;
  } catch (err) {
    console.error("Error creating user in database:", err);
    throw err;
  }
}
