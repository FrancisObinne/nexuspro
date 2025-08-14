import React from "react";
import { useRouteError } from "react-router-dom";
import ErrorFallback from "./ErrorFallback";
import { RouterError } from "@/types/error";

const RouterErrorElement: React.FC = () => {
  const error = useRouteError() as RouterError;

  console.log("RouterError", error);

  const handleReset = (): void => {
    window.location.reload();
  };

  const standardError: Error = {
    name: "RouterError",
    message:
      error?.message ||
      `${error?.status || "Unknown"} ${error?.statusText || "Error"}`,
    stack: error?.data || "",
  };

  return (
    <ErrorFallback
      error={standardError}
      resetError={handleReset}
      showDetails={process.env.NODE_ENV === "development"}
    />
  );
};

export default RouterErrorElement;
