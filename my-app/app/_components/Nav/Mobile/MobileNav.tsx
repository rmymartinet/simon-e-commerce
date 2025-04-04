import React from "react";
import MobileNavComponent from "./MobileNavComponent";
import { auth } from "@/app/_lib/auths";

const MobileNav = async () => {
  const session = await auth();
  return (
    <>
      <MobileNavComponent session={session} />
    </>
  );
};

export default MobileNav;
