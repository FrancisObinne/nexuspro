import React from "react";
import { Avatar } from "../avatar";
import { AlertTriangle, Bell, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Notification } from "@/types/notification";
import { AvatarFallback, AvatarImage } from "../avatar";
import { clearAll } from "@/lib";
import { LogOut } from "lucide-react";

interface NotificationsMenuProps {
  notifications: Notification[];
  unreadCount: number;
  onNotificationClick: (notification: Notification) => void;
}

interface ProfileSectionProps {
  name: string;
  role: string;
  avatarUrl: string;
}

interface NotificationAlertProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  notification: Notification | null;
  onMarkAsRead: () => void;
}

export const NotificationsMenu: React.FC<NotificationsMenuProps> = ({
  notifications,
  unreadCount,
  onNotificationClick,
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
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={`p-3 cursor-pointer ${
                !notification.read ? "bg-gray-50" : ""
              }`}
              onClick={() => onNotificationClick(notification)}
            >
              <div className="flex items-start">
                <div className="mr-2 mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                <div>
                  <p className="font-medium text-sm">{notification.title}</p>
                  <p className="text-xs text-gray-500">
                    {notification.message}
                  </p>
                  {notification.changedFields &&
                    Object.keys(notification.changedFields).length > 0 && (
                      <p className="text-xs italic text-blue-600 mt-1">
                        {Object.keys(notification.changedFields).length}{" "}
                        field(s) modified
                      </p>
                    )}
                </div>
              </div>
            </DropdownMenuItem>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">No notifications</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  name,
  role,
  avatarUrl,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center cursor-pointer">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <div className="font-medium">{name}</div>
            <div className="text-gray-500 text-xs">{role}</div>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 mt-2" align="end">
        <DropdownMenuItem
          onClick={() => clearAll()}
          className="flex items-center gap-2 cursor-pointer"
        >
          <LogOut size={16} />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export const NotificationAlert: React.FC<NotificationAlertProps> = ({
  isOpen,
  onOpenChange,
  notification,
  onMarkAsRead,
}) => {
  const renderChangedFields = () => {
    if (!notification?.changedFields) return null;

    return (
      <div className="mt-4 border-t pt-2">
        <p className="font-medium mb-2 text-sm">Changes requested:</p>
        <div className="space-y-2">
          {Object.entries(notification.changedFields).map(([field, values]) => (
            <div key={field} className="flex flex-col">
              <div className="text-xs font-medium capitalize">{field}:</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-red-50 p-1 rounded">
                  <span className="line-through text-red-700">
                    {values.previous}
                  </span>
                </div>
                <div className="bg-green-50 p-1 rounded">
                  <span className="text-green-700">{values.current}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{notification?.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {notification?.message}
            {renderChangedFields()}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {notification?.type === "approval" ? (
            <>
              <AlertDialogCancel
                onClick={() => notification?.actions?.reject()}
              >
                Reject
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => notification?.actions?.approve()}
                className="bg-green-500 hover:bg-green-600"
              >
                Approve
              </AlertDialogAction>
            </>
          ) : (
            <>
              <AlertDialogCancel>Close</AlertDialogCancel>
              <AlertDialogAction onClick={onMarkAsRead}>
                Mark as Read
              </AlertDialogAction>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
