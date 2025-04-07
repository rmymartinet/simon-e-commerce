import Stripe from "stripe";
import { prisma } from "../prisma";
import { sendProgramEmail } from "../mailer";

export async function handleProgram(
  existingUser: { id: string },
  session: Stripe.Checkout.Session,
) {
  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      isSubscribed: session.metadata?.subscription ? true : false,
      stripeCustomerId:
        typeof session.customer === "string" ? session.customer : null,
    },
  });

  const email = session.customer_details?.email || "";
  const programTitle = session.metadata?.titlePlan as string;
  await sendProgramEmail(email, programTitle);

  const userPurchaseData = {
    titlePlan: session.metadata?.titlePlan as string,
  };

  return prisma.purchase.create({
    data: {
      userId: existingUser.id,
      amount: session.amount_total || 0,
      status: "completed",
      customerId: session.customer ? String(session.customer) : "",
      userPurchaseData: {
        create: userPurchaseData,
      },
      createdAt: new Date(),
    },
  });
}
