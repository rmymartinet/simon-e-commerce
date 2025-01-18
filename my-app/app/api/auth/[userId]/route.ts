import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const userId = (await params).userId;

  if (!userId) {
    console.error("User ID is required");
    return new Response("User ID is required", { status: 400 });
  }

  return NextResponse.json({ userId }, { status: 200 });
}
