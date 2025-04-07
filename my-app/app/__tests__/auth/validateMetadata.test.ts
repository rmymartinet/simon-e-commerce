// describe("validateMetadata", () => {
//   test("should return true for valid metadata", () => {
//     const metadata = { months: "6", titlePlan: "Premium Plan" };
//     expect(validateMetadata(metadata)).toBe(true);
//   });

//   test("should return false for invalid metadata", () => {
//     expect(validateMetadata(null)).toBe(false); // Null metadata
//     expect(validateMetadata({ titlePlan: "Premium Plan" })).toBe(false); // Missing months
//     expect(
//       validateMetadata({ months: "not-a-number", titlePlan: "Premium Plan" }),
//     ).toBe(false); // Invalid months
//     expect(validateMetadata({ months: "6" })).toBe(false); // Missing titlePlan
//     expect(validateMetadata({ months: "6", titlePlan: "" })).toBe(false); // Empty titlePlan
//   });
// });
