import PrincingComponents from "../_components/PrincingComponents";
import { auth } from "../_lib/auths";

export default async function Pricing() {
  const session = await auth();
  return (
    <div className="relative mt-[20vh] flex min-h-screen w-screen flex-col items-center justify-center gap-20 px-4">
      <PrincingComponents session={session} />
    </div>
  );
}
