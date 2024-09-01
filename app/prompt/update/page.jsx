"use client";

import { Suspense } from "react";

import EditPrompt from "@components/EditPrompt";
// comment
const UpdatePrompt = () => {
  return (
    <Suspense>
      <EditPrompt />
    </Suspense>
  );
};

export default UpdatePrompt;
