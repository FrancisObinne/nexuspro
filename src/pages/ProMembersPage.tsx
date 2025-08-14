import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const ProMembersPage = () => {
  const { profile } = useSelector((state: RootState) => state.profile);

  if (profile?.membershipTier !== "pro") {
    return (
      <p className="text-center mt-8">
        You must be a Pro member to view this page.
      </p>
    );
  }

  return (
    <div className="text-center mt-8">
      <h2 className="text-2xl font-bold">Welcome, Pro Member!</h2>
      <p className="mt-4">This content is exclusively for our Pro members.</p>
    </div>
  );
};

export default ProMembersPage;
