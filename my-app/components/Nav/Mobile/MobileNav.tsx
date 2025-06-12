"use client";

import React from "react";
import MobileNavComponent from "./MobileNavComponent";
import { useAuth } from "@/app/context/AuthContext";

const MobileNav = () => {
  const { session } = useAuth();

  return (
    <>
      <MobileNavComponent session={session} />
    </>
  );
};

export default MobileNav;
