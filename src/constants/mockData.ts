import { IStaffMember, ScheduleTask } from "@/types";

export const mockStaffData: IStaffMember[] = [
  { id: "1", name: "Sarah Johnson", startTime: "4:35" },
  { id: "2", name: "Michael Chen", startTime: "3:45" },
  { id: "3", name: "Emma Wilson", startTime: "5:10" },
  { id: "4", name: "Robert Taylor", startTime: "5:35" },
  { id: "5", name: "Lisa Brown", startTime: "4:15" },
  { id: "6", name: "John Doe", startTime: "4:35" },
  { id: "7", name: "John Smith", startTime: "0:00" },
  { id: "8", name: "Amanda Chan", startTime: "4:20" },
  { id: "9", name: "Abigail Stone", startTime: "5:05" },
  { id: "10", name: "Spokeman Grace", startTime: "4:35" },
  { id: "11", name: "Andrey Water", startTime: "5:55" },
  { id: "12", name: "Kim Anthony", startTime: "2:55" },
  { id: "13", name: "Kan Kel", startTime: "0:00" },
  { id: "14", name: "Cat Wilson", startTime: "0:00" },
  { id: "15", name: "Grace Joy", startTime: "0:00" },
];

export const mockScheduleData: ScheduleTask[] = [
  // Sarah Johnson tasks
  {
    id: "t1",
    staffId: "1",
    clientName: "Smith",
    taskType: "Personal Care",
    startTime: "06:00",
    endTime: "08:00",
    location: "Room 12",
  },
  {
    id: "t2",
    staffId: "1",
    clientName: "Ken",
    taskType: "Medication",
    startTime: "08:30",
    endTime: "09:00",
    location: "Room 8",
  },

  // Michael Chen tasks
  {
    id: "t3",
    staffId: "2",
    clientName: "Water",
    taskType: "Personal Care",
    startTime: "05:00",
    endTime: "06:30",
    location: "Room 15",
  },
  {
    id: "t4",
    staffId: "2",
    clientName: "David",
    taskType: "Meal Prep",
    startTime: "07:00",
    endTime: "08:00",
    location: "Kitchen",
  },

  // Emma Wilson tasks
  {
    id: "t5",
    staffId: "3",
    clientName: "Martin",
    taskType: "Personal Care",
    startTime: "06:00",
    endTime: "07:30",
    location: "Room 3",
  },
  {
    id: "t6",
    staffId: "3",
    clientName: "Lesley",
    taskType: "Social",
    startTime: "09:00",
    endTime: "10:00",
    location: "Lounge",
  },

  // Robert Taylor tasks
  {
    id: "t7",
    staffId: "4",
    clientName: "Barry",
    taskType: "Transport",
    startTime: "10:00",
    endTime: "12:00",
    location: "Vehicle 1",
  },

  // Lisa Brown tasks
  {
    id: "t8",
    staffId: "5",
    clientName: "Sam",
    taskType: "Personal Care",
    startTime: "07:00",
    endTime: "08:30",
    location: "Room 7",
  },
  {
    id: "t9",
    staffId: "5",
    clientName: "Margaret",
    taskType: "Medication",
    startTime: "12:00",
    endTime: "12:30",
    location: "Room 11",
  },

  // John Doe tasks
  {
    id: "t10",
    staffId: "6",
    clientName: "Victoria",
    taskType: "Personal Care",
    startTime: "08:00",
    endTime: "09:30",
    location: "Room 5",
  },

  // John Smith tasks
  {
    id: "t11",
    staffId: "8",
    clientName: "Margaret",
    taskType: "Personal Care",
    startTime: "09:00",
    endTime: "10:30",
    location: "Room 11",
  },
  {
    id: "t12",
    staffId: "8",
    clientName: "John",
    taskType: "Social",
    startTime: "14:00",
    endTime: "15:00",
    location: "Garden",
  },

  // Amanda Chan tasks
  {
    id: "t13",
    staffId: "9",
    clientName: "Patricia",
    taskType: "Cleaning",
    startTime: "10:00",
    endTime: "11:30",
    location: "Room 9",
  },

  // Abigail Stone tasks
  {
    id: "t14",
    staffId: "10",
    clientName: "Sarah",
    taskType: "Personal Care",
    startTime: "11:00",
    endTime: "12:30",
    location: "Room 13",
  },

  // Spokeman Grace tasks
  {
    id: "t15",
    staffId: "11",
    clientName: "Michael",
    taskType: "Transport",
    startTime: "13:00",
    endTime: "15:00",
    location: "Vehicle 2",
  },
];
