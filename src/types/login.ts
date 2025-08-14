import { ITimeStamp } from "./app-types";
import { IUser } from "./user";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  timestamp: ITimeStamp;
  data: {
    success: boolean;
    user: IUser;
    token: string;
    refreshToken: string;
    role: string;
    roleId: string;
    errors: [];
  };
  isError: boolean;
  status: number;
  message: string;
}
