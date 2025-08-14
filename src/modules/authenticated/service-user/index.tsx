import { ServiceUsersList } from "@/components/service-users/ServiceUsersList";
import { useTitle } from "@/hooks/useTitle";
import React from "react";

export default function ServiceUsers() {
  const { updateTitle } = useTitle();

  React.useEffect(() => {
    updateTitle("Service Users");
  }, []);
  return (
    <div className="w-full h-full overflow-y-scroll">
      <ServiceUsersList />
    </div>
  );
}
