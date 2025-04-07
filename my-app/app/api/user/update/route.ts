import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const userId = session?.user?.id;

  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, email, password } = body;

  const dataToUpdate: Record<string, any> = {};
  if (name) dataToUpdate.name = name;
  if (email) dataToUpdate.email = email;
  if (password) {
    const hashed = await bcrypt.hash(password, 10);
    dataToUpdate.password = hashed;
  }

  await prisma.user.update({
    where: { id: userId },
    data: dataToUpdate,
  });

  return NextResponse.json({ success: true });
}
