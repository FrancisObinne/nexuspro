import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AssignedTasks } from "@/components/rota/assign-tasks";
import { AvailableTasks } from "@/components/rota/available-task";
import { RotaForm } from "@/components/rota/rota-form";
import { useCreateRota } from "@/hooks/queries/rota";
import { useGetTasks } from "@/hooks/queries/task";
import {
  createRotaDefaultValues,
  CreateRotaFormValues,
  createRotaRelsolver,
} from "@/validations/rota";
import { Task } from "@/types/task";
import Loader from "@/components/loader";
import { useTitle } from "@/hooks/useTitle";

export default function CreateRota() {
  const form = useForm<CreateRotaFormValues>({
    mode: "onChange",
    defaultValues: createRotaDefaultValues,
    resolver: createRotaRelsolver,
  });

  const startTime = form.watch("startTime");
  const endTime = form.watch("endTime");
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);

  const { updateTitle } = useTitle();

  React.useEffect(() => {
    updateTitle("Rota");
  }, []);

  const {
    taskInventory,
    isPending: taskLoading,
    setFilterParams,
  } = useGetTasks();

  const { mutate, isPending } = useCreateRota({
    onSuccess: () => {
      form.reset();
      setAssignedTasks([]);
    },
  });

  const handleAssignTasks = () => {
    const newTasks =
      taskInventory?.filter(
        (task) =>
          selectedTasks.includes(task.publicId) &&
          !assignedTasks.some((assigned) => assigned.publicId === task.publicId)
      ) || [];

    const updated = [...assignedTasks, ...newTasks];
    setAssignedTasks(updated);
    setSelectedTasks([]);

    form.setValue(
      "taskPublicIds",
      updated.map((t) => t.publicId)
    );
  };

  const handleRemoveTask = (taskId: string) => {
    setAssignedTasks((prev) => prev.filter((task) => task.publicId !== taskId));
  };

  const handleTaskDrop = (taskId: string) => {
    const task = taskInventory?.find((t) => t.publicId === taskId);
    if (!task) return;

    setAssignedTasks((prev) => {
      const alreadyAssigned = prev.some((t) => t.publicId === taskId);
      const updated = alreadyAssigned ? prev : [...prev, task];

      form.setValue(
        "taskPublicIds",
        updated.map((t) => t.publicId)
      );

      return updated;
    });

    setSelectedTasks([]);
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === taskInventory!.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(taskInventory?.map((task) => task.publicId) ?? []);
    }
  };

  const handleTaskSelection = (taskId: string) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  useEffect(() => {
    if (startTime || endTime) {
      setFilterParams((prev) => ({
        ...prev,
        startTime,
        endTime,
        page: 1,
      }));
    }
  }, [startTime, endTime, setFilterParams]);

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="w-full h-full overflow-y-scroll">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Rota</h1>
        <p className="text-gray-500">
          Set up a new rota schedule and assign tasks
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <RotaForm onSubmit={mutate} form={form} />
        </div>
        <div className="lg:col-span-7">
          <AvailableTasks
            tasks={taskInventory!}
            isloading={taskLoading}
            selectedTasks={selectedTasks}
            onSelectAll={handleSelectAll}
            onSelectTask={handleTaskSelection}
            onTaskDragStart={(taskId) => setSelectedTasks([taskId])}
            setFilterParams={setFilterParams}
          />

          <AssignedTasks
            assignedTasks={assignedTasks}
            selectedTasks={selectedTasks}
            form={form}
            onAssignTasks={handleAssignTasks}
            onRemoveTask={handleRemoveTask}
            onDrop={handleTaskDrop}
          />
        </div>
      </div>
    </div>
  );
}
