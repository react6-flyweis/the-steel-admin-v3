import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Clock3,
  Download,
  Receipt,
  Truck,
} from "lucide-react";
import type { ReactNode } from "react";

type SummaryCard = {
  title: string;
  amount: string;
  subtitle: string;
  borderClass: string;
  accentClass: string;
  iconBgColor: string;
  icon: ReactNode;
};

type PaymentItem = {
  name: string;
  ref: string;
  amount: string;
  due: string;
  icon: ReactNode;
};

type PaymentRow = {
  id: string;
  entity: string;
  entityType: "Vendor" | "Carrier";
  invoice: string;
  amount: number;
  dueDate: string | null;
  paymentDate: string | null;
  status: "Due Soon" | "Scheduled" | "Paid" | "Overdue";
  project: string;
  method: "Bank Transfer" | "ACH" | "Check" | "Card";
};

const summaryCards: SummaryCard[] = [
  {
    title: "Total Outstanding",
    amount: "$77,200",
    subtitle: "3 due soon, 1 overdue",
    borderClass: "border-amber-400",
    accentClass: "text-amber-600",
    iconBgColor: "bg-amber-100",
    icon: <Clock3 className="h-5 w-5 text-amber-500" />,
  },
  {
    title: "Total Paid",
    amount: "$48,300",
    subtitle: "This period",
    borderClass: "border-emerald-500",
    accentClass: "text-emerald-600",
    iconBgColor: "bg-emerald-100",
    icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
  },
  {
    title: "Vendor Payments",
    amount: "$105,550",
    subtitle: "4 vendors",
    borderClass: "border-blue-500",
    accentClass: "text-slate-500",
    iconBgColor: "bg-blue-100",
    icon: <Building2 className="h-5 w-5 text-blue-500" />,
  },
  {
    title: "Carrier Payments",
    amount: "$19,950",
    subtitle: "4 carriers",
    borderClass: "border-orange-500",
    accentClass: "text-slate-500",
    iconBgColor: "bg-orange-100",
    icon: <Truck className="h-5 w-5 text-orange-500" />,
  },
];

const overduePayments: PaymentItem[] = [
  {
    name: "QuickHaul Transport",
    ref: "CAR-2024-0091",
    amount: "$5,200",
    due: "Due: 2024-03-01",
    icon: <Truck className="h-4 w-4 text-red-500" />,
  },
];

const dueSoonPayments: PaymentItem[] = [
  {
    name: "ABC Concrete Shippers",
    ref: "VND-2024-0123",
    amount: "$15,250",
    due: "Due: 2024-04-15",
    icon: <Receipt className="h-4 w-4 text-amber-500" />,
  },
  {
    name: "Elite Steel Supply",
    ref: "VND-2024-0125",
    amount: "$42,000",
    due: "Due: 2024-04-20",
    icon: <Receipt className="h-4 w-4 text-amber-500" />,
  },
  {
    name: "Express Logistics Co",
    ref: "CAR-2024-0095",
    amount: "$6,750",
    due: "Due: 2024-03-30",
    icon: <Truck className="h-4 w-4 text-amber-500" />,
  },
];

