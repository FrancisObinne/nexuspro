import React from "react";
import { NotificationsMenu } from "./notifications/NotificationsMenu";
import { ProfileSection } from "./notifications/ProfileSection";
import { NotificationAlert } from "./notifications/NotificationAlert";
import { useNotifications } from "../../hooks/useNotifications";

interface DashboardHeaderProps {
  title?: string;
}

export const DashboardHeader = ({
  title = "Dashboard",
}: DashboardHeaderProps) => {
  const {
    notifications,
    unreadCount,
    selectedNotification,
    isAlertOpen,
    setIsAlertOpen,
    handleNotificationClick,
    handleMarkAsRead,
  } = useNotifications();

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center space-x-4">
        <NotificationsMenu
          notifications={notifications}
          unreadCount={unreadCount}
          onNotificationClick={handleNotificationClick}
        />

        <ProfileSection
          name="Sarah Wilson"
          role="Service Coordinator"
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
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
