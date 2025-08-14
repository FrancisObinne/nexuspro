import React, { useState } from "react";
import { useNotifications } from "@/hooks";
import {
  NotificationAlert,
  NotificationsMenu,
} from "@/components/notification";
import { useTitle } from "@/hooks/useTitle";
import { Menu, X } from "lucide-react";
import { menuItems } from "@/constants/routes";
import { Link, useLocation } from "react-router-dom";
import { UserType } from "@/types/user";
import { cn } from "@/lib/utils";
// import Link from "next/link";
// import { menuItems } from "@/constants/menuItems";
// import { useUser } from "@/hooks/useUser"; // You’ll need this to check roles

export const MobileHeader = () => {
  const { title } = useTitle();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const {
    notifications,
    unreadCount,
    selectedNotification,
    isAlertOpen,
    setIsAlertOpen,
    handleNotificationClick,
    handleMarkAsRead,
  } = useNotifications();

  const userType: UserType = "admin";

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      <div className="flex justify-between items-center mb-4 px-4 h-[70px] bg-white shadow relative">
        <div className="flex items-center space-x-4">
          {/* Hamburger Menu (shown only on mobile) */}
          <button className="md:hidden" onClick={toggleMenu}>
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          <h1 className="text-xl font-bold md:text-2xl">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <NotificationsMenu
            notifications={notifications}
            unreadCount={unreadCount}
            onNotificationClick={handleNotificationClick}
          />
        </div>
      </div>

      {menuOpen && (
        <div className="absolute left-0 top-[70px] z-10 px-4 pb-4 flex flex-col gap-4 w-full h-full bg-white">
          {menuItems.map((item) => {
            if (!item.grantPermission.includes(userType)) return null;
            return (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  "flex items-center p-2 rounded-md text-sm font-medium transition-colors",
                  currentPath === item.to ||
                    currentPath.startsWith(item.to + "/")
                    ? "bg-green-50 text-green-600 border-l-4 border-green-500"
                    : "text-gray-600 hover:bg-gray-100"
                )}
                onClick={() => setMenuOpen(false)}
              >
                {item.Icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}

      <NotificationAlert
        isOpen={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        notification={selectedNotification}
        onMarkAsRead={handleMarkAsRead}
      />
    </>
  );
};
