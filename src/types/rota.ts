import { ApiResponse, ITimeStamp, PaginatedResponse } from "./app-types";
import { Task } from "./task";

export interface RotaFilterParamsTypes {
  searchTerm: string;
  page: number;
  pageSize: number;
  startTime?: string;
  endTime?: string;
}

export interface Rota {
  publicId: string;
  rotaName: string;
  description: string;
  startTime: string;
  endTime: string;
  dayType: string;
  staffName: string;
  tasks: Task[];
}

export type RotaResponse = ApiResponse<PaginatedResponse<Rota>>;

export interface RotaFormValues {
  rotaName: string;
  description: string;
  startTime: string;
  endTime: string;
  duration: string;
}

export interface CreateRotaPayload {
  rotaName: string;
  description: string;
  startTime: string;
  endTime: string;
  taskPublicIds: string[];
}

export type CreateRotaResponse = {
  timestamp: ITimeStamp;
  data: string;
  isError: false;
  message: string;
};

export interface AssignStaffToRotaPayload {
  rotaId: string;
  staffId: string;
}
