import { CategoriesList } from "@/components/categories/CategoriesList";
import { useTitle } from "@/hooks/useTitle";
import React from "react";

export default function Categories() {
  const { updateTitle } = useTitle();

  React.useEffect(() => {
    updateTitle("Categories");
  }, []);

  return (
    <div className="w-full h-full overflow-y-scroll">
      <CategoriesList />
    </div>
  );
}
