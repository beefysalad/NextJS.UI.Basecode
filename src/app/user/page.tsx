import { auth } from "@/lib/auth";
import React from "react";

const UserPage = async () => {
  const session = await auth();
  return (
    <>
      <h1>{session?.user?.name}</h1>
      <h1>{session?.user?.email}</h1>
      <h1>{session?.user?.id}</h1>
    </>
  );
};

export default UserPage;
