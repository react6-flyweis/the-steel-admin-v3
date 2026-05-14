import { useState, type ComponentType } from "react";
import {
  BadgeCheck,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Filter,
  MapPin,
  Percent,
  PiggyBank,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import projectImage from "@/assets/images/customers/photos-3.webp";
import TitleSubtitle from "@/components/TitleSubtitle";
import { BudgetActualOverviewCard } from "@/components/finance/budget-actual-overview-card";
import { ProjectBudgetSummaryCard } from "@/components/finance/project-budget-summary-card";

const topMetrics = [
  {
    title: "Budget USD",
    value: "$4,900.00",
    delta: "+12.5%",
    icon: PiggyBank,
    tone: "blue" as const,
  },
  {
    title: "Actual USD",
    value: "$4,900.00",
    delta: "+12.5%",
    icon: CircleDollarSign,
    tone: "emerald" as const,
  },
  {
    title: "Variance USD",
    value: "$4,900.00",
    delta: "+12.5%",
    icon: Wallet,
    tone: "rose" as const,
  },
  {
    title: "% of Budget USD",
    value: "$4,900.00",
    delta: "+12.5%",
    icon: Percent,
    tone: "violet" as const,
  },
] as const;

const budgetRows = [
  {
    head: "Material Cost",
    status: "Over Budget" as const,
    tone: "over" as const,
  },
  {
    head: "Carrier/Freight cost",
    status: "Under Budget" as const,
    tone: "under" as const,
  },
  {
    head: "Manpower/Labor cost",
    status: "Over Budget" as const,
    tone: "over" as const,
  },
  {
    head: "Equipment Cost",
    status: "Under Budget" as const,
    tone: "under" as const,
  },
  {
    head: "Subcontractor cost",
    status: "Under Budget" as const,
    tone: "under" as const,
  },
  {
    head: "Miscellaneous Cost",
    status: "Under Budget" as const,
    tone: "under" as const,
  },
  {
    head: "Contingency",
    status: "Under Budget" as const,
    tone: "under" as const,
  },
  {
    head: "Project Overhead",
    status: "Under Budget" as const,
    tone: "under" as const,
  },
] as const;

function FilterSelect({
  label,
  value,
  onValueChange,
  options,
  icon: Icon,
  className,
}: {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: readonly string[];
  icon: ComponentType<{ className?: string }>;
  className?: string;
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={`h-10 w-full justify-between gap-3 rounded-md border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50 sm:w-56.25 ${
          className ?? ""
        }`}
      >
        <span className="flex items-center gap-2 overflow-hidden">
          <Icon className="h-4 w-4 text-slate-500" />
          <SelectValue placeholder={label} />
        </span>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function MetricCard({
  title,
  value,
  delta,
  icon: Icon,
  tone,
}: (typeof topMetrics)[number]) {
  const toneClasses = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    rose: "bg-rose-50 text-rose-600",
    violet: "bg-violet-50 text-violet-600",
  } as const;

  return (
    <Card className="rounded-2xl border-slate-200 p-0 shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
      <CardContent className="p-0">
        <div className="flex h-full items-start gap-3 px-4 py-3">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${toneClasses[tone]}`}
          >
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[12px] text-slate-500">{title}</p>
            <p className="mt-0.5 text-[18px] font-semibold leading-none text-slate-900">
              {value}
            </p>
            <p className="mt-1 text-[12px] font-medium text-emerald-500">
              {delta}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusPill({
  tone,
  children,
}: {
  tone: "over" | "under";
  children: string;
}) {
  const classes =
    tone === "over"
      ? "border-rose-200 bg-rose-50 text-rose-500"
      : "border-emerald-200 bg-emerald-50 text-emerald-500";

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-[12px] font-medium ${classes}`}
    >
      {children}
    </span>
  );
}

export default function BudgetActual() {
  const [groupBy, setGroupBy] = useState("Group by: Cost Head");
  const [department, setDepartment] = useState("Department: All");
  const [costCategory, setCostCategory] = useState("Cost Category: All");
  const [dateRange, setDateRange] = useState("24 Mar 2025 - 31 Mar 2025");

  return (
    <div className="min-h-full p-5">
      <div className="mx-auto flex max-w-350 flex-col gap-4">
        <TitleSubtitle
          title="Budget v/s Actual"
          subtitle="Plan shipments by uploading shipper data, optimizing bundles, and building truckloads."
        />

        <Card className="rounded-[18px] border-slate-200 bg-white/95 p-0 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
          <CardContent className="p-0">
            <div className="grid gap-6 p-4 lg:grid-cols-2 xl:p-5">
              <div className="rounded-3xl bg-white p-0">
                <div className="flex items-start gap-4">
                  <img
                    src={projectImage}
                    alt="Riverside Office Complex"
                    className="h-14 w-14 rounded-full object-cover ring-4 ring-slate-100"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-[12px] font-medium text-[#6d5cff]">
                        CI-12345
                      </span>
                      <span className="inline-flex items-center gap-1 text-[18px] font-semibold leading-none text-slate-900">
                        Riverside Office Complex
                        <BadgeCheck className="h-4 w-4 text-emerald-500" />
                      </span>
                    </div>

                    <div className="mt-1 flex items-center gap-1 text-[12px] text-slate-500">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>4712 Cherry Ridge Drive Rochester, NY 14620.</span>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <p className="text-[12px] text-slate-500">
                          Project Code
                        </p>
                        <p className="mt-1 text-[13px] font-semibold text-slate-900">
                          PRJ-2025-015
                        </p>
                      </div>
                      <div>
                        <p className="text-[12px] text-slate-500">Start Date</p>
                        <p className="mt-1 text-[13px] font-semibold text-slate-900">
                          Feb 10, 2025
                        </p>
                      </div>
                      <div>
                        <p className="text-[12px] text-slate-500">
                          Project Manager
                        </p>
                        <p className="mt-1 text-[13px] font-semibold text-slate-900">
                          John Smith
                        </p>
                      </div>
                      <div>
                        <p className="text-[12px] text-slate-500">
                          Target End Date
                        </p>
                        <p className="mt-1 text-[13px] font-semibold text-slate-900">
                          Feb 10, 2025
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[13px] font-medium text-slate-700">
                    Project
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 flex-1 justify-between gap-3 rounded-md border-slate-200 bg-white px-3 text-[13px] font-medium text-slate-600 shadow-sm hover:bg-slate-50"
                  >
                    <span className="truncate">
                      Riverside Office Complex (PRJ-2025-015)
                    </span>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </Button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {topMetrics.map((metric) => (
                    <MetricCard key={metric.title} {...metric} />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap items-center gap-3">
          <FilterSelect
            label="Group by"
            value={groupBy}
            onValueChange={setGroupBy}
            options={[
              "Group by: Cost Head",
              "Group by: Department",
              "Group by: Project",
              "Group by: Vendor",
            ]}
            icon={Filter}
          />
          <FilterSelect
            label="Department"
            value={department}
            onValueChange={setDepartment}
            options={[
              "Department: All",
              "Department: Procurement",
              "Department: Operations",
              "Department: Finance",
            ]}
            icon={Filter}
          />
          <FilterSelect
            label="Cost Category"
            value={costCategory}
            onValueChange={setCostCategory}
            options={[
              "Cost Category: All",
              "Cost Category: Direct",
              "Cost Category: Indirect",
              "Cost Category: Contingency",
            ]}
            icon={Filter}
          />
          <FilterSelect
            label="Date Range"
            value={dateRange}
            onValueChange={setDateRange}
            options={[
              "24 Mar 2025 - 31 Mar 2025",
              "01 Apr 2025 - 30 Apr 2025",
              "01 May 2025 - 31 May 2025",
            ]}
            icon={CalendarDays}
            className="sm:w-63.75"
          />
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
          <Card className="rounded-3xl border-slate-200 p-0 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
            <CardHeader className="border-b border-slate-200 px-4 py-3">
              <CardTitle className="text-[15px] font-semibold text-slate-900">
                Budget VS Actual by Cost Head
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <Table className="min-w-225">
                <TableHeader>
                  <TableRow className="border-slate-200 bg-slate-100/90 hover:bg-slate-100">
                    <TableHead className="h-11 px-4 text-[12px] font-semibold text-slate-600">
                      Cost Head
                    </TableHead>
                    <TableHead className="h-11 px-4 text-[12px] font-semibold text-slate-600">
                      Budget (USD)
                    </TableHead>
                    <TableHead className="h-11 px-4 text-[12px] font-semibold text-slate-600">
                      Actual (USD)
                    </TableHead>
                    <TableHead className="h-11 px-4 text-[12px] font-semibold text-slate-600">
                      Variance
                    </TableHead>
                    <TableHead className="h-11 px-4 text-[12px] font-semibold text-slate-600">
                      Variance
                    </TableHead>
                    <TableHead className="h-11 px-4 text-[12px] font-semibold text-slate-600">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {budgetRows.map((row) => (
                    <TableRow
                      key={row.head}
                      className="border-slate-200 hover:bg-transparent"
                    >
                      <TableCell className="px-4 py-4 text-[12px] font-medium text-slate-700">
                        {row.head}
                      </TableCell>
                      <TableCell className="px-4 py-4 text-[12px] text-slate-500">
                        $1,245,360.00
                      </TableCell>
                      <TableCell className="px-4 py-4 text-[12px] text-slate-500">
                        $1,050,180.00
                      </TableCell>
                      <TableCell
                        className={`px-4 py-4 text-[12px] font-medium ${row.tone === "over" ? "text-rose-500" : "text-emerald-500"}`}
                      >
                        18.66%
                      </TableCell>
                      <TableCell
                        className={`px-4 py-4 text-[12px] font-medium ${row.tone === "over" ? "text-rose-500" : "text-emerald-500"}`}
                      >
                        18.66%
                      </TableCell>
                      <TableCell className="px-4 py-4">
                        <StatusPill tone={row.tone}>{row.status}</StatusPill>
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow className="border-slate-200 bg-[#fdf1e9] hover:bg-[#fdf1e9]">
                    <TableCell className="px-4 py-4 text-[12px] font-semibold text-slate-700">
                      Total
                    </TableCell>
                    <TableCell className="px-4 py-4 text-[12px] text-slate-500">
                      $1,245,360.00
                    </TableCell>
                    <TableCell className="px-4 py-4 text-[12px] text-slate-500">
                      $1,050,180.00
                    </TableCell>
                    <TableCell className="px-4 py-4 text-[12px] font-medium text-rose-500">
                      18.66%
                    </TableCell>
                    <TableCell className="px-4 py-4 text-[12px] font-medium text-rose-500">
                      18.66%
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <StatusPill tone="over">Over Budget</StatusPill>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <BudgetActualOverviewCard />
            <ProjectBudgetSummaryCard />
          </div>
        </div>
      </div>
    </div>
  );
}
