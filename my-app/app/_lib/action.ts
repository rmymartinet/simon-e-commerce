import { executeAction } from "./executeAction";
import { prisma } from "./prisma";
import { signUpSchema } from "./zod";

import bcrypt from "bcrypt";

async function hashPassword(plainPassword: string) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
}

const signUp = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const validatedData = signUpSchema.parse({ name, email, password });

      const pswHash = await hashPassword(validatedData.password);

      await prisma.user.create({
        data: {
          name: name as string,
          email: validatedData.email.toLocaleLowerCase(),
          password: pswHash,
        },
      });
    },
    successMessage: "Signed up successfully",
  });
};

export { signUp };
