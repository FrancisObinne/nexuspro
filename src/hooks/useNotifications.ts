import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Notification } from "@/types/notification";
import { StaffMember } from "@/types/staff";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Missed Shift Alert",
      message: "John Doe (Caregiver) has missed his shift at 9:00 AM today.",
      read: false,
      type: "alert",
    },
    {
      id: 2,
      title: "User Details Update Request",
      message:
        "Emma Wilson has requested to update her contact information and address details.",
      read: false,
      type: "approval",
      actions: {
        approve: () => handleApproveChange(2),
        reject: () => handleRejectChange(2),
      },
    },
  ]);

  const [nextNotificationId, setNextNotificationId] = useState(3);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const { toast } = useToast();

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsAlertOpen(true);
  };

  const handleMarkAsRead = () => {
    if (selectedNotification) {
      setNotifications(
        notifications.map((n) =>
          n.id === selectedNotification.id ? { ...n, read: true } : n
        )
      );
      setIsAlertOpen(false);
      toast({
        title: "Notification marked as read",
        description: "The notification has been marked as read.",
      });
    }
  };

  const handleApproveChange = (notificationId: number) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
    setIsAlertOpen(false);
    toast({
      title: "User details update approved",
      description: "The user details update request has been approved.",
    });
  };

  const handleRejectChange = (notificationId: number) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
    setIsAlertOpen(false);
    toast({
      title: "User details update rejected",
      description: "The user details update request has been rejected.",
    });
  };

  const handleApproveStaffChange = (
    notificationId: number,
    staff: StaffMember
  ) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
    setIsAlertOpen(false);
    toast({
      title: "Staff update approved",
      description: `The update request for ${staff.name} has been approved.`,
    });
  };

  const handleRejectStaffChange = (notificationId: number) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
    setIsAlertOpen(false);
    toast({
      title: "Staff update rejected",
      description: "The staff update request has been rejected.",
    });
  };

  const handleApproveServiceUserCreation = (notificationId: number) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
    setIsAlertOpen(false);
    toast({
      title: "Service User approved",
      description: "The new service user has been approved.",
    });
  };

  const handleRejectServiceUserCreation = (notificationId: number) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
    setIsAlertOpen(false);
    toast({
      title: "Service User rejected",
      description: "The new service user has been rejected.",
    });
  };

  const handleApproveTaskAddition = (notificationId: number) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
    setIsAlertOpen(false);
    toast({
      title: "Task approved",
      description: "The new task has been approved.",
    });
  };

  const handleRejectTaskAddition = (notificationId: number) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
    setIsAlertOpen(false);
    toast({
      title: "Task rejected",
      description: "The new task has been rejected.",
    });
  };

  useEffect(() => {
    const handleStaffUpdateNotification = (event: Event) => {
      const { staff, changedFields } = (event as CustomEvent).detail;

      const newNotification = {
        id: nextNotificationId,
        title: "Staff Details Update Request",
        message: `${staff.name} (${staff.role}) has requested to update their details.`,
        read: false,
        type: "approval",
        staff,
        changedFields,
        actions: {
          approve: () => handleApproveStaffChange(nextNotificationId, staff),
          reject: () => handleRejectStaffChange(nextNotificationId),
        },
      };

      setNotifications((prev) => [newNotification, ...prev]);
      setNextNotificationId((prev) => prev + 1);

      toast({
        title: "New notification",
        description: "A staff update request requires your approval.",
      });
    };

    // Add service user notification listener
    const handleServiceUserNotification = (event: Event) => {
      const { user } = (event as CustomEvent).detail;

      const newNotification = {
        id: nextNotificationId,
        title: "New Service User Created",
        message: `${user.fullName} has been added as a service user with ${user.rating} rating.`,
        read: false,
        type: "approval",
        serviceUser: user,
        actions: {
          approve: () => handleApproveServiceUserCreation(nextNotificationId),
          reject: () => handleRejectServiceUserCreation(nextNotificationId),
        },
      };

      setNotifications((prev) => [newNotification, ...prev]);
      setNextNotificationId((prev) => prev + 1);

      toast({
        title: "New notification",
        description: "A new service user requires your approval.",
      });
    };

    // Add task notification listener
    const handleTaskNotification = (event: Event) => {
      const { task } = (event as CustomEvent).detail;

      const newNotification = {
        id: nextNotificationId,
        title: "New Task Added",
        message: `A new task "${task.title}" has been added for ${task.serviceUser}.`,
        read: false,
        type: "approval",
        task: task,
        actions: {
          approve: () => handleApproveTaskAddition(nextNotificationId),
          reject: () => handleRejectTaskAddition(nextNotificationId),
        },
      };

      setNotifications((prev) => [newNotification, ...prev]);
      setNextNotificationId((prev) => prev + 1);

      toast({
        title: "New notification",
        description: "A new task requires your approval.",
      });
    };

    document.addEventListener(
      "addStaffUpdateNotification",
      handleStaffUpdateNotification as EventListener
    );
    document.addEventListener(
      "addServiceUserNotification",
      handleServiceUserNotification as EventListener
    );
    document.addEventListener(
      "addTaskNotification",
      handleTaskNotification as EventListener
    );

    return () => {
      document.removeEventListener(
        "addStaffUpdateNotification",
        handleStaffUpdateNotification as EventListener
      );
      document.removeEventListener(
        "addServiceUserNotification",
        handleServiceUserNotification as EventListener
      );
      document.removeEventListener(
        "addTaskNotification",
        handleTaskNotification as EventListener
      );
    };
  }, [nextNotificationId, toast]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    unreadCount,
    selectedNotification,
    isAlertOpen,
    setIsAlertOpen,
    handleNotificationClick,
    handleMarkAsRead,
  };
};
