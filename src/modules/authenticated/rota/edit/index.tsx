import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

import { useGetTasks } from "@/hooks";
import { useGetRotaById, useEditRota } from "@/hooks/queries/rota";
import { CreateRotaFormValues, createRotaRelsolver } from "@/validations/rota";

import { ControlledInput } from "@/components/controlled-input";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { ControlledTextarea } from "@/components/controlled-textarea";
import {
  calculateDuration,
  convertISOToTimeHHMM,
  convertTimeToISO,
} from "@/utils/task";
import { useTitle } from "@/hooks/useTitle";

const EditRota = () => {
  const { rotaId } = useParams<{ rotaId: string }>();
  const navigate = useNavigate();
  const { rota } = useGetRotaById(rotaId);
  const { editRota, editingRota } = useEditRota();
  const { taskInventory } = useGetTasks();

  const { updateTitle } = useTitle();

  React.useEffect(() => {
    updateTitle("Rota");
  }, []);

  const form = useForm<CreateRotaFormValues>({
    resolver: createRotaRelsolver,
    defaultValues: {},
  });

  const { reset, control, handleSubmit, watch, setValue, register } = form;

  useEffect(() => {
    if (rota) {
      reset({
        rotaName: rota.rotaName,
        description: rota.description,
        startTime: convertISOToTimeHHMM(rota.startTime || ""),
        endTime: convertISOToTimeHHMM(rota.endTime || ""),
        taskPublicIds: rota.tasks?.map((t) => t.publicId) || [],
      });
    }
  }, [rota, reset]);

  const startTime = watch("startTime");
  const endTime = watch("endTime");

  useEffect(() => {
    if (startTime && endTime) {
      const duration = calculateDuration(startTime, endTime);
      if (duration) setValue("duration", duration);
      else toast.error("End time cannot be before start time");
    }
  }, [startTime, endTime, setValue]);

  const onSubmit = (formData: CreateRotaFormValues) => {
    if (!rota) return;

    const payload = {
      rotaName: formData.rotaName,
      description: formData.description,
      endTime: convertTimeToISO(formData.endTime),
      startTime: convertTimeToISO(formData.startTime),
      taskPublicIds: formData.taskPublicIds,
    };

    editRota(
      { rotaid: rota.publicId, data: payload },
      {
        onSuccess: () => {
          toast.success("Rota updated successfully!");
          navigate("/rota");
        },
        onError: () => toast.error("Failed to update Rota."),
      }
    );
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        Editing Rota:
        {/* {rota.rotaName} */}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <ControlledInput
          control={control}
          name="rotaName"
          label="Rota Name"
          required
        />

        <ControlledTextarea
          control={control}
          name="description"
          label="Description"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <ControlledInput
            control={control}
            name="startTime"
            label="Start Time"
            required
            type="time"
          />
          <ControlledInput
            control={control}
            name="endTime"
            label="End Time"
            required
            type="time"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="duration">Duration</label>
          <Input id="duration" value={watch("duration") || ""} readOnly />
        </div>

        <div className="grid gap-2">
          <label htmlFor="taskPublicIds">Tasks</label>
          <select
            id="taskPublicIds"
            multiple
            {...register("taskPublicIds")}
            className="w-full border p-2 rounded"
          >
            {taskInventory?.map((task) => (
              <option key={task.publicId} value={task.publicId}>
                task
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={editingRota}>
            Update Rota
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditRota;
