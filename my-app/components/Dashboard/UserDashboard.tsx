"use client";

import { useState } from "react";

import {
  PurchaseItemProps,
  SubscriptionInfosProps,
  UserDataProps,
} from "@/types/types";
import UserProfile from "./UserProfile";
import UserFilter from "./UserFIlter";
import UserPurchaseHistory from "./UserPurchaseHistory";
import UserProgramPanel from "./UserProgramPanel";
import UserCoachingPanel from "./UserCoachingPanel";

const UserDashboard = ({
  userData,
  allPurchases,
  subscriptionInfos,
}: {
  userData: UserDataProps;
  allPurchases: PurchaseItemProps[];
  subscriptionInfos: SubscriptionInfosProps;
}) => {
  const [isProgram, setIsProgram] = useState("program");

  return (
    <div className="relative flex flex-col gap-10">
      <UserProfile userData={userData} />
      <UserFilter isProgram={isProgram} setIsProgram={setIsProgram} />
      <div className="relative flex flex-col-reverse gap-10 lg:grid lg:grid-cols-2">
        <UserPurchaseHistory allPurchases={allPurchases} />

        {isProgram === "program" ? (
          <UserProgramPanel userData={userData} />
        ) : (
          <UserCoachingPanel subscriptionInfos={subscriptionInfos} />
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
