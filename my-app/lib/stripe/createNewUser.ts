import crypto from "crypto";
import { prisma } from "../prisma";
import Stripe from "stripe";

function generateToken(length = 64): { token: string; expires: Date } {
  return {
    token: crypto.randomBytes(length).toString("hex"),
    expires: new Date(Date.now() + 3600000),
  };
}

export async function createNewUser(session: Stripe.Checkout.Session) {
  const { token: activationToken, expires: activationTokenExpires } =
    generateToken();
  const email = session.customer_details?.email || "";

  const newUser = await prisma.user.create({
    data: {
      email,
      password: crypto.randomBytes(16).toString("hex"),
      isTemporary: true,
      activationToken,
      activationTokenExpires,
      createdAt: new Date(),
    },
  });

  await prisma.purchase.create({
    data: {
      userId: newUser.id,
      customerId: session.customer ? String(session.customer) : "", // Vérifier le type de customerId
      amount: session.amount_total || 0,
      status: "completed",
      createdAt: new Date(),
    },
  });

  const activationLink = `http://localhost:3000/activate?token=${activationToken}`;
  console.log(`Activation email sent to ${email}: ${activationLink}`);
}
