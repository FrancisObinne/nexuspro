export type UserType = "admin" | "caregiver" | "service-user";

export interface IUser {
  publicId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}
