import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { TableOrderDirection } from "@/types/table";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Database,
  MoreVertical,
} from "lucide-react";
import React from "react";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Input } from "../input";

export type TableColumn<T> = {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  isSortable?: boolean;
};

type ReusableTableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  rowKey: (item: T) => string;
  onRowClick?: (item: T) => void;
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
  isLoading?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  isFilter?: boolean;
  onFilterClick?: () => void;
  headerActions?: React.ReactNode;
  onSort?: (key: keyof T | string) => void;
  sortKey?: keyof T | string;
  sortDirection?: TableOrderDirection;
  filterContent?: React.ReactNode;
  onApplyFilters?: () => void;
  onMenuClick?: (item: T) => void;
  DropdownMenuItem?: React.ReactNode;
  searchPlaceholder?: string;
};

export function CustomTable<T extends object>({
  data,
  columns,
  rowKey,
  onRowClick,
  currentPage,
  pageSize,
  totalRecords,
  hasNextPage,
  hasPreviousPage,
  totalPages,
  onPageChange,
  onPageSizeChange,
  isLoading = false,
  searchValue = "",
  onSearchChange,
  headerActions,
  onSort,
  sortKey,
  sortDirection,
  onMenuClick,
  DropdownMenuItem,
}: ReusableTableProps<T>) {
  const [openRowKey, setOpenRowKey] = React.useState<string | null>(null);

  const renderSkeletonRows = () => {
    return Array.from({ length: 5 }).map((_, rowIndex) => (
      <TableRow key={`skeleton-${rowIndex}`}>
        {columns.map((_, colIndex) => (
          <TableCell key={`skeleton-cell-${colIndex}`}>
            <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <div className="overflow-x-auto space-y-4 py-8">
      <div className="flex items-center flex-wrap justify-between px-2 md:px-4">
        <div className="flex items-center space-x-2">
          <div className="relative w-full sm:w-80">
            <Input
              placeholder="Search service users..."
              className="pl-10"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div>{headerActions}</div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={String(col.key)}
                className={col.isSortable ? "cursor-pointer select-none" : ""}
                onClick={() => col.isSortable && onSort?.(col.key)}
              >
                <div className="flex items-center space-x-1">
                  <span>{col.header}</span>
                  <p>
                    {" "}
                    {col.isSortable &&
                      sortKey === col.key &&
                      (sortDirection === "Ascending" ? (
                        <ChevronUp className="w-4 h-4 bg-red-900" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </p>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            renderSkeletonRows()
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-12">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Database className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-gray-900">
                      No data found
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      There are no records to display.
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow
                key={rowKey(item)}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((col) => (
                  <TableCell key={String(col.key)}>
                    {col.key === "menu-icon" ? (
                      <DropdownMenu
                        open={openRowKey === rowKey(item)}
                        onOpenChange={(isOpen) => {
                          if (!isOpen) {
                            setOpenRowKey(null);
                          }
                        }}
                      >
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              onMenuClick?.(item);
                              setOpenRowKey(rowKey(item));
                            }}
                          >
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {DropdownMenuItem}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : col.render ? (
                      col.render(item)
                    ) : col.key in item ? (
                      String(item[col.key as keyof T])
                    ) : (
                      "-"
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {totalRecords > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-200 gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Show</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-700">per page</span>
          </div>

          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={!hasPreviousPage}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={!hasNextPage}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
