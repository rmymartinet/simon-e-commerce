jest.mock("stripe", () => {
  return jest.fn().mockImplementation(() => ({
    subscriptions: {
      update: jest.fn().mockResolvedValue({
        id: "sub_123",
        object: "subscription",
        cancel_at: 1700000000, // Timestamp arbitraire
        status: "active",
      }),
    },
  }));
});

import Stripe from "stripe";

// ✅ Vérifier que le mock fonctionne
const stripeInstance = new Stripe(""); // Simulation d'une instance Stripe
console.log("Stripe mock:", stripeInstance.subscriptions.update);

jest.mock("stripe", () => {
  return jest.fn().mockImplementation(() => {
    return {
      subscriptions: {
        update: jest.fn().mockResolvedValue({
          id: "sub_123",
          object: "subscription",
          cancel_at: 1700000000,
          status: "active",
        }),
      },
    };
  });
});

test("Stripe subscriptions.update doit être appelé", async () => {
  const stripeInstance = new Stripe("");

  const response = await stripeInstance.subscriptions.update("sub_123", {
    cancel_at: 1700000000,
  });

  expect(stripeInstance.subscriptions.update).toHaveBeenCalledWith("sub_123", {
    cancel_at: 1700000000,
  });

  expect(response).toEqual({
    id: "sub_123",
    object: "subscription",
    cancel_at: 1700000000,
    status: "active",
  });
});
