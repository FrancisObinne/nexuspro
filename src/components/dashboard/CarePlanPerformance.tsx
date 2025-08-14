// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/dialog";
import { Button } from "@/components/button";
import { Badge } from "@/components/badge";
import { ClockAlert } from "lucide-react";

// Mock data for care givers who missed their tasks
const missedTasksData = {
  Mon: [
    {
      id: 1,
      name: "Sarah Johnson",
      task: "Medication Administration",
      scheduledTime: "10:30 AM",
      status: "Missed",
    },
    {
      id: 2,
      name: "David Lee",
      task: "Physical Therapy",
      scheduledTime: "2:15 PM",
      status: "Missed",
    },
    {
      id: 3,
      name: "Maria Garcia",
      task: "Vital Signs Check",
      scheduledTime: "6:45 PM",
      status: "Missed",
    },
  ],
  Tue: [
    {
      id: 4,
      name: "James Wilson",
      task: "Medication Administration",
      scheduledTime: "9:00 AM",
      status: "Missed",
    },
  ],
  Wed: [
    {
      id: 5,
      name: "Emily Chen",
      task: "Wound Care",
      scheduledTime: "11:15 AM",
      status: "Missed",
    },
    {
      id: 6,
      name: "Robert Jones",
      task: "Respiratory Treatment",
      scheduledTime: "3:30 PM",
      status: "Missed",
    },
  ],
  Thu: [
    // No missed tasks
  ],
  Fri: [
    {
      id: 7,
      name: "Patricia Miller",
      task: "Medication Administration",
      scheduledTime: "8:45 AM",
      status: "Missed",
    },
  ],
};

export const CarePlanPerformance = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedDay, setSelectedDay] = React.useState<string | null>(null);
  const [selectedData, setSelectedData] = React.useState<unknown[]>([]);

  const data = [
    { name: "Mon", completed: 27, scheduled: 30 },
    { name: "Tue", completed: 29, scheduled: 30 },
    { name: "Wed", completed: 28, scheduled: 30 },
    { name: "Thu", completed: 30, scheduled: 30 },
    { name: "Fri", completed: 29, scheduled: 30 },
  ];

  const handleBarClick = (data: unknown) => {
    const day = data.name;
    const missedTasks = missedTasksData[day] || [];

    setSelectedDay(day);
    setSelectedData(missedTasks);
    setIsDialogOpen(true);
  };

  const getMissedCount = (day: string) => {
    return missedTasksData[day] ? missedTasksData[day].length : 0;
  };

  return (
    <>
      <h2 className="text-lg font-medium mb-6">Daily Task Performance</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            onClick={(data) =>
              data &&
              data.activePayload &&
              handleBarClick(data.activePayload[0].payload, 0)
            }
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[0, 30]}
              ticks={[0, 9, 18, 27, 30]}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  const missedCount = getMissedCount(data.name);
                  return (
                    <div className="bg-white p-2 border rounded shadow">
                      <p className="font-medium">{`${data.name}`}</p>
                      <p>{`Completed: ${data.completed}`}</p>
                      <p>{`Scheduled: ${data.scheduled}`}</p>
                      <p className="text-red-500">{`Missed: ${missedCount}`}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Click for details
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              align="right"
              verticalAlign="top"
              wrapperStyle={{ paddingBottom: "20px" }}
            />
            <Bar
              dataKey="completed"
              fill="#22C55E"
              name="Completed"
              radius={[4, 4, 0, 0]}
              cursor="pointer"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  style={{
                    cursor:
                      getMissedCount(entry.name) > 0 ? "pointer" : "default",
                  }}
                />
              ))}
            </Bar>
            <Bar
              dataKey="scheduled"
              fill="#E5E7EB"
              name="Scheduled"
              radius={[4, 4, 0, 0]}
              cursor="pointer"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  style={{
                    cursor:
                      getMissedCount(entry.name) > 0 ? "pointer" : "default",
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ClockAlert className="h-5 w-5 text-amber-500" />
              {selectedDay} - Missed Care Plan Tasks
            </DialogTitle>
            <DialogDescription>
              {selectedData.length > 0
                ? `${selectedData.length} care giver(s) missed their scheduled tasks on ${selectedDay}`
                : `No missed tasks on ${selectedDay}`}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 max-h-96 overflow-y-auto">
            {selectedData.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <p>All care plan tasks were completed successfully!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedData.map((item) => (
                  <div key={item.id} className="bg-muted/50 p-4 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.task}
                        </p>
                        <p className="text-sm">
                          Scheduled: {item.scheduledTime}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-red-50 text-red-700 border-red-200"
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-end">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
