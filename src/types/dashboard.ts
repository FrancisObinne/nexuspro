import { ApiResponse } from "./app-types";

export interface DashboardType {
  totalUserCount: number;
  userTypeDistribution: {
    STAFF: number;
    SERVICE_USER: number;
    CARE_GIVER: number;
  };
  totalTaskCount: number;
  totalAssignedTask: number;
  totalRotaCount: number;
  tasksCompletedThisWeek: number;
  newUsersThisMonth: number;
  taskStatusDistribution: unknown;
  periodStart: null;
  periodEnd: null;
}

export type DashboardStatResponse = ApiResponse<DashboardType>;
