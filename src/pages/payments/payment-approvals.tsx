import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import DateRangeFilter from "@/components/ui/date-range-filter";
import StatCardV2 from "@/components/ui/stat-card-v2";
import PaymentApprovalDetail from "@/components/payment-approval-detail";
import {
  CircleCheckBig,
  CircleX,
  Clock3,
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreHorizontal,
  ReceiptText,
  Upload,
  Wallet,
} from "lucide-react";

type ApprovalStatus = "Pending" | "Approved" | "Rejected";

type ApprovalRow = {
  paymentId: string;
  requestDate: string;
  payee: string;
  payerType: string;
  category: string;
  requestedBy: string;
  amount: string;
  status: ApprovalStatus;
};

const approvalSummary = [
  {
    title: "Total Requests",
    value: "48",
    subtitle: "All payment requests",
    color: "purple" as const,
    icon: <Filter className="h-4 w-4" />,
  },
  {
    title: "Pending Approval",
    value: "18",
    subtitle: "$245,680.15",
    color: "green" as const,
    icon: <Clock3 className="h-4 w-4" />,
  },
  {
    title: "Approved",
    value: "22",
    subtitle: "$582,390.75",
    color: "yellow" as const,
    icon: <CircleCheckBig className="h-4 w-4" />,
  },
  {
    title: "Rejected",
    value: "6",
    subtitle: "$78,420.20",
    color: "red" as const,
    icon: <CircleX className="h-4 w-4" />,
  },
  {
    title: "Total Amount",
    value: "$906,491.45",
    subtitle: "All requests",
    color: "purple" as const,
    icon: <Wallet className="h-4 w-4" />,
  },
];

const approvalRows: ApprovalRow[] = [
  {
    paymentId: "PR-2025-00048",
    requestDate: "May 19, 2025\n10:30 AM",
    payee: "ABC Builders Inc.",
    payerType: "Vendor",
    category: "Vendor Payment",
    requestedBy: "Riverside Plant",
    amount: "$48,750.00",
    status: "Pending",
  },
  {
    paymentId: "PR-2025-00049",
    requestDate: "May 19, 2025\n10:30 AM",
    payee: "Fast freight Logistics",
    payerType: "Shipper",
    category: "Shipper Payment",
    requestedBy: "Logistics Dept.",
    amount: "$12,300.50",
    status: "Pending",
  },
  {
    paymentId: "PR-2025-00050",
    requestDate: "May 19, 2025\n10:30 AM",
    payee: "United Rentals",
    payerType: "Vendor",
    category: "Vendor Payment",
    requestedBy: "Equipment Dept.",
    amount: "$25,600.00",
    status: "Approved",
  },
  {
    paymentId: "PR-2025-00051",
    requestDate: "May 19, 2025\n10:30 AM",
    payee: "Safety Supplies Co.",
    payerType: "Vendor",
    category: "Other Expenses",
    requestedBy: "Safety Dept.",
    amount: "$3,250.75",
    status: "Pending",
  },
  {
    paymentId: "PR-2025-00052",
    requestDate: "May 19, 2025\n10:30 AM",
    payee: "Sunbelt Rentals",
    payerType: "Vendor",
    category: "Vendor Payment",
    requestedBy: "Riverside Plant",
    amount: "$18,900.00",
    status: "Rejected",
  },
  {
    paymentId: "PR-2025-00053",
    requestDate: "May 19, 2025\n10:30 AM",
    payee: "Elite Transport LLC",
    payerType: "Shipper",
    category: "Shipper Payment",
    requestedBy: "Logistics Dept.",
    amount: "$7,850.00",
    status: "Pending",
  },
];

const categoryStyles: Record<string, string> = {
  "Vendor Payment": "bg-emerald-500",
  "Shipper Payment": "bg-blue-500",
  "Other Expenses": "bg-violet-600",
};

const statusStyles: Record<ApprovalStatus, string> = {
  Pending: "bg-amber-500",
  Approved: "bg-emerald-500",
  Rejected: "bg-rose-500",
};

