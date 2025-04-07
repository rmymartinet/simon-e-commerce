import { auth } from "@/lib/auth";
import CheckoutComponent from "./components/CheckoutComponent";
import { headers } from "next/headers";

export default async function Checkout() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <CheckoutComponent session={session} />
    </>
  );
}
