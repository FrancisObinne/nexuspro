import React from "react";
import { menuItems } from "@/constants/routes";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
// import appcare from "@/assets/app-care.png";
import { UserType } from "@/types/user";

export default function Sidebar() {
  const { isExpanded, toggleSidebar } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const userType: UserType = "admin";

  return (
    <div
      className={`h-full border-r border-[#E4E7EC] transition-width duration-300 z-50 relative ${
        isExpanded ? "min-w-[300px] w-[300px]" : "w-[100px]"
      }`}
      style={{ overflow: "visible" }}
    >
      <div className="w-full h-full flex flex-col px-3 py-5 bg-white z-[100]">
        <div className="flex flex-col gap-5 h-fit relative justify-center items-center">
          <div className="w-full flex justify-between items-center h-14">
            {/* <img src={!isExpanded ? appcare : appcare} alt="Logo" /> */}
          </div>
          <div className="h-[30px] absolute right-0  flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md bg-slate-300 hover:bg-slate-400 transition-colors"
              aria-label={isExpanded ? "Expand sidebar" : "Collapse sidebar"}
            >
              {!isExpanded ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-x-hidden">
          <div className="w-full px-2 flex flex-col gap-1 ">
            <nav>
              <ul className="space-y-1">
                {menuItems.map((item) => {
                  if (!item.grantPermission.includes(userType)) return null;
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={cn(
                          "flex items-center p-3 rounded-md text-sm font-medium transition-colors",
                          currentPath === item.to ||
                            currentPath.startsWith(item.to + "/")
                            ? "bg-green-50 text-green-600 border-l-4 border-green-500"
                            : "text-gray-600 hover:bg-gray-100",
                          !isExpanded && "justify-center p-2"
                        )}
                        title={!isExpanded ? item.label : undefined}
                      >
                        <span className={cn("", !isExpanded ? "" : "mr-3")}>
                          {item.Icon}
                        </span>
                        {isExpanded && item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>

        <div className="w-full px-2 flex flex-col gap-1 h-fit"></div>
      </div>
    </div>
  );
}
