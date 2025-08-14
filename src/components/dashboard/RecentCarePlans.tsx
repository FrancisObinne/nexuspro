import { Button } from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { FileText, Info, X } from "lucide-react";
import React from "react";

export const RecentCarePlans = () => {
  const [selectedPlan, setSelectedPlan] = React.useState<number | null>(null);

  const carePlans = [
    {
      serviceUser: "John Smith",
      assignedTo: "Sarah Wilson",
      status: "Active",
      lastUpdated: "2h ago",
      details:
        "Care plan includes daily medication reminders, physical therapy three times a week, and regular health check-ups. Last updated by Dr. Sarah Wilson.",
    },
    {
      serviceUser: "Emma Davis",
      assignedTo: "Michael Brown",
      status: "Review",
      lastUpdated: "4h ago",
      details:
        "Care plan requires review due to change in medication schedule. Assessment needed for progress on mobility exercises. Last updated by Michael Brown.",
    },
    {
      serviceUser: "Robert Johnson",
      assignedTo: "Lisa Anderson",
      status: "Active",
      lastUpdated: "6h ago",
      details:
        "Care plan includes specialized diet regimen, daily exercise routine, and weekly health monitoring. Last updated by Lisa Anderson.",
    },
    {
      serviceUser: "Mary Williams",
      assignedTo: "David Clark",
      status: "Pending",
      lastUpdated: "8h ago",
      details:
        "Care plan awaiting approval from supervisor. Includes recommendations for home assistance and mobility equipment. Last updated by David Clark.",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Review":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const handlePlanClick = (index: number) => {
    setSelectedPlan(index);
  };

  const handleClose = () => {
    setSelectedPlan(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Recent Task</h2>
        <a href="#" className="text-green-600 text-sm hover:underline">
          View All
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm border-b">
              <th className="pb-2 font-medium">Service User</th>
              <th className="pb-2 font-medium">Assigned To</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {carePlans.map((plan, index) => (
              <tr
                key={index}
                className="border-b last:border-0 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handlePlanClick(index)}
              >
                <td className="py-3 font-medium">{plan.serviceUser}</td>
                <td className="py-3 text-gray-600">{plan.assignedTo}</td>
                <td className="py-3">
                  <span
                    className={`${getStatusColor(
                      plan.status
                    )} text-xs px-2 py-1 rounded-full`}
                  >
                    {plan.status}
                  </span>
                </td>
                <td className="py-3 text-gray-500 text-sm">
                  {plan.lastUpdated}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={selectedPlan !== null} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Task Details
            </DialogTitle>
            <DialogDescription>
              <div className="mt-2 space-y-3">
                {selectedPlan !== null && (
                  <>
                    <div className="flex items-center text-sm">
                      <span className="font-medium w-24">Service User:</span>
                      <span>{carePlans[selectedPlan].serviceUser}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="font-medium w-24">Assigned To:</span>
                      <span>{carePlans[selectedPlan].assignedTo}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="font-medium w-24">Status:</span>
                      <span
                        className={`${getStatusColor(
                          carePlans[selectedPlan].status
                        )} px-2 py-0.5 rounded-full text-xs`}
                      >
                        {carePlans[selectedPlan].status}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="font-medium w-24">Last Updated:</span>
                      <span>{carePlans[selectedPlan].lastUpdated}</span>
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center gap-2 text-sm font-medium mb-1">
                        <Info className="h-4 w-4" />
                        Note:
                      </div>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                        {carePlans[selectedPlan].details}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
