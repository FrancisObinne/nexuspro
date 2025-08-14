import { Address, NextOfKin } from "./service-user";

export interface StaffMember {
  id: number;
  name: string;
  avatar: string;
  role: string;
  email: string;
  status: string;
  lastLogin: string;
  phone: string;
  address: string;
  department: string;
  workHours: number;
}

export interface CreateStaffPayload {
  email: string;
  firstName: string;
  lastName: string;
  roleId: string;
  profilePicture: string;
  department: string;
  address: Address;
  phoneNumber: string;
  status?: string;
  nextOfKins: NextOfKin[];
}

export interface Staff {
  publicId: string;
  staffPublicId: string;
  roleId: string;
  roleName: string;
  status: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  department: string;
  email: string;
  address: Address;
  phoneNumber: string | null;
  nextOfKins: NextOfKin[];
}

export interface GetStaffResponse {
  items: Staff[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export type StaffFilterParamsTypes = {
  searchTerm?: string;
  page?: number;
  pageSize?: number;
  role?: string;
  status?: string;
};
