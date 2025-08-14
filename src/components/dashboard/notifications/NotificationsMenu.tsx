
import React from "react";
import { Bell, X, AlertTriangle } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Notification } from "./types";

interface NotificationsMenuProps {
  notifications: Notification[];
  unreadCount: number;
  onNotificationClick: (notification: Notification) => void;
}

export const NotificationsMenu: React.FC<NotificationsMenuProps> = ({
  notifications,
  unreadCount,
  onNotificationClick
}) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "approval":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "alert":
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-2 border-b border-gray-100">
          <h3 className="font-medium">Notifications</h3>
        </div>
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <DropdownMenuItem 
              key={notification.id}
              className={`p-3 cursor-pointer ${!notification.read ? 'bg-gray-50' : ''}`}
              onClick={() => onNotificationClick(notification)}
            >
              <div className="flex items-start">
                <div className="mr-2 mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                <div>
                  <p className="font-medium text-sm">{notification.title}</p>
                  <p className="text-xs text-gray-500">{notification.message}</p>
                  {notification.changedFields && Object.keys(notification.changedFields).length > 0 && (
                    <p className="text-xs italic text-blue-600 mt-1">
                      {Object.keys(notification.changedFields).length} field(s) modified
                    </p>
                  )}
                </div>
              </div>
            </DropdownMenuItem>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            No notifications
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