export default function PaymentApprovalsPage() {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<ApprovalRow | null>(
    null,
  );

  const handleReview = (row: ApprovalRow) => {
    setSelectedPayment({
      ...row,
      // Add additional data if needed
    });
    setIsDetailOpen(true);
  };

  const renderStatusBadge = (status: ApprovalStatus) => (
    <Badge
      className={`${statusStyles[status]} hover:${statusStyles[status]} text-white rounded px-3 py-0.5 h-auto! text-sm font-normal`}
    >
      {status}
    </Badge>
  );

  const renderCategoryBadge = (category: string) => (
    <Badge
      className={`${categoryStyles[category] ?? "bg-slate-500"} hover:${categoryStyles[category] ?? "bg-slate-500"} text-white rounded-md px-3 font-normal`}
    >
      {category}
    </Badge>
  );

  return (
    <div className="p-5 space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Payment Approvals
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review and approve payment requests from plants and departments.
          </p>
        </div>

        <Button
          variant="outline"
          className="bg-white text-slate-700 border-slate-200"
        >
          <Upload className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <Card className="p-4 border border-slate-100 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">
              Request Date
            </label>
            <DateRangeFilter />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">
              Category
            </label>
            <Select defaultValue="all-categories">
              <SelectTrigger className="bg-white w-full">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-categories">All Categories</SelectItem>
                <SelectItem value="vendor-payment">Vendor Payment</SelectItem>
                <SelectItem value="shipper-payment">Shipper Payment</SelectItem>
                <SelectItem value="other-expenses">Other Expenses</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">
              Requested By
            </label>
            <Select defaultValue="all-departments">
              <SelectTrigger className="bg-white w-full">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-departments">All Departments</SelectItem>
                <SelectItem value="plant">Plants</SelectItem>
                <SelectItem value="logistics">Logistics</SelectItem>
                <SelectItem value="safety">Safety</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Status</label>
            <Select defaultValue="all-status">
              <SelectTrigger className="bg-white w-full">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
        {approvalSummary.map((card) => (
          <StatCardV2
            key={card.title}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </div>

      <div className="bg-white">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900">
            Pending Approval
          </h2>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ReceiptText className="h-4 w-4" />
            Requests awaiting review
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-100/80">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="font-semibold text-slate-700 h-11 whitespace-nowrap">
                  Payment ID
                </TableHead>
                <TableHead className="font-semibold text-slate-700 h-11 whitespace-nowrap">
                  Request Date
                </TableHead>
                <TableHead className="font-semibold text-slate-700 h-11 whitespace-nowrap">
                  Payee / Vendor
                </TableHead>
                <TableHead className="font-semibold text-slate-700 h-11 whitespace-nowrap">
                  Category
                </TableHead>
                <TableHead className="font-semibold text-slate-700 h-11 whitespace-nowrap">
                  Requested By
                </TableHead>
                <TableHead className="font-semibold text-slate-700 h-11 whitespace-nowrap">
                  Amount
                </TableHead>
                <TableHead className="font-semibold text-slate-700 h-11 whitespace-nowrap">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-slate-700 h-11 whitespace-nowrap">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvalRows.map((row) => (
                <TableRow
                  key={row.paymentId}
                  className="border-b last:border-none"
                >
                  <TableCell className="py-4 font-medium text-slate-900 whitespace-nowrap">
                    {row.paymentId}
                  </TableCell>
                  <TableCell className="py-4 text-slate-600 whitespace-pre-line">
                    {row.requestDate}
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-900">
                        {row.payee}
                      </span>
                      <span className="text-xs text-slate-500">
                        {row.payerType}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    {renderCategoryBadge(row.category)}
                  </TableCell>
                  <TableCell className="py-4 text-slate-600">
                    {row.requestedBy}
                  </TableCell>
                  <TableCell className="py-4 font-medium text-slate-900 whitespace-nowrap">
                    {row.amount}
                  </TableCell>
                  <TableCell className="py-4">
                    {renderStatusBadge(row.status)}
                  </TableCell>
                  <TableCell className="py-4">
                    <Button
                      variant="outline"
                      className="h-8 rounded-md border-slate-200 bg-white text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={() => handleReview(row)}
                    >
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col gap-3 px-4 py-3 border-t border-slate-100 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center text-sm text-slate-500">
            Showing
            <Select defaultValue="10">
              <SelectTrigger className="h-8 w-16 mx-2 bg-white">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            Results
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-md border-slate-200 text-slate-400"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 rounded-md border-violet-500 text-violet-600 p-0"
            >
              1
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 rounded-md border-transparent text-slate-600 p-0 hover:bg-slate-50"
            >
              2
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 rounded-md border-transparent text-slate-600 p-0 hover:bg-slate-50"
            >
              3
            </Button>
            <div className="px-2 text-slate-400">
              <MoreHorizontal className="h-4 w-4" />
            </div>
            <Button
              variant="outline"
              className="h-8 w-8 rounded-md border-transparent text-slate-600 p-0 hover:bg-slate-50"
            >
              15
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-md border-slate-200 text-slate-600"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Payment Approval Detail Side Sheet */}
      <PaymentApprovalDetail
        isOpen={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        paymentData={
          selectedPayment
            ? {
                paymentId: selectedPayment.paymentId,
                payee: selectedPayment.payee,
                category: selectedPayment.category,
                requestedBy: selectedPayment.requestedBy,
                requestDate: selectedPayment.requestDate,
                reference: "INV-78945",
                dueDate: "May 30, 2025",
                amount: selectedPayment.amount,
                status: selectedPayment.status,
              }
            : undefined
        }
      />
    </div>
  );
}
