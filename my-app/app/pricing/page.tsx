import PrincingComponents from "../_components/PrincingComponents";
import { auth } from "../_lib/auth";

export default async function Pricing() {
  const session = await auth();
  return (
    <div className="relative mt-[30vh] flex min-h-screen w-screen flex-col items-center justify-center gap-40 px-4">
      <PrincingComponents session={session} />
    </div>
  );
}
