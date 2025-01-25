import { auth } from "@/app/_lib/auth";
import { prisma } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userData = await prisma.user.findUnique({
    where: { email: session?.user?.email ?? undefined },
  });

  if (!userData) {
    return NextResponse.json(
      { error: "User not found in the database" },
      { status: 404 },
    );
  }

  return NextResponse.json(userData, { status: 200 });
}
