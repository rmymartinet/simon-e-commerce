import { auth } from "@/app/_lib/auths";
import NavComponent from "./NavComponent";

const NavBar = async () => {
  const session = await auth();

  return <NavComponent session={session} />;
};

export default NavBar;
