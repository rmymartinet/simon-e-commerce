import { prisma } from "@/app/_lib/prisma";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

async function hashPassword(plainPassword: string) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
}

export default async function POST(req: NextRequest) {
  console.log("req", req);
  const body = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email ?? "",
    },
  });

  try {
    if (user) {
      return {
        status: 400,
        body: { message: "User already exists" },
      };
    } else {
      const hashedPassword = await hashPassword(body.password);
      await prisma.user.create({
        data: {
          email: body.email,
          password: hashedPassword,
        },
      });
    }
  } catch (error) {
    return {
      status: 500,
      body: { message: "An error occurred", error },
    };
  }

  return {
    status: 200,
    body: { message: "User created" },
  };
}
