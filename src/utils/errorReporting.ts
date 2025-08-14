import { ErrorInfo } from "@/types/error";

export const logError = (error: Error, errorInfo: ErrorInfo): void => {
  console.error("Error Boundary caught an error:", error, errorInfo);

  // Send to error reporting service (Sentry, LogRocket, etc.)
  if (process.env.NODE_ENV === "production") {
    // Example with Sentry
    // Sentry.captureException(error, {
    //   extra: errorInfo,
    //   tags: {
    //     section: 'error_boundary'
    //   }
    // });
  }
};

export const reportUserAction = (
  action: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>
): void => {
  console.log(`User action: ${action}`, metadata);

  // Analytics tracking
  if (process.env.NODE_ENV === "production") {
    // gtag('event', action, metadata);
  }
};
