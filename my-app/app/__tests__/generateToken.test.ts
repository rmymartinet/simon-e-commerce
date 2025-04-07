jest.mock("../_lib/mailer", () => ({
  sendResetPasswordEmail: jest.fn(),
}));
import { generateResetToken } from "../_lib/generateToken";
import { sendResetPasswordEmail } from "../_lib/mailer";
test("generate a rest token", async () => {
  const email = "remymartin.bk@gmail.com";
  const { token, expires } = await generateResetToken(email);

  expect(token).toHaveLength(64);
  expect(expires).toBeInstanceOf(Date);

  expect(sendResetPasswordEmail).toHaveBeenCalledTimes(1);
});
