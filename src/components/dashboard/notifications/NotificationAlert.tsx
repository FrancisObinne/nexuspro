
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Notification } from "./types";

interface NotificationAlertProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  notification: Notification | null;
  onMarkAsRead: () => void;
}

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
                  <span className="line-through text-red-700">{values.previous}</span>
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
              <AlertDialogCancel onClick={() => notification?.actions?.reject()}>
                Reject
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => notification?.actions?.approve()} className="bg-green-500 hover:bg-green-600">
                Approve
              </AlertDialogAction>
            </>
          ) : (
            <>
              <AlertDialogCancel>Close</AlertDialogCancel>
              <AlertDialogAction onClick={onMarkAsRead}>Mark as Read</AlertDialogAction>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
