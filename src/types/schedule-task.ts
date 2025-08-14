export interface IStaffMember {
  id: string;
  name: string;
  startTime: string;
  role?: string;
}

export interface ScheduleTask {
  id: string;
  staffId: string;
  clientName: string;
  taskType: string;
  startTime: string;
  endTime: string;
  location?: string;
  duration?: number;
}
