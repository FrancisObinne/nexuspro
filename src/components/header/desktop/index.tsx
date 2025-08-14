import React from "react";
import { useNotifications } from "@/hooks";
import {
  NotificationAlert,
  NotificationsMenu,
  ProfileSection,
} from "@/components/notification";
import { useTitle } from "@/hooks/useTitle";
import { getTokenFromLocalStore } from "@/lib";
import { IUser } from "@/types/user";

export const DesktopHeader = () => {
  const { title } = useTitle();
  const {
    notifications,
    unreadCount,
    selectedNotification,
    isAlertOpen,
    setIsAlertOpen,
    handleNotificationClick,
    handleMarkAsRead,
  } = useNotifications();

  const userInfo: IUser = getTokenFromLocalStore("user");

  return (
    <div className="flex justify-between items-center mb-8 px-9 h-[84px] bg-white">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center space-x-4">
        <NotificationsMenu
          notifications={notifications}
          unreadCount={unreadCount}
          onNotificationClick={handleNotificationClick}
        />

        <ProfileSection
          name={userInfo?.firstName + " " + userInfo?.lastName}
          role={userInfo?.role}
          avatarUrl=""
        />
      </div>

      <NotificationAlert
        isOpen={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        notification={selectedNotification}
        onMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
};
