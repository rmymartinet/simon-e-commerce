import { auth } from "../_lib/auths";
import CheckoutComponent from "./components/CheckoutComponent";

export default async function Checkout() {
  const session = await auth();

  return (
    <>
      <CheckoutComponent session={session} />
    </>
  );
}
