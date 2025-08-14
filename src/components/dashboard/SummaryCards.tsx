import { Button } from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { useDashboardStat } from "@/hooks/queries/dashboard";
import { ClipboardCheck, FileText, UserCog, Users, X } from "lucide-react";
import React from "react";

export const SummaryCards = () => {
  const [selectedCard, setSelectedCard] = React.useState<number | null>(null);

  const { data } = useDashboardStat();

  const cards = [
    {
      title: "Total Service Users",
      value: data.userTypeDistribution.SERVICE_USER || 0,
      icon: <Users className="h-6 w-6 text-green-600" />,
      details: `${
        data.userTypeDistribution.SERVICE_USER || 0
      } service users are currently registered in the system. This includes both active and inactive users.`,
    },

    {
      title: "Active Task",
      value: data.totalTaskCount || 0,
      icon: <FileText className="h-6 w-6 text-green-600" />,
      details: `${
        data.totalTaskCount || 0
      } Task are currently active. These include Task that have been approved and are being implemented.`,
    },
    {
      title: "Staff Members",
      value: data.userTypeDistribution.SERVICE_USER,
      icon: <UserCog className="h-6 w-6 text-green-600" />,
      details: `${
        data.userTypeDistribution.SERVICE_USER || 0
      } staff members are currently registered in the system. This includes care providers, administrators, and support staff.`,
    },
    {
      title: "Pending Tasks",
      value: data?.totalTaskCount || 0,
      icon: <ClipboardCheck className="h-6 w-6 text-green-600" />,
      details:
        "18 tasks are currently pending. These tasks require attention from staff members and should be addressed soon.",
    },
  ];

  const handleCardClick = (index: number) => {
    setSelectedCard(index);
  };

  const handleClose = () => {
    setSelectedCard(null);
  };

  return (
    <>
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleCardClick(index)}
        >
          <div className="flex justify-between items-center mb-2">
            {card.icon}
            <button className="text-gray-400 hover:text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-bold">{card.value}</h2>
            <p className="text-gray-600 text-sm mt-1">{card.title}</p>
          </div>
        </div>
      ))}

      <Dialog open={selectedCard !== null} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedCard !== null && cards[selectedCard].icon}
              {selectedCard !== null && cards[selectedCard].title}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-lg font-bold mb-2">
              {selectedCard !== null && cards[selectedCard]?.value}
            </p>
            <p className="text-gray-600">
              {selectedCard !== null && cards[selectedCard]?.details}
            </p>
          </div>
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
