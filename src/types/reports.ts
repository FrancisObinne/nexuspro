import { TableOrderDirection } from "./table";

export interface ReportDataItem {
  
}

///////////// BANK STAFF HOURS //////////////////////////////////////////////////////////////////////////////////
export interface BankStaffHoursReportItem extends ReportDataItem {
  publicId: string;
  staffPublicId: string;
  staffMember: string;
  hoursWorked: string; 
  hourlyRate: string;  
  totalCost: string;   
  serviceUser: string;
  date: string; 
  shift: string;
}

export interface GetBankStaffHoursResponse {
  items: BankStaffHoursReportItem[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

///////////// QUERY PARAMS TYPES //////////////////////////////////////////////////////////////////////////////
export type ReportsSortBy =
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

export interface ReportQueryParamsTypes {
  startDate?: string; 
  endDate?: string;   
  searchTerm?: string;
  page?: number;
  pageSize?: number;
  rating?: RatingEnum;
  status?: StatusEnum;
  sortBy?: ReportsSortBy;
  sortOrder?: TableOrderDirection;
}