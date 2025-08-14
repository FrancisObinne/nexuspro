import { ErrorInfo } from "@/types/error";

export const logError = (error: Error, errorInfo: ErrorInfo): void => {
  console.group("🚨 Error Boundary Caught An Error");
  console.error("Error:", error);
  console.error("Error Info:", errorInfo);
  console.error("Component Stack:", errorInfo.componentStack);
  console.groupEnd();
};

export const reportUserAction = (
  action: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>
): void => {
  console.log(`User action: ${action}`, metadata);
};

export const getErrorType = (error: Error): string => {
  const message = error.message.toLowerCase();

  if (message.includes("cannot read properties") && message.includes("map")) {
    return "data_mapping_error";
  }
  if (message.includes("network") || message.includes("fetch")) {
    return "network_error";
  }
  if (message.includes("chunk") || message.includes("loading")) {
    return "loading_error";
  }
  return "general_error";
};
