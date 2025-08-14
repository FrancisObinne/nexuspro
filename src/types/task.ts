import { ApiResponse, ITimeStamp, PaginatedResponse } from "./app-types";

export type TaskPayload = {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  serviceUserPublicId: string;
  taskCategoryPublicId: string;
};

export interface TaskFilterParamsTypes {
  searchTerm: string;
  page: number;
  pageSize: number;
  startTime?: string;
  endTime?: string;
  role?: string;
}

export type Task = {
  publicId: string;
  title: string;
  startTime: string;
  endTime: string;
  description: string;
  rota: unknown | null;
  serviceUserPublicId: string;
  serviceUserName: string;
  taskCategory: string;
};

export type CreateTaskResponse = {
  timestamp: ITimeStamp;
  data: string;
  isError: boolean;
  status: number;
  message: string;
};

export type TaskResponse = ApiResponse<PaginatedResponse<Task>>;
