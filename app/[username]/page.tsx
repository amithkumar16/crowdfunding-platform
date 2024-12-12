"use client";
import React from "react";
import Paymentpage from "@/components/Paymentpage";

const Username = ({ params }) => {
  const { username } = params; // Get username from params directly

  return (
    <>
      <Paymentpage username={username} />
    </>
  );
};

export default Username;
