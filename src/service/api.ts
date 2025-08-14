import axios, { AxiosResponse, Method } from "axios";
import qs from "qs";
import { toast } from "sonner";
import { checkTokenExpiry, clearAll } from "@/lib";

import { getTokenFromLocalStore } from "@/lib";

export const apiService = async <TResponse, TRequest = undefined>(
  url: string,
  method: Method,
  payload?: TRequest,
  protectedRoute: boolean = false,
  params?: Record<string, string | number | boolean>,
  headers: Record<string, string> = {
    "Content-Type": "application/json",
  },
  baseURL: string = "http://152.53.243.134:5000/",
  responseType: "json" | "blob" = "json"
): Promise<TResponse> => {
  const token = getTokenFromLocalStore<string>("access_token") || "";
  if (protectedRoute) {
    if (checkTokenExpiry(token)) {
      toast.error("Session expired. Please login again.");
      clearAll();
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  const isFormEncoded =
    headers["Content-Type"] === "application/x-www-form-urlencoded";

  try {
    const response: AxiosResponse<TResponse> = await axios({
      method,
      url,
      data: isFormEncoded && payload ? qs.stringify(payload) : payload,
      baseURL,
      headers,
      params,
      responseType,
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response.data.detail ||
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Something went wrong";

      toast.error(message);
      console.error("API Error:", error.response);
    } else {
      toast.error("Unexpected error occurred");
      console.error("Unknown error:", error);
    }

    throw error;
  }
};

export default apiService;
