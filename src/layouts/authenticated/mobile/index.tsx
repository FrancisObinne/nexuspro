import React from "react";
import { MobileHeader } from "@/components/header";
import { Outlet } from "react-router-dom";

// Inner component that can safely use useSidebar hook
export const MobileLayout = () => {
  return (
    <div className="h-full bg-gray-50 flex w-full">
      <div className={`w-full flex flex-col gap-2 h-full`}>
        <MobileHeader />
        <div className="h-[90%] px-2 py-4 relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
