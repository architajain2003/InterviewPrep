// "use client";

import React from "react";
import Agents from "@/components/Agents";
import { getCurrentUser } from "@/lib/actions/auth.actions";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <h3>Interview Generation</h3>
      <Agents userName={user?.name || ""} userId={user?.id} type="generate" />
    </>
  );
};

export default Page;