export default function PaymentStatusDashboardPage() {
  const [query, setQuery] = useState("");
  const [methodFilter, setMethodFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const payments: PaymentRow[] = [
    {
      id: "1",
      entity: "ABC Concrete Shippers",
      entityType: "Vendor",
      invoice: "VND-2024-0123",
      amount: 15250,
      dueDate: "2024-04-15",
      paymentDate: "2024-03-08",
      status: "Due Soon",
      project: "Residential Complex A",
      method: "Bank Transfer",
    },
    {
      id: "2",
      entity: "FastTruck Logistics",
      entityType: "Carrier",
      invoice: "CAR-2024-0089",
      amount: 3850,
      dueDate: "2024-03-25",
      paymentDate: "2024-03-25",
      status: "Scheduled",
      project: "Commercial Building B",
      method: "ACH",
    },
    {
      id: "3",
      entity: "Premier Building Materials",
      entityType: "Vendor",
      invoice: "VND-2024-0124",
      amount: 28500,
      dueDate: "2024-03-10",
      paymentDate: "2024-03-08",
      status: "Paid",
      project: "Infrastructure Project C",
      method: "Check",
    },
    {
      id: "4",
      entity: "QuickHaul Transport",
      entityType: "Carrier",
      invoice: "CAR-2024-0091",
      amount: 5200,
      dueDate: "2024-03-01",
      paymentDate: null,
      status: "Overdue",
      project: "Hospital Extension",
      method: "Bank Transfer",
    },
    {
      id: "5",
      entity: "Elite Steel Supply",
      entityType: "Vendor",
      invoice: "VND-2024-0125",
      amount: 42000,
      dueDate: "2024-04-20",
      paymentDate: null,
      status: "Due Soon",
      project: "School Building",
      method: "ACH",
    },
    {
      id: "6",
      entity: "Reliable Freight Services",
      entityType: "Carrier",
      invoice: "CAR-2024-0093",
      amount: 4150,
      dueDate: "2024-04-05",
      paymentDate: "2024-04-05",
      status: "Scheduled",
      project: "Commercial Building B",
      method: "Bank Transfer",
    },
    {
      id: "7",
      entity: "Concrete Masters",
      entityType: "Vendor",
      invoice: "VND-2024-0126",
      amount: 19800,
      dueDate: "2024-02-28",
      paymentDate: "2024-02-15",
      status: "Paid",
      project: "Residential Complex A",
      method: "ACH",
    },
    {
      id: "8",
      entity: "Express Logistics Co",
      entityType: "Carrier",
      invoice: "CAR-2024-0095",
      amount: 6750,
      dueDate: "2024-03-30",
      paymentDate: null,
      status: "Due Soon",
      project: "Infrastructure Project C",
      method: "Bank Transfer",
    },
  ];

  const filtered = useMemo(() => {
    return payments.filter((p) => {
      if (methodFilter !== "All" && p.method !== methodFilter) return false;
      if (statusFilter !== "All" && p.status !== statusFilter) return false;
      if (
        query &&
        !`${p.entity} ${p.invoice}`.toLowerCase().includes(query.toLowerCase())
      )
        return false;
      return true;
    });
  }, [payments, methodFilter, statusFilter, query]);

  function formatCurrency(n: number) {
    return `$${n.toLocaleString()}`;
  }

  return (
    <div className="min-h-full bg-[#e7ecfb] p-4 lg:p-5">
      <div className="mx-auto max-w-7xl space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Payment Status Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Track vendor and carrier payment history, due dates, and status
            </p>
          </div>

          <Button variant="outline" className="h-9 w-fit bg-white px-3 text-sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <article
              key={card.title}
              className={`rounded-xl border border-l-4 ${card.borderClass} bg-white px-5 py-4`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">{card.title}</p>
                  <p className="mt-2 text-2xl font-semibold leading-none text-slate-900">
                    {card.amount}
                  </p>
                  <p className={`mt-2 text-xs font-medium ${card.accentClass}`}>
                    {card.subtitle}
                  </p>
                </div>
                <span
                  className={cn(
                    "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    card.accentClass,
                    card.iconBgColor,
                  )}
                >
                  {card.icon}
                </span>
              </div>
            </article>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <CardTitle>Overdue Payments</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {overduePayments.map((item) => (
                <article
                  key={item.ref}
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <h3 className=" font-semibold text-slate-900">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-base font-semibold text-red-600">
                      {item.amount}
                    </p>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm text-slate-500">{item.ref}</p>
                    <p className="text-xs font-medium text-red-600">
                      {item.due}
                    </p>
                  </div>
                </article>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock3 className="h-5 w-5 text-amber-500" />
                <CardTitle>Due Soon (Next 30 Days)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {dueSoonPayments.map((item) => (
                <article
                  key={item.ref}
                  className="rounded-lg border border-amber-200 bg-amber-50/70 px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <h3 className="font-semibold text-slate-900">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-base font-semibold text-amber-700">
                      {item.amount}
                    </p>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm text-slate-500">{item.ref}</p>
                    <p className="text-xs font-medium text-amber-600">
                      {item.due}
                    </p>
                  </div>
                </article>
              ))}
            </CardContent>
          </Card>
        </div>
        {/* Filters + Table */}
        <div>
          <Card>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
                <div className="flex-1 flex items-center gap-3">
                  <Input
                    placeholder="Search by entity name or invoice number..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full max-w-lg bg-white"
                  />

                  <Select value={methodFilter} onValueChange={setMethodFilter}>
                    <SelectTrigger className="w-44 mt-0">
                      <SelectValue placeholder="Payment Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Methods</SelectItem>
                      <SelectItem value="Bank Transfer">
                        Bank Transfer
                      </SelectItem>
                      <SelectItem value="ACH">ACH</SelectItem>
                      <SelectItem value="Check">Check</SelectItem>
                      <SelectItem value="Card">Card</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-36 mt-0">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Status</SelectItem>
                      <SelectItem value="Due Soon">Due Soon</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" className="h-9">
                    <Download className="mr-2 h-4 w-4" /> Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4 pb-0 gap-0">
            <CardHeader className="border-b">
              <CardTitle className="text-lg font-medium">
                Payment History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table className="bg-white">
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="text-left px-6 py-3 text-sm text-gray-600">
                        Entity
                      </TableHead>
                      <TableHead className="text-left px-6 py-3 text-sm text-gray-600">
                        Invoice #
                      </TableHead>
                      <TableHead className="text-left px-6 py-3 text-sm text-gray-600">
                        Amount
                      </TableHead>
                      <TableHead className="text-left px-6 py-3 text-sm text-gray-600">
                        Due Date
                      </TableHead>
                      <TableHead className="text-left px-6 py-3 text-sm text-gray-600">
                        Payment Date
                      </TableHead>
                      <TableHead className="text-left px-6 py-3 text-sm text-gray-600">
                        Status
                      </TableHead>
                      <TableHead className="text-left px-6 py-3 text-sm text-gray-600">
                        Project
                      </TableHead>
                      <TableHead className="text-left px-6 py-3 text-sm text-gray-600">
                        Method
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex flex-col">
                              <span className="font-medium text-slate-900">
                                {row.entity}
                              </span>
                              <span className="text-xs text-slate-500">
                                {row.entityType}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-6 py-4 text-orange-500 font-medium">
                          {row.invoice}
                        </TableCell>
                        <TableCell className="px-6 py-4 font-semibold">
                          {formatCurrency(row.amount)}
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          {row.dueDate ?? "-"}
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          {row.paymentDate ?? "-"}
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          {row.status === "Paid" ? (
                            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-200 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                              Paid
                            </span>
                          ) : row.status === "Scheduled" ? (
                            <span className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                              Scheduled
                            </span>
                          ) : row.status === "Overdue" ? (
                            <span className="inline-flex items-center gap-1 rounded-md bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                              Overdue
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                              Due Soon
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          {row.project}
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          {row.method}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
