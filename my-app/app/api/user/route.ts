import { prisma } from "@/app/_lib/prisma";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    console.log("req.body", email, name);

    if (!req) {
      throw new Error("No request object provided");
    }

    if (!name || !email) {
      console.log("Missing required fields");
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: { name: name, email: email },
    });

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.error(e);
    }

    return NextResponse.json({ message: "An error occurred" }, { status: 500 });

    return;
  }
}
