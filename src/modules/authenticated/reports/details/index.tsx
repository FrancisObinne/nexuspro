import { Button } from "@/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { CustomTable } from "@/components/custom-table";
import { DateRangeFilter } from "@/components/date-range";
import { ArrowLeft, Download } from "lucide-react";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import {
  BankStaffHoursReportItem
} from "@/types";
import { useGetReportByType } from "@/hooks";

export default function ReportDetails() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { type } = useParams<{ type: string }>();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  console.log(type);
  const { reportData, reportFilter, setReportFilter, isPending, meta } = useGetReportByType(type);

  const getTableColumns = (reportType: string | undefined) => {
    switch (reportType) {
      case "bank-staff-hours":
        return [
          {
            key: "staffMember",
            header: "Bank Staff Member",
            sortable: true,
            filterable: true,
          },
          { key: "hoursWorked", header: "Hours Worked", sortable: true },
          { key: "hourlyRate", header: "Hourly Rate", sortable: true },
          { key: "totalCost", header: "Total Cost", sortable: true },
          {
            key: "serviceUser",
            header: "Service User",
            sortable: true,
            filterable: true,
          },
          { key: "date", header: "Date", sortable: true },
          { key: "shift", header: "Shift Type", sortable: true, filterable: true },
        ];
      
      case "care-hours":
        return [
          { key: "date", header: "Date" },
          { key: "serviceUser", header: "Service User" },
          { key: "totalHours", header: "Total Hours" },
        ];
      default:
        return [];
    }
  };

  const currentTableData = reportData || [];
  const tableColumns = getTableColumns(type);

  if (isPending) {
    return <div className="p-8 text-center">Loading report data...</div>;
  }

  const getReportTitle = (type: string | undefined) => {
    switch (type) {
        case "care-hours": return "Care Hours Report";
        case "commissioned-hours": return "Commissioned Hours for Service Users Report";
        case "actual-hours": return "Actual Hours Completed by Care Staff Report";
        case "overtime-hours": return "Overtime Hours Report";
        case "bank-staff-hours": return "Bank Staff Hours Report";
        case "monthly-visits": return "Monthly Visits Completed Report";
        case "monthly-hours": return "Monthly Hours Completed Report";
        case "missed-visits": return "Missed Visits Report";
        case "missed-medications": return "Missed Medications Report";
        case "monthly-medication": return "Monthly Medication Reports";
        case "medication-errors": return "Medication Errors Report";
        case "staff-commissioned-hours": return "Total Commissioned Hours for Staff Report";
        case "staff-hours-remaining": return "Total Staff Hours Remaining Report";
        case "total-hours-used": return "Total Hours Used Monthly Report";
        case "tasks-missed-count": return "Total Tasks Missed Monthly Report";
        case "tasks-missed-list": return "List of Tasks Missed Monthly Report";
        case "alerts": return "Alerts Raised vs Closed Monthly Report";
        case "scheduled-tasks": return "Scheduled Tasks vs Tasks Closed Monthly Report";
        default: return "Report Details";
    }
  };

  const tableData = [
    {
      staffMember: "Alex Thompson",
      hoursWorked: "8.0",
      hourlyRate: "£22.50",
      totalCost: "£180.00",
      serviceUser: "John Smith",
      date: "2024-01-15",
      shift: "Day Shift",
    },
    {
      staffMember: "Rachel Green",
      hoursWorked: "12.0",
      hourlyRate: "£25.00",
      totalCost: "£300.00",
      serviceUser: "Mary Johnson",
      date: "2024-01-14",
      shift: "Night Shift",
    },
    {
      staffMember: "James Brown",
      hoursWorked: "6.0",
      hourlyRate: "£20.00",
      totalCost: "£120.00",
      serviceUser: "Lisa Brown",
      date: "2024-01-13",
      shift: "Evening Shift",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex items-center justify-between">
        <Button asChild variant="outline">
          <Link to="/reports">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Reports
          </Link>
        </Button>
        <h2 className="text-2xl font-bold">{getReportTitle(type)}</h2>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Download Excel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter by Date Range</CardTitle>
        </CardHeader>
        <CardContent>
          <DateRangeFilter onDateRangeChange={setDateRange} />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Bank Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {tableData.reduce((sum, item) => sum + parseFloat(item.hoursWorked), 0).toFixed(1)}
            </div>
            <p className="text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              £{tableData.reduce((sum, item) => sum + parseFloat(item.totalCost.replace('£', '')), 0).toFixed(2)}
            </div>
            <p className="text-muted-foreground">Bank staff costs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {tableData.length > 0 ?
                 `£${(tableData.reduce((sum, item) => sum + parseFloat(item.hourlyRate.replace('£', '')), 0) / tableData.length).toFixed(2)}`
                 : "N/A"}
            </div>
            <p className="text-muted-foreground">Per hour</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{getReportTitle(type)} Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomTable
            columns={tableColumns}
            data={tableData}
            rowKey={(row) => row.serviceUser}
            currentPage={1}
            pageSize={10}
            totalPages={1}
            onPageChange={() => {}}
            onPageSizeChange={() => {}}
            hasNextPage={false}
            hasPreviousPage={false}
            totalRecords={tableData.length}
          />
        </CardContent>
      </Card>
    </div>
  );
}
