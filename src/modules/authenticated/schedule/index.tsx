// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Avatar } from "@/components/avatar";
import { Button } from "@/components/button";
import { Calendar as CalendarComponent } from "@/components/calender";
import { Input } from "@/components/input";
import {
  Popover as DatePopover,
  PopoverContent as DatePopoverContent,
  PopoverTrigger as DatePopoverTrigger,
} from "@/components/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileUp,
  Filter,
  Plus,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import ExportDialog from "@/components/care-plan";
import { useTitle } from "@/hooks/useTitle";

// Mock data for care workers
const careWorkers = [
  { id: 1, name: "Sarah Johnson", role: "Care Worker", avatar: "" },
  { id: 2, name: "Michael Chen", role: "Senior Care", avatar: "" },
  { id: 3, name: "Emma Wilson", role: "Care Worker", avatar: "" },
  { id: 4, name: "David Brown", role: "Medication Support", avatar: "" },
  { id: 5, name: "Lisa Anderson", role: "Care Worker", avatar: "" },
  { id: 6, name: "Robert Miller", role: "Care Worker", avatar: "" },
  { id: 7, name: "Jennifer Smith", role: "Senior Care", avatar: "" },
  { id: 8, name: "Mark Davis", role: "Care Worker", avatar: "" },
  { id: 9, name: "Anna Taylor", role: "Medication Support", avatar: "" },
  { id: 10, name: "Chris Wilson", role: "Care Worker", avatar: "" },
  { id: 11, name: "Patricia Garcia", role: "Service Coordinator", avatar: "" },
  { id: 12, name: "James Rodriguez", role: "Administrator", avatar: "" },
  { id: 13, name: "Maria Martinez", role: "Scheduler", avatar: "" },
  { id: 14, name: "John Thompson", role: "Regulatory Auditor", avatar: "" },
  { id: 15, name: "Linda White", role: "Super Admin", avatar: "" },
  { id: 16, name: "Thomas Lee", role: "Service Coordinator", avatar: "" },
  { id: 17, name: "Karen Clark", role: "Administrator", avatar: "" },
  { id: 18, name: "Steven Hall", role: "Scheduler", avatar: "" },
];

const initialCaregiverSchedules = {
  "Chris Wilson": { rota: "AM Rota 1", startTime: "07:00", endTime: "12:00" },
  "Emma Wilson": { rota: "PM Rota 1", startTime: "15:00", endTime: "23:00" },
  "Lisa Anderson": {
    rota: "Night Rota 1",
    startTime: "23:00",
    endTime: "07:00",
  },
  "Mark Davis": { rota: "AM Rota 4", startTime: "07:00", endTime: "15:00" },
  "Robert Miller": { rota: "PM Rota 4", startTime: "15:00", endTime: "22:00" },
  "Sarah Johnson": {
    rota: "Night Rota 2",
    startTime: "21:00",
    endTime: "07:00",
  },
};

const scheduledStaffIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // All 10 care workers are scheduled for today

