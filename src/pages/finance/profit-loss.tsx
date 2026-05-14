import { useState } from "react";
import {
  BadgeDollarSign,
  CalendarRange,
  Download,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Button } from "@/components/ui/button";
import StatCardV2 from "@/components/ui/stat-card-v2";
import TitleSubtitle from "@/components/TitleSubtitle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SummaryRow = {
  label: string;
  thisPeriod: string;
  lastPeriod: string;
  varianceAmount: string;
  variancePercent: string;
  tone?: "income" | "expense" | "total";
};

const trendChartData = [
  { name: "Mon", income: 240, expenses: 220 },
  { name: "Tue", income: 280, expenses: 250 },
  { name: "Wed", income: 260, expenses: 240 },
  { name: "Thu", income: 300, expenses: 280 },
  { name: "Fri", income: 310, expenses: 290 },
  { name: "Sat", income: 330, expenses: 310 },
  { name: "Sun", income: 350, expenses: 330 },
];

const expenseBreakdownData = [
  { name: "Direct Costs", value: 62000, color: "#3b82f6", percentage: 36.61 },
  { name: "Indirect Costs", value: 16000, color: "#10b981", percentage: 23.91 },
  {
    name: "Administrative Expenses",
    value: 7000,
    color: "#8b5cf6",
    percentage: 18.83,
  },
  { name: "Other Expenses", value: 8000, color: "#f97316", percentage: 12.53 },
];

const projectWisePLData = [
  {
    id: "PRJ-001",
    name: "Downtown Office Complex",
    revenue: "$5,200,000",
    expenses: "$3,550,000",
    netProfit: "$1,650,000",
    margin: "31.73%",
    status: "Profitable",
  },
  {
    id: "PRJ-002",
    name: "Residential Tower A",
    revenue: "$2,800,000",
    expenses: "$2,100,000",
    netProfit: "$700,000",
    margin: "25.00%",
    status: "Profitable",
  },
  {
    id: "PRJ-003",
    name: "Industrial Shed",
    revenue: "$1,900,000",
    expenses: "$1,600,000",
    netProfit: "$300,000",
    margin: "15.79%",
    status: "Profitable",
  },
  {
    id: "PRJ-004",
    name: "Bridge Construction",
    revenue: "$5,200,000",
    expenses: "$1,700,000",
    netProfit: "$900,000",
    margin: "36.62%",
    status: "Profitable",
  },
];

const statCards = [
  {
    title: "Total Revenue",
    value: "$12,500,000",
    subtitle: "vs Apr 2025",
    icon: <BadgeDollarSign className="h-4 w-4" />,
    color: "purple" as const,
  },
  {
    title: "Total Expenses",
    value: "$8,950,000",
    subtitle: "vs Apr 2025",
    icon: <Wallet className="h-4 w-4" />,
    color: "green" as const,
  },
  {
    title: "Gross Profit",
    value: "$3,550,000",
    subtitle: "vs Apr 2025",
    icon: <TrendingUp className="h-4 w-4" />,
    color: "yellow" as const,
  },
  {
    title: "Net Profit",
    value: "$2,750,000",
    subtitle: "vs Apr 2025",
    icon: <TrendingDown className="h-4 w-4" />,
    color: "red" as const,
  },
  {
    title: "Net Profit Margin",
    value: "22.0%",
    subtitle: "vs Apr 2025",
    icon: <BadgeDollarSign className="h-4 w-4" />,
    color: "purple" as const,
  },
];

const summaryRows: SummaryRow[] = [
  {
    label: "Project Revenue",
    thisPeriod: "$12,200,000",
    lastPeriod: "$10,850,000",
    varianceAmount: "$1,350,000",
    variancePercent: "12.44%",
    tone: "income",
  },
  {
    label: "Other Income",
    thisPeriod: "$300,000",
    lastPeriod: "$150,000",
    varianceAmount: "$150,000",
    variancePercent: "100.00%",
    tone: "income",
  },
  {
    label: "Total Income (A)",
    thisPeriod: "$12,500,000",
    lastPeriod: "$11,000,000",
    varianceAmount: "$1,500,000",
    variancePercent: "13.64%",
    tone: "total",
  },
  {
    label: "Direct Costs",
    thisPeriod: "$12,500,000",
    lastPeriod: "$11,000,000",
    varianceAmount: "$11,000,000",
    variancePercent: "12.44%",
    tone: "expense",
  },
  {
    label: "Indirect Costs",
    thisPeriod: "$12,500,000",
    lastPeriod: "$11,000,000",
    varianceAmount: "$11,000,000",
    variancePercent: "100.00%",
    tone: "expense",
  },
  {
    label: "Administrative Expenses",
    thisPeriod: "$12,500,000",
    lastPeriod: "$11,000,000",
    varianceAmount: "$11,000,000",
    variancePercent: "13.64%",
    tone: "expense",
  },
  {
    label: "Other Expenses",
    thisPeriod: "$12,500,000",
    lastPeriod: "$11,000,000",
    varianceAmount: "$11,000,000",
    variancePercent: "13.64%",
    tone: "expense",
  },
  {
    label: "Total Expenses (B)",
    thisPeriod: "$8,950,000",
    lastPeriod: "$8,050,000",
    varianceAmount: "$9,00,000",
    variancePercent: "11.08%",
    tone: "total",
  },
  {
    label: "Operating Profit (A-B)",
    thisPeriod: "$3,550,000",
    lastPeriod: "$2,950,000",
    varianceAmount: "$11,000,000",
    variancePercent: "20.34%",
    tone: "income",
  },
  {
    label: "Tax Expense",
    thisPeriod: "$800,000",
    lastPeriod: "$650,000",
    varianceAmount: "$150,000",
    variancePercent: "23.08%",
    tone: "expense",
  },
  {
    label: "Net Profit",
    thisPeriod: "$2,750,000",
    lastPeriod: "$2,300,000",
    varianceAmount: "$450,000",
    variancePercent: "19.58%",
    tone: "total",
  },
];

