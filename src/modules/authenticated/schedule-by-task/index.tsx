import { ScheduleControls } from "@/components/schedule-by-task/schedule-controls";
import { ScheduleFilters } from "@/components/schedule-by-task/schedule-filters";
import { ScheduleGrid } from "@/components/schedule-by-task/schedule-grid";
import { useTitle } from "@/hooks/useTitle";
import React, { useState } from "react";

export default function ScheduleByTask() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedArea, setSelectedArea] = useState("All Areas");

  const { updateTitle } = useTitle();

  React.useEffect(() => {
    updateTitle("Schedule by Task");
  }, []);

  return (
    <div className="p-6 space-y-6 w-full h-full overflow-auto">
      <div className="bg-white rounded-lg shadow w-full">
        <div className="p-4 border-b border-gray-200 w-full">
          <div className="flex flex-col overflow-x-scroll lg:flex-row lg:items-center lg:justify-between gap-4">
            <ScheduleFilters
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedArea={selectedArea}
              setSelectedArea={setSelectedArea}
            />
            <ScheduleControls />
          </div>
        </div>

        <div className="p-4 w-full overflow-x-auto">
          <ScheduleGrid
            selectedDate={selectedDate}
            selectedArea={selectedArea}
          />
        </div>
      </div>
    </div>
  );
}