const CarePlansPage = () => {
  const { updateTitle } = useTitle();

  React.useEffect(() => {
    updateTitle("Care Plan");
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [assignments, setAssignments] = useState<{
    [key: string]: { workerId: number; workerName: string };
  }>({});
  const [activeTab, setActiveTab] = useState("schedules-today");
  const [showExportDialog, setShowExportDialog] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [draggedRota, setDraggedRota] = useState<{
    workerId: number;
    workerName: string;
    schedule: unknown;
  } | null>(null);
  const [caregiverSchedules, setCaregiverSchedules] = useState<{
    [key: string]: unknown;
  }>(initialCaregiverSchedules);

  // Calculate total hours for each worker based on their specific schedule
  const calculateWorkerHours = (workerName: string) => {
    const schedule = caregiverSchedules[workerName];
    if (!schedule) return 0;

    const startHour = parseInt(schedule.startTime.split(":")[0]);
    const endHour = parseInt(schedule.endTime.split(":")[0]);

    if (endHour <= startHour) {
      return 24 - startHour + endHour;
    } else {
      return endHour - startHour;
    }
  };

  // Helper function to check if a worker is a Care Worker only
  const isCareWorker = (worker: unknown) => {
    return worker.role === "Care Worker";
  };

  // Initialize default schedule based on specific caregiver schedules
  useEffect(() => {
    console.log("Initializing schedules with:", caregiverSchedules);
    const defaultAssignments: {
      [key: string]: { workerId: number; workerName: string };
    } = {};

    // Get available Care Workers for scheduling (only Care Workers)
    const availableCareWorkers = careWorkers.filter(
      (worker) => scheduledStaffIds.includes(worker.id) && isCareWorker(worker)
    );

    // Create schedule assignments based on specific caregiver schedules
    availableCareWorkers.forEach((worker) => {
      const schedule = caregiverSchedules[worker.name];
      if (schedule) {
        const startHour = parseInt(schedule.startTime.split(":")[0]);
        const endHour = parseInt(schedule.endTime.split(":")[0]);

        if (endHour <= startHour) {
          // Overnight shift - assign from start hour to 24, then from 0 to end hour
          for (let hour = startHour; hour < 24; hour++) {
            const timeSlot = `${String(hour).padStart(2, "0")}:00`;
            const key = `${worker.id}-${timeSlot}`;
            defaultAssignments[key] = {
              workerId: worker.id,
              workerName: worker.name,
            };
          }
          for (let hour = 0; hour < endHour; hour++) {
            const timeSlot = `${String(hour).padStart(2, "0")}:00`;
            const key = `${worker.id}-${timeSlot}`;
            defaultAssignments[key] = {
              workerId: worker.id,
              workerName: worker.name,
            };
          }
        } else {
          // Regular shift
          for (let hour = startHour; hour < endHour; hour++) {
            const timeSlot = `${String(hour).padStart(2, "0")}:00`;
            const key = `${worker.id}-${timeSlot}`;
            defaultAssignments[key] = {
              workerId: worker.id,
              workerName: worker.name,
            };
          }
        }
      }
    });

    console.log(
      "Default assignments created:",
      Object.keys(defaultAssignments).length,
      "assignments"
    );
    setAssignments(defaultAssignments);
    toast.success(
      "Schedule created based on specific caregiver rota assignments"
    );
  }, [selectedDate, caregiverSchedules]);

  // Helper function to get rota background color based on rota name
  const getRotaBackgroundColor = (rotaName: string) => {
    if (rotaName.includes("AM Rota")) {
      return "bg-yellow-100 text-yellow-800";
    } else if (rotaName.includes("PM Rota")) {
      return "bg-orange-100 text-orange-800";
    } else if (rotaName.includes("Night Rota")) {
      return "bg-indigo-100 text-indigo-800";
    }
    return "bg-blue-100 text-blue-800"; // Default fallback
  };

  // Filter care workers based on search term and tab
  const getFilteredCareWorkers = () => {
    let workers = careWorkers;

    // Filter by tab
    if (activeTab === "schedules-today") {
      // Only show Care Workers who are scheduled today
      workers = workers.filter(
        (worker) =>
          scheduledStaffIds.includes(worker.id) && isCareWorker(worker)
      );
    }

    // Filter by search term and sort alphabetically
    return workers
      .filter((worker) =>
        worker.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const filteredCareWorkers = getFilteredCareWorkers();

  // Generate time slots for the schedule (expanded to 24 hours)
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    return `${String(i).padStart(2, "0")}:00`;
  });

  // Helper function to get shift time slots for a worker
  const getWorkerShiftSlots = (workerName: string) => {
    const schedule = caregiverSchedules[workerName];
    if (!schedule) return [];

    const startHour = parseInt(schedule.startTime.split(":")[0]);
    const endHour = parseInt(schedule.endTime.split(":")[0]);
    const slots = [];

    if (endHour <= startHour) {
      // Overnight shift
      for (let hour = startHour; hour < 24; hour++) {
        slots.push(hour);
      }
      for (let hour = 0; hour < endHour; hour++) {
        slots.push(hour);
      }
    } else {
      // Regular shift
      for (let hour = startHour; hour < endHour; hour++) {
        slots.push(hour);
      }
    }

    return slots;
  };

  // Helper function to check if a time slot is the start of a worker's shift
  const isShiftStart = (workerName: string, timeSlot: string) => {
    const schedule = caregiverSchedules[workerName];
    if (!schedule) return false;

    const hour = parseInt(timeSlot.split(":")[0]);
    const startHour = parseInt(schedule.startTime.split(":")[0]);

    return hour === startHour;
  };

  // Helper function to get the span count for a worker's shift
  const getShiftSpan = (workerName: string) => {
    const shiftSlots = getWorkerShiftSlots(workerName);
    return shiftSlots.length;
  };

  // Helper function to check if a time slot should be rendered (not spanned over)
  const shouldRenderCell = (workerName: string, timeSlot: string) => {
    const schedule = caregiverSchedules[workerName];
    if (!schedule) return true;

    const hour = parseInt(timeSlot.split(":")[0]);
    const shiftSlots = getWorkerShiftSlots(workerName);

    // If this hour is not in the worker's shift, render as empty
    if (!shiftSlots.includes(hour)) return true;

    // If this is the start of the shift, render the merged cell
    return isShiftStart(workerName, timeSlot);
  };

  // Drag and drop handlers
  const handleRotaDragStart = (
    e: React.DragEvent,
    sourceWorker: unknown,
    timeSlot: string
  ) => {
    const schedule = caregiverSchedules[sourceWorker.name];
    if (schedule) {
      const rotaData = {
        workerId: sourceWorker.id,
        workerName: sourceWorker.name,
        schedule,
        timeSlot,
        type: "rota-transfer",
      };
      setDraggedRota(rotaData);
      e.dataTransfer.setData("application/json", JSON.stringify(rotaData));
      e.dataTransfer.effectAllowed = "move";
    }
  };

  const handleStaffDragStart = (e: React.DragEvent, staff: unknown) => {
    const staffData = {
      ...staff,
      type: "staff-assignment",
    };
    e.dataTransfer.setData("application/json", JSON.stringify(staffData));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleRotaDrop = (
    e: React.DragEvent,
    targetWorker: unknown,
    targetTimeSlot?: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const draggedData = JSON.parse(
        e.dataTransfer.getData("application/json")
      );
      console.log("Drop event - draggedData:", draggedData);
      console.log("Drop event - targetWorker:", targetWorker.name);

      if (draggedData.type === "rota-transfer") {
        // Handle rota transfer between workers
        const sourceSchedule = draggedData.schedule;
        const sourceWorkerName = draggedData.workerName;
        const sourceWorkerId = draggedData.workerId;
        const targetWorkerName = targetWorker.name;

        if (sourceWorkerName === targetWorkerName) {
          toast.info("Cannot transfer rota to the same worker");
          return;
        }

        // Check if target worker already has a schedule
        const targetSchedule = caregiverSchedules[targetWorkerName];
        if (targetSchedule) {
          toast.error(
            `${targetWorkerName} already has a rota assignment (${targetSchedule.rota})`
          );
          return;
        }

        console.log(
          "Before transfer - caregiverSchedules:",
          caregiverSchedules
        );

        // Update caregiver schedules - REMOVE from source and ADD to target
        const newCaregiverSchedules = { ...caregiverSchedules };
        newCaregiverSchedules[targetWorkerName] = sourceSchedule;
        delete newCaregiverSchedules[sourceWorkerName];

        console.log(
          "After transfer - newCaregiverSchedules:",
          newCaregiverSchedules
        );

        // Update the assignments state
        const newAssignments = { ...assignments };

        // Remove ALL assignments for source worker
        console.log(
          "Removing assignments for source worker:",
          sourceWorkerName,
          "ID:",
          sourceWorkerId
        );
        Object.keys(newAssignments).forEach((key) => {
          if (newAssignments[key].workerId === sourceWorkerId) {
            console.log("Removing assignment:", key, newAssignments[key]);
            delete newAssignments[key];
          }
        });

        // Add new assignments for target worker
        const startHour = parseInt(sourceSchedule.startTime.split(":")[0]);
        const endHour = parseInt(sourceSchedule.endTime.split(":")[0]);

        console.log(
          "Adding assignments for target worker:",
          targetWorkerName,
          "ID:",
          targetWorker.id
        );
        if (endHour <= startHour) {
          for (let hour = startHour; hour < 24; hour++) {
            const timeSlot = `${String(hour).padStart(2, "0")}:00`;
            const key = `${targetWorker.id}-${timeSlot}`;
            newAssignments[key] = {
              workerId: targetWorker.id,
              workerName: targetWorker.name,
            };
            console.log("Adding assignment:", key, newAssignments[key]);
          }
          for (let hour = 0; hour < endHour; hour++) {
            const timeSlot = `${String(hour).padStart(2, "0")}:00`;
            const key = `${targetWorker.id}-${timeSlot}`;
            newAssignments[key] = {
              workerId: targetWorker.id,
              workerName: targetWorker.name,
            };
            console.log("Adding assignment:", key, newAssignments[key]);
          }
        } else {
          for (let hour = startHour; hour < endHour; hour++) {
            const timeSlot = `${String(hour).padStart(2, "0")}:00`;
            const key = `${targetWorker.id}-${timeSlot}`;
            newAssignments[key] = {
              workerId: targetWorker.id,
              workerName: targetWorker.name,
            };
            console.log("Adding assignment:", key, newAssignments[key]);
          }
        }

        console.log(
          "Final assignments state update:",
          Object.keys(newAssignments).length,
          "total assignments"
        );

        // Update both states
        setAssignments(newAssignments);
        setCaregiverSchedules(newCaregiverSchedules);

        toast.success(
          `${sourceSchedule.rota} transferred from ${sourceWorkerName} to ${targetWorkerName}`
        );
      } else if (draggedData.type === "staff-assignment") {
        // Handle staff assignment to a rota
        const newStaffMember = draggedData;

        if (!targetTimeSlot) {
          toast.error("Please drop on a specific time slot");
          return;
        }

        console.log(
          "Staff assignment - newStaffMember:",
          newStaffMember.name,
          "targetTimeSlot:",
          targetTimeSlot
        );

        // Check if the new staff member already has a schedule
        const existingSchedule = caregiverSchedules[newStaffMember.name];
        if (existingSchedule) {
          toast.error(
            `${newStaffMember.name} already has a rota assignment (${existingSchedule.rota})`
          );
          return;
        }

        // Find who currently owns this time slot
        const targetHour = parseInt(targetTimeSlot.split(":")[0]);
        let currentWorkerWithRota = null;
        let currentSchedule = null;

        // Look through all caregiver schedules to find who owns this time slot
        for (const [workerName, schedule] of Object.entries(
          caregiverSchedules
        )) {
          const startHour = parseInt(schedule.startTime.split(":")[0]);
          const endHour = parseInt(schedule.endTime.split(":")[0]);

          let isInSchedule = false;
          if (endHour <= startHour) {
            // Overnight shift
            isInSchedule = targetHour >= startHour || targetHour < endHour;
          } else {
            // Regular shift
            isInSchedule = targetHour >= startHour && targetHour < endHour;
          }

          if (isInSchedule) {
            // Find the worker with this name
            const worker = careWorkers.find((w) => w.name === workerName);
            if (worker) {
              currentWorkerWithRota = {
                id: worker.id,
                name: worker.name,
              };
              currentSchedule = schedule;
              console.log(
                "Found current worker with rota:",
                currentWorkerWithRota,
                "schedule:",
                currentSchedule
              );
              break;
            }
          }
        }

        if (!currentWorkerWithRota || !currentSchedule) {
          toast.error("No rota schedule found for this time slot");
          return;
        }

        console.log(
          "Before reassignment - caregiverSchedules:",
          caregiverSchedules
        );
        console.log(
          "Transferring rota from:",
          currentWorkerWithRota.name,
          "to:",
          newStaffMember.name
        );
        console.log("Rota being transferred:", currentSchedule);

        // Transfer the rota from current worker to new staff member
        const newCaregiverSchedules = { ...caregiverSchedules };

        // Remove from current worker
        delete newCaregiverSchedules[currentWorkerWithRota.name];
        console.log("Removed schedule from:", currentWorkerWithRota.name);

        // Add to new staff member
        newCaregiverSchedules[newStaffMember.name] = currentSchedule;
        console.log(
          "Added schedule to:",
          newStaffMember.name,
          "schedule:",
          currentSchedule
        );

        console.log(
          "After reassignment - newCaregiverSchedules:",
          newCaregiverSchedules
        );

        // Update assignments - Remove ALL assignments for the current worker and add for new staff
        const newAssignments = { ...assignments };

        // Remove ALL assignments for the current worker
        console.log(
          "Removing ALL assignments for current worker:",
          currentWorkerWithRota.name,
          "ID:",
          currentWorkerWithRota.id
        );
        const keysToRemove = Object.keys(newAssignments).filter(
          (key) => newAssignments[key].workerId === currentWorkerWithRota.id
        );
        console.log("Keys to remove:", keysToRemove.length, "assignments");

        keysToRemove.forEach((key) => {
          console.log("Removing assignment:", key);
          delete newAssignments[key];
        });

        // Add new assignments for new staff member based on the transferred schedule
        const startHour = parseInt(currentSchedule.startTime.split(":")[0]);
        const endHour = parseInt(currentSchedule.endTime.split(":")[0]);

        console.log(
          "Adding assignments for new staff:",
          newStaffMember.name,
          "ID:",
          newStaffMember.id
        );
        console.log("Schedule hours:", startHour, "to", endHour);

        let assignmentsAdded = 0;

        if (endHour <= startHour) {
          // Overnight shift
          for (let hour = startHour; hour < 24; hour++) {
            const timeSlot = `${String(hour).padStart(2, "0")}:00`;
            const key = `${newStaffMember.id}-${timeSlot}`;
            newAssignments[key] = {
              workerId: newStaffMember.id,
              workerName: newStaffMember.name,
            };
            assignmentsAdded++;
          }
          for (let hour = 0; hour < endHour; hour++) {
            const timeSlot = `${String(hour).padStart(2, "0")}:00`;
            const key = `${newStaffMember.id}-${timeSlot}`;
            newAssignments[key] = {
              workerId: newStaffMember.id,
              workerName: newStaffMember.name,
            };
            assignmentsAdded++;
          }
        } else {
          // Regular shift
          for (let hour = startHour; hour < endHour; hour++) {
            const timeSlot = `${String(hour).padStart(2, "0")}:00`;
            const key = `${newStaffMember.id}-${timeSlot}`;
            newAssignments[key] = {
              workerId: newStaffMember.id,
              workerName: newStaffMember.name,
            };
            assignmentsAdded++;
          }
        }

        console.log("Total assignments added for new staff:", assignmentsAdded);
        console.log(
          "Final assignments state:",
          Object.keys(newAssignments).length,
          "total assignments"
        );

        // Update both states
        setCaregiverSchedules(newCaregiverSchedules);
        setAssignments(newAssignments);

        toast.success(
          `${currentSchedule.rota} transferred from ${currentWorkerWithRota.name} to ${newStaffMember.name}`
        );
      }
    } catch (error) {
      console.error("Error handling drop:", error);
      toast.error("Error processing drag and drop operation");
    } finally {
      setDraggedRota(null);
    }
  };

  // Prepare export data
  const prepareExportData = () => {
    return {
      workers: filteredCareWorkers.map((worker) => ({
        id: worker.id,
        name: worker.name,
        role: worker.role,
        schedule: caregiverSchedules[worker.name],
        totalHours: calculateWorkerHours(worker.name),
      })),
      timeSlots,
      selectedDate,
    };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full overflow-y-scroll">
      {/* Left Column - Staff List */}
      <div className="lg:col-span-1 space-y-6">
        {/* Reference to Schedules Page */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">
            Schedule Management
          </h3>
          <p className="text-sm text-blue-700 mb-3">
            For advanced scheduling features, visit the main schedules page.
          </p>
          <Link to="/schedules">
            <Button variant="outline" size="sm" className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              Go to Schedules
            </Button>
          </Link>
        </div>

        {/* Staff List with Tabs */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-4">Available Staff</h3>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="schedules-today" className="text-xs">
                Care Workers Today
              </TabsTrigger>
              <TabsTrigger value="all-staff" className="text-xs">
                All Staff
              </TabsTrigger>
            </TabsList>

            <div className="mb-4">
              <Input
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>

            <TabsContent value="schedules-today" className="mt-0">
              <div className="space-y-3">
                {filteredCareWorkers.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No Care Workers scheduled for {format(selectedDate, "PPP")}
                  </p>
                ) : (
                  filteredCareWorkers.map((worker) => {
                    const totalHours = calculateWorkerHours(worker.name);
                    const schedule = caregiverSchedules[worker.name];
                    return (
                      <div
                        key={worker.id}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-grab border-l-4 border-green-500"
                        draggable
                        onDragStart={(e) => handleStaffDragStart(e, worker)}
                      >
                        <Avatar>
                          <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-600 font-medium">
                            {worker.name.charAt(0)}
                          </div>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium">{worker.name}</div>
                          <div className="text-sm text-gray-500">
                            {worker.role}
                          </div>
                          <div className="text-xs text-green-600">
                            Scheduled Today
                          </div>
                          {schedule && (
                            <div className="text-xs text-purple-600 font-medium">
                              {schedule.rota}: {schedule.startTime}-
                              {schedule.endTime}
                            </div>
                          )}
                          <div className="text-xs font-medium text-blue-600">
                            {totalHours} hours total
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </TabsContent>

            <TabsContent value="all-staff" className="mt-0">
              <div className="space-y-3">
                {filteredCareWorkers.map((worker) => {
                  const totalHours = calculateWorkerHours(worker.name);
                  const schedule = caregiverSchedules[worker.name];
                  return (
                    <div
                      key={worker.id}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-grab"
                      draggable
                      onDragStart={(e) => handleStaffDragStart(e, worker)}
                    >
                      <Avatar>
                        <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-600 font-medium">
                          {worker.name.charAt(0)}
                        </div>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{worker.name}</div>
                        <div className="text-sm text-gray-500">
                          {worker.role}
                        </div>
                        {scheduledStaffIds.includes(worker.id) &&
                          isCareWorker(worker) && (
                            <div className="text-xs text-green-600">
                              Scheduled Today
                            </div>
                          )}
                        {schedule && (
                          <div className="text-xs text-purple-600 font-medium">
                            {schedule.rota}: {schedule.startTime}-
                            {schedule.endTime}
                          </div>
                        )}
                        <div className="text-xs font-medium text-blue-600">
                          {totalHours} hours total
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {/* Right Columns - Schedule Grid */}
      <div className="lg:col-span-3 space-y-6">
        {/* Date Navigation and Action Buttons */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <DatePopover>
                <DatePopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </DatePopoverTrigger>
                <DatePopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </DatePopoverContent>
              </DatePopover>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const yesterday = new Date(selectedDate);
                  yesterday.setDate(yesterday.getDate() - 1);
                  setSelectedDate(yesterday);
                }}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const tomorrow = new Date(selectedDate);
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  setSelectedDate(tomorrow);
                }}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowExportDialog(true)}
              >
                <FileUp className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Shift
              </Button>
            </div>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <div className="min-w-[800px] bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-32">Caregiver</TableHead>
                  {timeSlots.map((time, index) => (
                    <TableHead key={index} className="w-16 text-center text-xs">
                      {time}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCareWorkers.map((worker) => {
                  const totalHours = calculateWorkerHours(worker.name);
                  const schedule = caregiverSchedules[worker.name];
                  return (
                    <TableRow key={worker.id} className="bg-white">
                      <TableCell
                        className="font-medium bg-white"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleRotaDrop(e, worker)}
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-600 font-medium text-xs">
                              {worker.name.charAt(0)}
                            </div>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">
                              {worker.name.split(" ")[0]}
                            </div>
                            <div className="text-xs text-gray-500">
                              {worker.role}
                            </div>
                            {schedule && (
                              <div className="text-xs text-purple-600 font-medium">
                                {schedule.rota}
                              </div>
                            )}
                            <div className="text-xs font-medium text-blue-600">
                              {totalHours}h total
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      {timeSlots.map((time, index) => {
                        if (!shouldRenderCell(worker.name, time)) {
                          return null;
                        }

                        if (isShiftStart(worker.name, time)) {
                          const spanCount = getShiftSpan(worker.name);
                          const schedule = caregiverSchedules[worker.name];
                          const rotaColorClass = schedule
                            ? getRotaBackgroundColor(schedule.rota)
                            : "bg-blue-100 text-blue-800";
                          const totalHours = calculateWorkerHours(worker.name);

                          return (
                            <TableCell
                              key={index}
                              colSpan={spanCount}
                              className={`p-2 border border-gray-100 min-h-[50px] relative text-center font-medium cursor-grab ${rotaColorClass}`}
                              draggable
                              onDragStart={(e) =>
                                handleRotaDragStart(e, worker, time)
                              }
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleRotaDrop(e, worker, time)}
                            >
                              <div className="text-sm">{schedule?.rota}</div>
                              <div className="text-xs">
                                {schedule?.startTime} - {schedule?.endTime}
                              </div>
                              <div className="text-xs font-semibold">
                                {totalHours}h total
                              </div>
                            </TableCell>
                          );
                        }

                        return (
                          <TableCell
                            key={index}
                            className="p-1 border border-gray-100 min-h-[50px] relative bg-white"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleRotaDrop(e, worker, time)}
                          />
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Schedule Legend */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-3">Schedule Legend</h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-100 border rounded"></div>
              <span>AM Rota (07:00-15:00)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-100 border rounded"></div>
              <span>PM Rota (15:00-23:00)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-indigo-100 border rounded"></div>
              <span>Night Rota (23:00-07:00)</span>
            </div>
          </div>
        </div>
      </div>{" "}
      <ExportDialog
        open={showExportDialog}
        onOpenChange={setShowExportDialog}
        exportData={prepareExportData()}
      />
    </div>
  );
};

export default CarePlansPage;

// Missing icons import
