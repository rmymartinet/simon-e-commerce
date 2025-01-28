import { auth } from "../_lib/auth";
import CheckoutComponent from "./components/CheckoutComponent";

export default async function Checkout() {
  const session = await auth();

  return (
    <>
      <CheckoutComponent session={session} />
    </>
  );
}
