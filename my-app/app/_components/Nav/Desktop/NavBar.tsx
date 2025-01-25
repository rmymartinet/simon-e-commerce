import { auth } from "@/app/_lib/auth";
import NavComponent from "./NavComponent";

const NavBar = async () => {
  const session = await auth();

  return <NavComponent session={session} />;
};

export default NavBar;
