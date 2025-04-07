import PrincingComponents from "@/components/PrincingComponents";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Pricing() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="relative mt-[20vh] flex min-h-screen w-screen flex-col items-center justify-center gap-20 px-4">
      <PrincingComponents session={session} />
    </div>
  );
}
