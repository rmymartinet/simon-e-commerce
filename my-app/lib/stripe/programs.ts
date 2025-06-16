import Stripe from "stripe";
import { prisma } from "../prisma";
  import { sendProgramEmail } from "../mailer";

export async function handleProgram(
  existingUser: { id: string; email: string },
  session: Stripe.Checkout.Session,
) {

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      stripeCustomerId:
        typeof session.customer === "string" ? session.customer : null,
    },
  });

  const email = existingUser.email
  const programTitle = session.metadata?.titlePlan as string;



  await sendProgramEmail(email, programTitle);

  const userPurchaseData = {
    titlePlan: programTitle,
  };

  return prisma.purchase.create({
    data: {
      email: existingUser.email, // ✅ obligatoire si le champ est non nullable dans Prisma
      userId: existingUser.id,
      amount: session.amount_total ? session.amount_total / 100 : 0,
      status: "completed",
      customerId: session.customer ? String(session.customer) : "",
      userPurchaseData: {
        create: userPurchaseData,
      },
      createdAt: new Date(),
    },
  });
}
