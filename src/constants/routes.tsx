import React from "react";
import { NavlinkProps } from "@/types/routes";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Calendar,
  ClipboardList,
  FileText,
  Pill,
  BarChart3,
  Settings,
  CalendarDays,
  BookCheck,
  FileCheck,
} from "lucide-react";

const basePath = "/";

export const AuthRouteLinks = {
  dashboard: () => basePath,
  serviceUsers: {
    index: () => basePath + "service-users",
    create: () => basePath + "service-users/create",
  },
  staff: () => basePath + "staff",
  rota: () => basePath + "rota",
  schedules: () => basePath + "schedules",
  carePlans: () => basePath + "care-plans",
  categories: () => basePath + "categories",
  taskManagement: () => basePath + "task",
  schedulesByTask: () => basePath + "schedules-by-task",
  medications: () => basePath + "medications",
  reports: () => basePath + "reports",
  settings: () => basePath + "settings",
};

export const menuItems: NavlinkProps[] = [
  {
    to: AuthRouteLinks.dashboard(),
    label: "Dashboard",
    grantPermission: ["admin", "caregiver", "service-user"],
    Icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    to: AuthRouteLinks.serviceUsers.index(),
    label: "Service Users",
    grantPermission: ["admin"],
    Icon: <Users className="h-5 w-5" />,
  },
  {
    to: AuthRouteLinks.taskManagement(),
    label: "Task Management",
    grantPermission: ["admin"],
    Icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    to: AuthRouteLinks.staff(),
    label: "Staff Management",
    grantPermission: ["admin"],
    Icon: <UserCog className="h-5 w-5" />,
  },
  {
    to: AuthRouteLinks.categories(),
    label: "Care Categories",
    grantPermission: ["admin"],
    Icon: <BookCheck className="h-5 w-5" />,
  },
  {
    to: AuthRouteLinks.rota(),
    label: "Rota",
    grantPermission: ["admin"],
    Icon: <Calendar className="h-5 w-5" />,
  },
  {
    to: AuthRouteLinks.schedules(),
    label: "Manage Schedules",
    grantPermission: ["admin"],
    Icon: <FileText className="h-5 w-5" />,
  },
  {
    to: AuthRouteLinks.carePlans(),
    label: "Schedules",
    grantPermission: ["admin"],
    Icon: <FileCheck className="h-5 w-5" />,
  },
  {
    to: AuthRouteLinks.schedulesByTask(),
    label: "Schedules By Task",
    grantPermission: ["admin"],
    Icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    to: AuthRouteLinks.medications(),
    label: "Medications",
    grantPermission: ["admin"],
    Icon: <Pill className="h-5 w-5" />,
  },
  {
    to: AuthRouteLinks.reports(),
    label: "Reports",
    grantPermission: ["admin"],
    Icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    to: AuthRouteLinks.settings(),
    label: "Settings",
    grantPermission: ["admin", "caregiver", "service-user"],
    Icon: <Settings className="h-5 w-5" />,
  },
];
