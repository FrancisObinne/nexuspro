import React from "react";
import RotaList from "@/components/rota/rota-list";
import { useTitle } from "@/hooks/useTitle";
// import { RotaForm } from "@/pages/rota/RotaForm";

export default function Rota() {
  const { updateTitle } = useTitle();

  React.useEffect(() => {
    updateTitle("Rota");
  }, []);

  return (
    <div className="w-full h-full overflow-y-scroll">
      <RotaList />
    </div>
  );
}
