
import { StaffMember } from "@/types/staff";

export type ServiceUser = {
  fullName: string;
  rating: string;
  contactNumber: string;
  emailAddress: string;
  address: string;
  additionalNotes?: string;
};

export type Task = {
  id: number;
  title: string;
  serviceUser: string;
  ragRating: string;
  startTime: string;
  endTime: string;
  duration: string;
  description?: string;
};

export type Notification = {
  id: number;
  title: string;
  message: string;
  read: boolean;
  type: string;
  actions?: {
    approve: () => void;
    reject: () => void;
  };
  staff?: StaffMember;
  serviceUser?: ServiceUser;
  task?: Task;
  changedFields?: Record<string, { previous: string; current: string }>;
};

export type StaffUpdateNotification = {
  id: number;
  title: string;
  message: string;
  read: boolean;
  type: "approval";
  staff: StaffMember;
  changedFields?: Record<string, { previous: string; current: string }>;
  actions: {
    approve: () => void;
    reject: () => void;
  };
};
