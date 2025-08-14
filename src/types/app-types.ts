export interface ITimeStamp {
  localTimeZone: {
    id: string;
    hasIanaId: boolean;
    displayName: string;
    standardName: string;
    daylightName: string;
    baseUtcOffset: string;
    supportsDaylightSavingTime: boolean;
  };
  timestampFrequency: number;
}

export interface ApiResponse<T> {
  data: T;
  isError: boolean;
  status: number;
  message: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
