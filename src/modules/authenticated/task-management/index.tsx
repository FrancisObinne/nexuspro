import React from "react";
import Loader from "@/components/loader";
import TaskManagementList from "@/components/task-management/task-management-list";
import { useGetTasks } from "@/hooks/queries/task";

export default function TaskManagement() {
  const { isPending, taskInventory, filterParams, meta, setFilterParams } =
    useGetTasks();

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="w-full h-full bg-white">
      <TaskManagementList
        tasks={taskInventory}
        filterParams={filterParams}
        setFilterParams={setFilterParams}
        meta={meta}
        isPending={isPending}
      />
    </div>
  );
}
