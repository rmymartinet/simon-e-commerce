import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getUserDashboardData() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  const userData = await prisma.user.findUnique({
    where: { email: session.user.email ?? undefined },
    include: {
      Purchase: {
        select: {
          id: true,
          amount: true,
          createdAt: true,
          userPurchaseData: true,
          subscriptionData: true,
        },
      },
    },
  });

  if (!userData) redirect("/auth/signin");

  return { userData, session };
}
