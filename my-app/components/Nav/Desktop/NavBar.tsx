import { auth } from "@/lib/auth";
import NavComponent from "./NavComponent";
import { headers } from "next/headers";

const NavBar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return <NavComponent session={session} />;
};

export default NavBar;
