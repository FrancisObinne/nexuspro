import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/button";
import { Calendar } from "@/components/calender";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { cn } from "@/lib/utils";

interface DateRangeFilterProps {
  onDateRangeChange: (dateRange: DateRange | undefined) => void;
  className?: string;
}

const predefinedRanges = [
  {
    label: "This Week",
    getValue: () => ({
      from: startOfWeek(new Date()),
      to: endOfWeek(new Date()),
    }),
  },
  {
    label: "Last Week",
    getValue: () => ({
      from: startOfWeek(subWeeks(new Date(), 1)),
      to: endOfWeek(subWeeks(new Date(), 1)),
    }),
  },
  {
    label: "This Month",
    getValue: () => ({
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date()),
    }),
  },
  {
    label: "Last Month",
    getValue: () => ({
      from: startOfMonth(subMonths(new Date(), 1)),
      to: endOfMonth(subMonths(new Date(), 1)),
    }),
  },
  {
    label: "This Year",
    getValue: () => ({
      from: startOfYear(new Date()),
      to: endOfYear(new Date()),
    }),
  },
  {
    label: "Last Year",
    getValue: () => ({
      from: startOfYear(subYears(new Date(), 1)),
      to: endOfYear(subYears(new Date(), 1)),
    }),
  },
];

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  onDateRangeChange,
  className,
}) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedRange, setSelectedRange] = useState<string>("");

  const handlePredefinedRangeSelect = (rangeLabel: string) => {
    const range = predefinedRanges.find((r) => r.label === rangeLabel);
    if (range) {
      const newDateRange = range.getValue();
      setDateRange(newDateRange);
      setSelectedRange(rangeLabel);
      onDateRangeChange(newDateRange);
    }
  };

  const handleCustomDateRangeSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    setSelectedRange("Custom");
    onDateRangeChange(range);
  };

  const formatDateRange = () => {
    if (!dateRange?.from) return "Select date range";
    if (!dateRange.to) return format(dateRange.from, "LLL dd, y");
    return `${format(dateRange.from, "LLL dd, y")} - ${format(dateRange.to, "LLL dd, y")}`;
  };

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Select value={selectedRange} onValueChange={handlePredefinedRangeSelect}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Quick select" />
        </SelectTrigger>
        <SelectContent>
          {predefinedRanges.map((range) => (
            <SelectItem key={range.label} value={range.label}>
              {range.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDateRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={handleCustomDateRangeSelect}
            numberOfMonths={2}
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>

      {dateRange && (
        <Button
          variant="ghost"
          onClick={() => {
            setDateRange(undefined);
            setSelectedRange("");
            onDateRangeChange(undefined);
          }}
        >
          Clear
        </Button>
      )}
    </div>
  );
};
