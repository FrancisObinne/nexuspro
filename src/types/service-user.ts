import { ApiResponse, PaginatedResponse } from "./app-types";
import { TableOrderDirection } from "./table";

export interface ServiceUserItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  rating: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  apartmentNumber: string;
  buildingName: string;
}

export interface NextOfKin {
  publicId?: string;
  firstName: string;
  lastName: string;
  emails: string[];
  phoneNumbers: string[];
  gender: string;
  relationship: string;
  // address: Address;
}

export interface ServiceUserPayload {
  email: string;
  firstName: string;
  lastName: string;
  address: Address;
  phoneNumber: string;
  rating: "HIGH" | "MEDIUM" | "LOW";
  lasNumber: string;
  nhsNumber: string;
  doorCode: string;
  religion: string;
  medicalHistory: string;
  emergencyContact: string;
  aboutServiceUser: string;
  riskAssessment: boolean;
  dateOfBirth: string;
  nextOfKins: NextOfKin[];
}

export type ServiceUser = {
  publicId: string;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
  rating: string;
  lasNumber: string;
  nhsNumber: string;
  doorCode: string;
  roleName: string;
  roleId: string;
  userType: string;
  religion: string;
  medicalHistory: string;
  serviceUserPublicId: string;
  contactNumber: string | null;
  emergencyContact: string;
  aboutServiceUser: string;
  riskAssessment: boolean;
  dateOfBirth: string;
  phoneNumber: string;
  nextOfKins: NextOfKin[];
  serviceUserType: string | null;
};

export interface EditServiceUserPayload {
  email: string;
  serviceUserPublicId: string;
  firstName: string;
  lastName: string;
  address: Address;
  phoneNumber: string;
  rating: "HIGH" | "MEDIUM" | "LOW";
  lasNumber: string;
  nhsNumber: string;
  doorCode: string;
  religion: string;
  medicalHistory: string;
  emergencyContact: string;
  contactNumber: string;
  aboutServiceUser: string;
  riskAssessment: boolean;
  dateOfBirth: string;
}

export interface GetServiceUserResponse {
  items: ServiceUser[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export type ServiceUserOrderBy =
  | "FirstName"
  | "LastName"
  | "Email"
  | "DateOfBirth"
  | "Rating"
  | "Status"
  | "CreatedDate"
  | "";

export type StatusEnum = "ACTIVE" | "INACTIVE" | "AWAY" | "";
export type RatingEnum = "HIGH" | "MEDIUM" | "LOW" | "";

export type ServiceUserrderDirection = "Ascending" | "Descending" | "";

export interface ServiceUserFilterParamsTypes {
  searchTerm?: string;
  page?: number;
  pageSize?: number;
  rating?: RatingEnum;
  status?: StatusEnum;
  orderBy?: ServiceUserOrderBy;
  orderDirection?: TableOrderDirection;
}

export type ServiceUserResponse = ApiResponse<PaginatedResponse<ServiceUser>>;
