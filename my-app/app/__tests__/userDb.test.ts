jest.mock("../_lib/prisma", () => ({
  __esModule: true, // ✅ Permet à Jest de reconnaître un module ES
  prisma: {
    user: {
      update: jest.fn().mockResolvedValue({
        id: "user_123",
        email: "test@example.com",
        subscriptionId: "sub_123",
        subscriptionStatus: "active",
      }),
    },
  },
}));

jest.mock("stripe", () => {
  return jest.fn().mockImplementation(() => ({
    subscriptions: {
      update: jest.fn().mockResolvedValue({
        id: "sub_123",
        object: "subscription",
        cancel_at: 1700000000,
        status: "active",
      }),
    },
  }));
});

import Stripe from "stripe";
import { prisma } from "../_lib/prisma";

const stripeInstance = new Stripe("sk_test_123");

test("L'utilisateur doit être mis à jour dans UserPrisma après la mise à jour Stripe", async () => {
  const response = await stripeInstance.subscriptions.update("sub_123", {
    cancel_at: 1700000000,
  });

  expect(response).toEqual({
    id: "sub_123",
    object: "subscription",
    cancel_at: 1700000000,
    status: "active",
  });

  await prisma.user.update({
    where: { id: "user_123" },
    data: { isSubscribed: response.status === "active" },
  });

  expect(prisma.user.update).toHaveBeenCalledWith({
    where: { id: "user_123" },
    data: { isSubscribed: true },
  });
});
