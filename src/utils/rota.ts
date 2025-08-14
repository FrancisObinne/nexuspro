import { Task } from "@/types";

export const mockTasks: Task[] = [
  {
    id: "task1",
    title: "Morning Medication",
    timeSlot: "08:00 - 09:00",
    assignedTo: "Unassigned",
    priority: "high",
  },
  {
    id: "task2",
    title: "Physical Therapy",
    timeSlot: "10:00 - 11:30",
    assignedTo: "Unassigned",
    priority: "medium",
  },
  {
    id: "task3",
    title: "Lunch Preparation",
    timeSlot: "11:30 - 12:30",
    assignedTo: "John Smith",
    priority: "medium",
  },
  {
    id: "task4",
    title: "Afternoon Check-up",
    timeSlot: "14:00 - 15:00",
    assignedTo: "Unassigned",
    priority: "low",
  },
  {
    id: "task5",
    title: "Evening Medication",
    timeSlot: "18:00 - 19:00",
    assignedTo: "Unassigned",
    priority: "high",
  },
];

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};
