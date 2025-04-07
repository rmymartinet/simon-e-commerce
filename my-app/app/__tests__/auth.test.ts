import bcrypt from "bcrypt";
import { describe, expect, it, jest } from "@jest/globals";
import { getUserByEmail } from "../_lib/user";
import { singInSchema } from "../_lib/zod";
import { Role } from "@prisma/client";

// Mock explicitement la fonction pour TypeScript
jest.mock("../_lib/user", () => ({
  getUserByEmail: jest.fn(),
}));

const mockedGetUserByEmail = getUserByEmail as jest.MockedFunction<
  typeof getUserByEmail
>;

async function verifyPassword(plainPassword: string, hashedPassword: string) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

describe("verifyPassword", () => {
  it("devrait retourner true si les mots de passe correspondent", async () => {
    const password = "password123";
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await verifyPassword(password, hashedPassword);
    expect(result).toBe(true);
  });

  it("devrait retourner false si les mots de passe ne correspondent pas", async () => {
    const password = "password123";
    const hashedPassword = await bcrypt.hash("author", 10);
    const result = await verifyPassword(password, hashedPassword);
    expect(result).toBe(false);
  });
});

const mockUser = {
  id: "user_123", // Obligatoire
  name: "Test User", // Optionnel mais fourni
  firstName: "Test",
  lastName: "User",
  username: "testuser",
  email: "test@example.com", // Obligatoire (unique)
  emailVerified: null, // Peut être null
  isTemporary: false,
  lastActive: new Date(),
  activationToken: null,
  activationTokenExpires: null,
  password: await bcrypt.hash("password123", 10), // Obligatoire
  image: "https://example.com/avatar.png",
  customerId: "cus_123",
  priceId: "price_456",
  stripeCustomerId: "stripe_789",
  subscriptionStartDate: new Date(),
  subscriptionEndDate: null,
  isSubscribed: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  role: Role.USER, // Ou "ADMIN" selon ton système
  subscriptionId: null,
  resetPasswordToken: null,
  resetPasswordExpires: null,

  // Relations (tu peux les mocker comme tableaux vides pour les tests unitaires)
  accounts: [],
  sessions: [],
  Authenticator: [],
  Purchase: [],
};

async function authorize(credentials: { email: string; userPassword: string }) {
  const isValidCredentials = await singInSchema.parseAsync(credentials);
  const user = await getUserByEmail(isValidCredentials.email);

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  if (!user.password) {
    throw new Error("Password not found");
  }

  const verifyPass = await bcrypt.compare(
    isValidCredentials.password,
    user.password,
  );

  if (!verifyPass) {
    throw new Error("Password not match");
  }

  return user;
}

describe("authorized", () => {
  it("devrait retourner l'utilisateur si les informations sont correctes", async () => {
    mockedGetUserByEmail.mockResolvedValue(mockUser);

    const credentials = {
      email: "test@example.com",
      userPassword: "password123",
    };
    const user = await authorize(credentials);

    expect(user).toEqual(mockUser);
  });
});
