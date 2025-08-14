import { ApiResponse, PaginatedResponse } from "./app-types";

export type Role = {
  publicId: string;
  name: string;
  description: string;
  permissions: Permission[];
};

type Permission = {
  publicId: string;
  name: string;
  description: string;
};

export type RolesResponse = ApiResponse<PaginatedResponse<Role>>;
