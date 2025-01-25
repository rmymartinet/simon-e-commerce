import PrincingComponents from "../_components/PrincingComponents";
import { auth } from "../_lib/auth";

export default async function Pricing() {
  const session = await auth();
  return (
    <div className="relative mt-[30vh] flex min-h-screen w-screen flex-col items-center justify-center gap-40 overflow-hidden">
      <div className="absolute left-0 top-0 -z-10 h-full w-full"></div>
      <PrincingComponents session={session} />
    </div>
  );
}
