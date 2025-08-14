// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Button } from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { useToast } from "@/hooks/use-toast";
import { Bell, Check, Info, MessageSquare, X } from "lucide-react";
import React from "react";

export const UpcomingTasks = () => {
  const { toast } = useToast();
  const [selectedAlert, setSelectedAlert] = React.useState<unknown>(null);
  const [alerts, setAlerts] = React.useState([
    {
      title: "Medication Review",
      assignedTo: "Dr. Sarah Wilson",
      time: "10:00 AM",
      priority: "High",
      description:
        "Review patient medication schedule and adjust as necessary. Check for potential drug interactions with new prescriptions.",
    },
    {
      title: "Physical Therapy",
      assignedTo: "James Thompson",
      time: "11:30 AM",
      priority: "Medium",
      description:
        "Conduct physical therapy session focusing on mobility exercises. Update progress notes following the session.",
    },
    {
      title: "Care Plan Update",
      assignedTo: "Lisa Anderson",
      time: "02:00 PM",
      priority: "Normal",
      description:
        "Update patient care plan to include recent changes in dietary requirements and exercise regimen.",
    },
    {
      title: "Family Meeting",
      assignedTo: "Michael Brown",
      time: "03:30 PM",
      priority: "High",
      description:
        "Meet with patient's family to discuss treatment progress and address any concerns regarding home care arrangements.",
    },
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-orange-100 text-orange-800";
      case "Normal":
        return "bg-green-100 text-green-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const handleAlertClick = (alert: unknown) => {
    setSelectedAlert(alert);
  };

  const handleClose = () => {
    setSelectedAlert(null);
  };

  const handleMarkAsTreated = () => {
    // Remove the alert from the list
    setAlerts((prevAlerts) =>
      prevAlerts.filter((alert) => alert !== selectedAlert)
    );

    // Show success toast
    toast({
      title: "Alert marked as treated",
      description: `${selectedAlert.title} has been marked as treated`,
    });

    // Close the dialog
    setSelectedAlert(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Alerts</h2>
        <a href="#" className="text-green-600 text-sm hover:underline">
          View All
        </a>
      </div>
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-md border border-transparent hover:border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => handleAlertClick(alert)}
          >
            <div className="mt-1">
              <Bell className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{alert.title}</h3>
              <p className="text-gray-600 text-sm">{alert.assignedTo}</p>
              <div className="flex items-center mt-1">
                <span className="text-gray-500 text-xs">{alert.time}</span>
                <span
                  className={`${getPriorityColor(
                    alert.priority
                  )} text-xs px-2 py-0.5 rounded-full ml-2`}
                >
                  {alert.priority}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={selectedAlert !== null} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              {selectedAlert?.title}
            </DialogTitle>
            <DialogDescription>
              <div className="mt-2 space-y-3">
                <div className="flex items-center text-sm">
                  <span className="font-medium w-24">Assigned to:</span>
                  <span>{selectedAlert?.assignedTo}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="font-medium w-24">Time:</span>
                  <span>{selectedAlert?.time}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="font-medium w-24">Priority:</span>
                  <span
                    className={`${
                      selectedAlert
                        ? getPriorityColor(selectedAlert.priority)
                        : ""
                    } px-2 py-0.5 rounded-full text-xs`}
                  >
                    {selectedAlert?.priority}
                  </span>
                </div>
                <div className="pt-2">
                  <div className="flex items-center gap-2 text-sm font-medium mb-1">
                    <MessageSquare className="h-4 w-4" />
                    Note:
                  </div>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                    {selectedAlert?.description}
                  </p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={handleClose}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleMarkAsTreated}>
              <Check className="mr-2 h-4 w-4" />
              Mark as Treated
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