export default function ProfitLossPage() {
  const [project, setProject] = useState("all-projects");

  return (
    <div className="min-h-full bg-[#e8efff] px-4 py-4 sm:px-5 lg:px-6">
      <div className="mx-auto flex w-full max-w-400 flex-col gap-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <TitleSubtitle
            title="Profit & Loss Statement"
            subtitle="Overview of income, expenses and profitability for your projects."
          />

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              className="h-9 rounded-lg border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <CalendarRange className="mr-2 h-4 w-4" />
              May 1 - May 31, 2025
            </Button>

            <Select value={project} onValueChange={setProject}>
              <SelectTrigger className="h-9 w-40 rounded-lg border-slate-200 bg-white text-sm text-slate-700 shadow-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-projects">All Projects</SelectItem>
                <SelectItem value="project-1">Project 1</SelectItem>
                <SelectItem value="project-2">Project 2</SelectItem>
                <SelectItem value="project-3">Project 3</SelectItem>
              </SelectContent>
            </Select>

            <Button className="h-9 rounded-lg bg-[#1976d2] px-4 text-sm font-medium text-white shadow-sm hover:bg-[#1667b8]">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
          {statCards.map((card) => (
            <StatCardV2 key={card.title} {...card} />
          ))}
        </div>

        <div className="rounded-2xl border border-white/80 bg-white shadow-[0_10px_30px_rgba(148,163,184,0.12)]">
          <div className="border-b border-slate-200 px-4 py-4 sm:px-5">
            <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-slate-900">
              Profit &amp; Loss Summary
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-245 w-full border-collapse">
              <thead>
                <tr className="bg-slate-200 text-[12px] font-semibold text-slate-700">
                  <th className="px-4 py-3 text-left">Particulars</th>
                  <th className="px-4 py-3 text-left">
                    This Period
                    <br />
                    <span className="font-normal text-slate-600">
                      (01 May - 31 May 2025)
                    </span>
                  </th>
                  <th className="px-4 py-3 text-left">
                    Last Period
                    <br />
                    <span className="font-normal text-slate-600">
                      (01 Apr-31 Apr 2025)
                    </span>
                  </th>
                  <th className="px-4 py-3 text-left">Variance</th>
                  <th className="px-4 py-3 text-left">%</th>
                </tr>
              </thead>

              <tbody>
                <tr className="bg-white">
                  <td className="px-4 py-2 text-sm font-semibold text-emerald-500">
                    Income
                  </td>
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>

                {summaryRows.slice(0, 3).map((row) => (
                  <tr
                    key={row.label}
                    className={
                      row.tone === "total" ? "bg-emerald-50" : "bg-white"
                    }
                  >
                    <td
                      className={`px-4 py-2 text-sm ${
                        row.tone === "total"
                          ? "font-semibold text-slate-900"
                          : "text-slate-600"
                      }`}
                    >
                      {row.label}
                    </td>
                    <td className="px-4 py-2 text-sm text-slate-600">
                      {row.thisPeriod}
                    </td>
                    <td className="px-4 py-2 text-sm text-slate-600">
                      {row.lastPeriod}
                    </td>
                    <td className="px-4 py-2 text-sm text-slate-600">
                      {row.varianceAmount}
                    </td>
                    <td className="px-4 py-2 text-sm font-semibold text-emerald-500">
                      {row.variancePercent}
                    </td>
                  </tr>
                ))}

                <tr className="bg-white">
                  <td className="px-4 py-2 text-sm font-semibold text-rose-500">
                    Expenses
                  </td>
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>

                {summaryRows.slice(3, 7).map((row) => (
                  <tr key={row.label} className="bg-white">
                    <td className="px-4 py-2 text-sm text-slate-600">
                      {row.label}
                    </td>
                    <td className="px-4 py-2 text-sm text-slate-600">
                      {row.thisPeriod}
                    </td>
                    <td className="px-4 py-2 text-sm text-slate-600">
                      {row.lastPeriod}
                    </td>
                    <td className="px-4 py-2 text-sm text-slate-600">
                      {row.varianceAmount}
                    </td>
                    <td className="px-4 py-2 text-sm font-semibold text-rose-500">
                      {row.variancePercent}
                    </td>
                  </tr>
                ))}

                {summaryRows.slice(7, 9).map((row) => (
                  <tr key={row.label} className="bg-rose-50/70">
                    <td className="px-4 py-2 text-sm font-semibold text-slate-900">
                      {row.label}
                    </td>
                    <td className="px-4 py-2 text-sm font-semibold text-slate-900">
                      {row.thisPeriod}
                    </td>
                    <td className="px-4 py-2 text-sm font-semibold text-slate-900">
                      {row.lastPeriod}
                    </td>
                    <td className="px-4 py-2 text-sm font-semibold text-slate-900">
                      {row.varianceAmount}
                    </td>
                    <td className="px-4 py-2 text-sm font-semibold text-rose-500">
                      {row.variancePercent}
                    </td>
                  </tr>
                ))}

                <tr className="bg-white">
                  <td className="px-4 py-2 text-sm font-semibold text-slate-700">
                    Tax Expense
                  </td>
                  <td className="px-4 py-2 text-sm text-slate-600">$800,000</td>
                  <td className="px-4 py-2 text-sm text-slate-600">$650,000</td>
                  <td className="px-4 py-2 text-sm text-slate-600">$150,000</td>
                  <td className="px-4 py-2 text-sm font-semibold text-rose-500">
                    23.08%
                  </td>
                </tr>

                <tr className="bg-blue-50/80">
                  <td className="px-4 py-2 text-sm font-semibold text-blue-700">
                    Net Profit
                  </td>
                  <td className="px-4 py-2 text-sm font-semibold text-slate-900">
                    $2,750,000
                  </td>
                  <td className="px-4 py-2 text-sm font-semibold text-slate-900">
                    $2,300,000
                  </td>
                  <td className="px-4 py-2 text-sm font-semibold text-slate-900">
                    $450,000
                  </td>
                  <td className="px-4 py-2 text-sm font-semibold text-emerald-500">
                    19.58%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 text-xs text-slate-500 sm:px-5">
            All Amount are in USD
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="rounded-2xl border border-white/80 bg-white shadow-[0_10px_30px_rgba(148,163,184,0.12)]">
            <div className="border-b border-slate-200 px-4 py-4 sm:px-5">
              <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-slate-900">
                Income vs Expense Trend
              </h2>
            </div>
            <div className="p-5">
              <div className="flex gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500">Income</p>
                  <p className="text-lg font-semibold text-blue-600">240</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Expenses</p>
                  <p className="text-lg font-semibold text-orange-500">250k</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={trendChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#f97316"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-white/80 bg-white shadow-[0_10px_30px_rgba(148,163,184,0.12)]">
            <div className="border-b border-slate-200 px-4 py-4 sm:px-5">
              <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-slate-900">
                Expense Breakdown
              </h2>
            </div>
            <div className="p-5 flex flex-col items-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={expenseBreakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {expenseBreakdownData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `$${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center">
                <p className="text-sm font-medium text-slate-600">
                  Total Expenses
                </p>
                <p className="text-xl font-bold text-slate-900">$8,50,500</p>
              </div>
            </div>
            <div className="border-t border-slate-200 px-4 py-3 sm:px-5">
              <div className="grid grid-cols-2 gap-2 text-xs">
                {expenseBreakdownData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-600">{item.name}</span>
                    <span className="ml-auto font-semibold text-slate-900">
                      ${(item.value / 1000).toFixed(0)}k
                    </span>
                    <span className="text-slate-400">({item.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/80 bg-white shadow-[0_10px_30px_rgba(148,163,184,0.12)]">
          <div className="border-b border-slate-200 px-4 py-4 sm:px-5 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-slate-900">
              Project-wise Profit &amp; Loss
            </h2>
            <select className="text-xs px-2 py-1 rounded border border-slate-200 bg-white text-slate-700">
              <option>All Projects</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-245 w-full border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[12px] font-semibold text-slate-700 border-b border-slate-200">
                  <th className="px-4 py-3 text-left">Project ID</th>
                  <th className="px-4 py-3 text-left">Project Name</th>
                  <th className="px-4 py-3 text-left">Revenue</th>
                  <th className="px-4 py-3 text-left">Total Expenses</th>
                  <th className="px-4 py-3 text-left">Net Profit</th>
                  <th className="px-4 py-3 text-left">Net Profit Margin</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {projectWisePLData.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-slate-200 bg-white hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">
                      {row.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {row.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {row.revenue}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {row.expenses}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-emerald-600">
                      {row.netProfit}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">
                      {row.margin}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
