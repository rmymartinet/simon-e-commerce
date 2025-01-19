import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encodedKey);
}

export async function decrypt(session: string) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session", error);
    return null;
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
  const session = await encrypt({ userId, expiresAt });

  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) return null;

  const decryptedSession = await decrypt(session);

  if (!decryptedSession) {
    await deleteSession();
    return null;
  }

  console.log("decryptedSession", decryptedSession);
  return {
    userId: decryptedSession.userId,
    expiresAt: decryptedSession.expiresAt,
  };
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
