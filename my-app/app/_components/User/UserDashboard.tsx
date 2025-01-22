/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import UserProfile from "./UserProfile";
import UserFilter from "./UserFIlter";
import PurchaseHistory from "./PurchaseHistory";
import UserProgramPanel from "./UserProgramPanel";
import UserCoachingPanel from "./UserCoachingPanel";

interface UserDashboardProps {
  userData: any; // Replace 'any' with the appropriate type
  allPurchases: any; // Replace 'any' with the appropriate type
  programPurchases: any; // Replace 'any' with the appropriate type
  subscriptionInfos: any; // Replace 'any' with the appropriate type
}

const UserDashboard: React.FC<UserDashboardProps> = ({
  userData,
  allPurchases,
  programPurchases,
  subscriptionInfos,
}) => {
  const [isProgram, setIsProgram] = useState("program");


  return (
    <div className="relative flex flex-col gap-10">
      <div className="absolute right-0 top-0 -z-10 h-[20%] w-[90%]">
        <Image
          src="/images/cube_mono.jpeg"
          alt=""
          width={2000}
          height={2000}
          className="h-max w-max object-contain"
        />
      </div>
      <UserProfile userData={userData} />
      <UserFilter isProgram={isProgram} setIsProgram={setIsProgram} />
      <div className="relative flex flex-col-reverse gap-10 lg:grid lg:grid-cols-2">
        <PurchaseHistory allPurchases={allPurchases} />

        {isProgram === "program" ? (
          <UserProgramPanel programPurchases={programPurchases} />
        ) : (
          <UserCoachingPanel subscriptionInfos={subscriptionInfos} />
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
