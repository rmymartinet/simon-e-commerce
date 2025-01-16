import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/app/_lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: "Activation token is required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        activationToken: token,
        activationTokenExpires: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired activation token" },
        { status: 400 },
      );
    }

    if (!password) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          isTemporary: false,
          activationToken: null,
          activationTokenExpires: null,
        },
      });

      return NextResponse.json({
        message: "Account activated successfully.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        isTemporary: false,
        activationToken: null,
        activationTokenExpires: null,
      },
    });

    return NextResponse.json({
      message: "Account activated and password set successfully.",
    });
  } catch (err) {
    console.error("Error in POST /api/activate:", err);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }

  const user = await prisma.user.findFirst({
    where: { activationToken: token },
  });

  if (!user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  if (
    !user.activationTokenExpires ||
    user.activationTokenExpires < new Date()
  ) {
    return NextResponse.json({ error: "Token expired" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      activationToken: null,
      activationTokenExpires: null,
      isTemporary: false,
    },
  });

  return NextResponse.json({ message: "Account activated successfully" });
}
