import React from "react";
import { StaffList } from "@/components/staff/StaffList";
import { useTitle } from "@/hooks/useTitle";

export default function Staff() {
  const { updateTitle } = useTitle();

  React.useEffect(() => {
    updateTitle("Staff");
  }, []);
  return (
    <div className="w-full h-full overflow-y-scroll">
      <StaffList />
    </div>
  );
}
