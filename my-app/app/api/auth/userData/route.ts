import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

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
