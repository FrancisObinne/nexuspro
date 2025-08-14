import React from "react";
import { DesktopHeader } from "@/components/header";
import Sidebar from "@/components/new-sidebar";
import { Outlet } from "react-router-dom";

// Inner component that can safely use useSidebar hook
export const DesktopLayout = () => {
  return (
    <div className="h-full bg-gray-50 flex w-full">
      <Sidebar />
      <div className={`w-full max-w-full flex flex-col gap-2 h-full`}>
        <DesktopHeader />
        <div className="flex-1 overflow-y-auto px-9 py-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
