import { ActiveRotas } from "@/components/schedule/ActiveRotas";
import { CareGiverManagement } from "@/components/schedule/CareGiverManagement";
import ScheduleManagement from "@/components/schedule/ScheduleManagement";
import { useAssignStaffToRota } from "@/hooks/queries/rota";
import { useTitle } from "@/hooks/useTitle";
import { Rota, Staff } from "@/types";
import React, { useState } from "react";
import { toast } from "sonner";

export default function ManageSchedule() {
  const { updateTitle } = useTitle();

  React.useEffect(() => {
    updateTitle("Manage Schedule");
  }, []);

  const [draggedStaff, setDraggedStaff] = useState<Staff | null>(null);

  const { assignStaffToRota } = useAssignStaffToRota({
    onSuccess: () => {
      toast.success(
        `${draggedStaff?.firstName} ${draggedStaff?.lastName} assigned to rota`
      );

      setDraggedStaff(null);
    },
    onError: () => {
      toast.error("Error assigning staff to rota");
    },
  });

  const handleRotaDragStart = (rota: Rota, e: React.DragEvent) => {
    e.dataTransfer.setData("application/json", JSON.stringify(rota));
  };

  const handleStaffDrop = (rota: Rota, staffData: Staff) => {
    assignStaffToRota({
      rotaId: rota.publicId,
      staffId: staffData.staffPublicId,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full overflow-y-scroll">
      <div className="lg:col-span-3">
        <CareGiverManagement />
      </div>

      <div className="lg:col-span-6">
        <ScheduleManagement />
      </div>

      <div className="lg:col-span-3">
        <ActiveRotas
          onRotaDragStart={handleRotaDragStart}
          onStaffDrop={handleStaffDrop}
        />
      </div>
    </div>
  );
}
