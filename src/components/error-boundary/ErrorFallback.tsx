import React, { useState } from "react";
import { AlertTriangle, RefreshCw, Home, Bug, AlertCircle } from "lucide-react";
import { ErrorFallbackProps } from "@/types/error";

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetError,
  showDetails = false,
}) => {
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const handleReset = async (): Promise<void> => {
    setIsResetting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    resetError();
    setIsResetting(false);
  };

  const handleReload = (): void => {
    window.location.reload();
  };

  const handleGoHome = (): void => {
    window.location.href = "/";
  };

  // Enhanced error analysis
  const getErrorType = (error: Error | null) => {
    if (!error) return "unknown";

    const message = error.message.toLowerCase();

    if (message.includes("cannot read properties") && message.includes("map")) {
      return "data";
    }
    if (message.includes("network") || message.includes("fetch")) {
      return "network";
    }
    if (message.includes("chunk") || message.includes("loading")) {
      return "loading";
    }
    return "general";
  };

  const getErrorMessage = (errorType: string) => {
    switch (errorType) {
      case "data":
        return {
          title: "Data Loading Issue",
          description:
            "We're having trouble loading some data. This usually resolves quickly.",
          suggestion: "Try refreshing the page or check your connection.",
        };
      case "network":
        return {
          title: "Connection Problem",
          description: "We can't reach our servers right now.",
          suggestion: "Please check your internet connection and try again.",
        };
      case "loading":
        return {
          title: "Loading Error",
          description: "Some parts of the app failed to load properly.",
          suggestion: "A page refresh should fix this issue.",
        };
      default:
        return {
          title: "Something went wrong",
          description: "We encountered an unexpected error.",
          suggestion: "Try one of the options below to get back on track.",
        };
    }
  };

  const errorType = getErrorType(error);
  const errorMessage = getErrorMessage(errorType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Main Error Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header with Icon */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-center">
            <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
              {errorType === "data" ? (
                <AlertCircle className="w-8 h-8 text-red-500" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-red-500" />
              )}
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {errorMessage.title}
            </h1>
            <p className="text-red-100">{errorMessage.description}</p>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-gray-600 mb-6 text-center">
              {errorMessage.suggestion}
            </p>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleReset}
                disabled={isResetting}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                style={{ backgroundColor: isResetting ? "#0f7b3c" : "#13a24a" }}
              >
                <RefreshCw
                  className={`w-4 h-4 ${isResetting ? "animate-spin" : ""}`}
                />
                {isResetting ? "Trying again..." : "Try Again"}
              </button>

              <button
                onClick={handleReload}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Reload Page
              </button>

              <button
                onClick={handleGoHome}
                className="w-full bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 border border-gray-200"
              >
                <Home className="w-4 h-4" />
                Go Home
              </button>
            </div>

            {/* Error Details Toggle */}
            {showDetails && error && (
              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={() => setDetailsVisible(!detailsVisible)}
                  className="w-full text-left text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2 mb-3"
                >
                  <Bug className="w-4 h-4" />
                  {detailsVisible ? "Hide" : "Show"} Error Details
                </button>

                {detailsVisible && (
                  <div className="bg-gray-50 rounded-lg p-3 text-xs font-mono text-gray-600 max-h-32 overflow-auto border">
                    <strong>Error:</strong> {error.message}
                    <br />
                    {error.stack && (
                      <>
                        <strong>Stack:</strong> {error.stack}
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-4 text-sm text-gray-500">
          {errorType === "data"
            ? "If data keeps failing to load, please contact support"
            : "If this problem persists, please contact support"}
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
