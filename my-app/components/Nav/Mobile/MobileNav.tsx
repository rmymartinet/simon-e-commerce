import React from "react";
import MobileNavComponent from "./MobileNavComponent";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MobileNav = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log("MobileNav session", session);
  return (
    <>
      <MobileNavComponent session={session} />
    </>
  );
};

export default MobileNav;
