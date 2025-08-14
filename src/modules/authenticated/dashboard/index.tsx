import { CarePlanPerformance } from "@/components/dashboard/CarePlanPerformance";
import { RecentCarePlans } from "@/components/dashboard/RecentCarePlans";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { UpcomingTasks } from "@/components/dashboard/UpcomingTasks";
import { useTitle } from "@/hooks/useTitle";
import React from "react";

export default function Dashboard() {
  const { updateTitle } = useTitle();

  React.useEffect(() => {
    updateTitle("Dashboard");
  }, []);

  return (
    <div className="w-full h-full overflow-y-scroll">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mb-6">
        <SummaryCards />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-lg p-5 shadow-sm">
          <RecentCarePlans />
        </div>
        <div className="bg-white rounded-lg p-5 shadow-sm">
          <UpcomingTasks />
        </div>
      </div>
      <div className="mt-6 bg-white rounded-lg p-5 shadow-sm">
        <CarePlanPerformance />
      </div>
    </div>
  );
}
