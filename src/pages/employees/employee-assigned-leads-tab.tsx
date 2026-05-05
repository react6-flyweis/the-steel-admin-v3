import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/Pagination";
import DateRangeFilter from "@/components/ui/date-range-filter";
import { Eye } from "lucide-react";
import type { DateRange as RDateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import LeadDetailDialog from "@/components/leads/lead-detail-dialog";

export type Lead = {
  id: string;
  name: string;
  code?: string;
  location?: string;
  status?: string;
  quoteValue?: string;
  createdAt?: string;
};

type AssignedLeadsTabProps = {
  leads: Lead[];
  dateRange: RDateRange | undefined;
  onDateRangeChange: (range: RDateRange | undefined) => void;
  currentPage: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (count: number) => void;
};

const getStatusBadgeClasses = (status?: string) => {
  if (!status) return "bg-slate-100 text-slate-700";
  const normalized = status.toLowerCase();
  if (normalized.includes("payment")) return "bg-violet-100 text-violet-700";
  if (normalized.includes("quotation") || normalized.includes("quote"))
    return "bg-amber-100 text-amber-700";
  if (normalized.includes("closed") || normalized.includes("won"))
    return "bg-emerald-100 text-emerald-700";
  return "bg-slate-100 text-slate-700";
};

export function EmployeeAssignedLeadsTab({
  leads,
  dateRange,
  onDateRangeChange,
  currentPage,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: AssignedLeadsTabProps) {
  return (
    <div>
      <div className="w-full flex sm:justify-end">
        <DateRangeFilter
          value={dateRange}
          onChange={onDateRangeChange}
          className="bg-white max-w-60"
        />
      </div>

      <div className="overflow-x-auto bg-gray-50 mt-5">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b border-gray-200 bg-[#ECEEF2] hover:bg-[#ECEEF2]">
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6">
                Lead Info
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6">
                Status
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6">
                Quote Value
              </TableHead>
              <TableHead className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length > 0 ? (
              leads.map((lead) => (
                <TableRow
                  key={lead.id}
                  className="border-b border-gray-200 hover:bg-gray-50/70"
                >
                  <TableCell className="px-4 py-4 align-top sm:px-6">
                    <div className="text-sm font-medium text-gray-900">
                      {lead.name}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {lead.code}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {lead.location}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-4 align-top sm:px-6">
                    <Badge
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeClasses(lead.status)}`}
                    >
                      {lead.status ?? "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-4 align-top sm:px-6">
                    <div className="text-sm font-semibold text-gray-900">
                      {lead.quoteValue}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-right align-top sm:px-6">
                    <LeadDetailDialog
                      lead={lead}
                      trigger={
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          aria-label="View lead"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="border-b border-gray-200">
                <TableCell
                  colSpan={4}
                  className="px-4 py-10 text-center text-sm text-gray-500 sm:px-6"
                >
                  No assigned leads found for this employee.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="bg-white">
        {leads.length > 0 && (
          <Pagination
            totalItems={leads.length}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10, 20, 50]}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
          />
        )}
      </div>
    </div>
  );
}
