import React from "react";
import {
  Download,
  FileText,
  FileSpreadsheet,
  FileChartPie,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { Button } from "@/components/button";
import { Link } from "react-router-dom";
import { useTitle } from "@/hooks/useTitle";

export default function Reports() {
  const { updateTitle } = useTitle();

  React.useEffect(() => {
    updateTitle("Reports");
  }, []);
  const reports = [
    {
      title: "Care Hours",
      description: "Total care hours provided across all service users.",
      icon: <FileSpreadsheet className="h-6 w-6 text-blue-500" />,
      type: "Excel",
      path: "/reports/care-hours",
    },
    {
      title: "Commissioned Hours for Service Users",
      description: "Hours commissioned per service user for care provision.",
      icon: <FileText className="h-6 w-6 text-green-500" />,
      type: "PDF",
      path: "/reports/commissioned-hours",
    },
    {
      title: "Actual Hours Completed by Care Staff",
      description: "Actual hours completed by care staff for service users.",
      icon: <FileSpreadsheet className="h-6 w-6 text-purple-500" />,
      type: "Excel",
      path: "/reports/actual-hours",
    },
    {
      title: "Overtime Hours",
      description: "Overtime hours worked by staff members.",
      icon: <FileText className="h-6 w-6 text-orange-500" />,
      type: "PDF",
      path: "/reports/overtime-hours",
    },
    {
      title: "Bank Staff Hours",
      description: "Hours worked by bank/temporary staff members.",
      icon: <FileSpreadsheet className="h-6 w-6 text-yellow-500" />,
      type: "Excel",
      path: "/reports/bank-staff-hours",
    },
    {
      title: "Monthly Visits Completed",
      description:
        "Number of visits completed monthly across all service users.",
      icon: <FileChartPie className="h-6 w-6 text-blue-600" />,
      type: "Chart",
      path: "/reports/monthly-visits",
    },
    {
      title: "Monthly Hours Completed",
      description: "Total number of hours completed monthly.",
      icon: <FileSpreadsheet className="h-6 w-6 text-green-600" />,
      type: "Excel",
      path: "/reports/monthly-hours",
    },
    {
      title: "Missed Visits",
      description: "Number of missed visits and their details.",
      icon: <FileText className="h-6 w-6 text-red-500" />,
      type: "PDF",
      path: "/reports/missed-visits",
    },
    {
      title: "Missed Medications",
      description: "Number of missed medication administrations.",
      icon: <FileText className="h-6 w-6 text-red-600" />,
      type: "PDF",
      path: "/reports/missed-medications",
    },
    {
      title: "Monthly Medication Reports",
      description: "Comprehensive monthly medication administration reports.",
      icon: <FileSpreadsheet className="h-6 w-6 text-purple-600" />,
      type: "Excel",
      path: "/reports/monthly-medication",
    },
    {
      title: "Medication Errors",
      description: "Report of medication errors and incidents.",
      icon: <FileText className="h-6 w-6 text-red-700" />,
      type: "PDF",
      path: "/reports/medication-errors",
    },
    {
      title: "Total Commissioned Hours for Staff",
      description: "Total commissioned hours allocated to staff members.",
      icon: <FileSpreadsheet className="h-6 w-6 text-blue-700" />,
      type: "Excel",
      path: "/reports/staff-commissioned-hours",
    },
    {
      title: "Total Staff Hours Remaining",
      description: "Total number of staff hours left in current period.",
      icon: <FileChartPie className="h-6 w-6 text-green-700" />,
      type: "Chart",
      path: "/reports/staff-hours-remaining",
    },
    {
      title: "Total Hours Used Monthly",
      description: "Total number of hours used monthly across all services.",
      icon: <FileSpreadsheet className="h-6 w-6 text-orange-600" />,
      type: "Excel",
      path: "/reports/total-hours-used",
    },
    {
      title: "Total Tasks Missed Monthly",
      description: "Total number of tasks missed monthly.",
      icon: <FileText className="h-6 w-6 text-red-800" />,
      type: "PDF",
      path: "/reports/tasks-missed-count",
    },
    {
      title: "List of Tasks Missed Monthly",
      description: "Detailed list of tasks missed monthly with reasons.",
      icon: <FileSpreadsheet className="h-6 w-6 text-red-900" />,
      type: "Excel",
      path: "/reports/tasks-missed-list",
    },
    {
      title: "Alerts Raised vs Closed Monthly",
      description: "Monthly comparison of alerts raised versus alerts closed.",
      icon: <FileChartPie className="h-6 w-6 text-yellow-600" />,
      type: "Chart",
      path: "/reports/alerts",
    },
    {
      title: "Scheduled Tasks vs Tasks Closed Monthly",
      description:
        "Monthly comparison of scheduled tasks versus completed tasks.",
      icon: <FileChartPie className="h-6 w-6 text-purple-700" />,
      type: "Chart",
      path: "/reports/scheduled-tasks",
    },
  ];
  return (
    <div className="w-full h-full overflow-y-scroll pb-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold">
                {report.title}
              </CardTitle>
              {report.icon}
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <CardDescription className="mb-4">
                {report.description}
              </CardDescription>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="mt-auto w-full"
              >
                <Link to={report.path}>
                  <Download className="h-4 w-4 mr-2" />
                  View {report.type}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
