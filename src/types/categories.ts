import { TableOrderDirection } from "./table";

export interface CategoryPayload {
  name: string;
  description: string;
}

export interface CategoryResponse {
  publicId: string;
  name: string;
  description: string;
}

export interface GetCategoriesResponse {
  items: CategoryResponse[];
  pageNumber: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export type CategorySortBy =
  | "name"
  | "status"
  | "createdDate"
  | "";

export type CategoryStatusEnum = "ACTIVE" | "INACTIVE" | "AWAY" | "";

export interface CategoryFilterParamsTypes {
  name?: string;
  page?: number;
  pageSize?: number;
  status?: CategoryStatusEnum;
  sortBy?: CategorySortBy;
  sortOrder?: TableOrderDirection;
}