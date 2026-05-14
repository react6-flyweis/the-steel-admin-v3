"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import TitleSubtitle from "@/components/TitleSubtitle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DateRangeFilter from "@/components/ui/date-range-filter";
import { Download, CircleDollarSign } from "lucide-react";
import { RevenueTrendChart } from "@/components/finance/revenue-trend-chart";
import { IncomeVsExpenseChart } from "@/components/finance/income-vs-expense-chart";
import { ProfitabilityChart } from "@/components/finance/profitability-chart";
import { ProfitLossSummaryCard } from "@/components/finance/profit-loss-summary-card";
import { TopCustomersRevenueCard } from "@/components/finance/top-customers-revenue-card";
import type { DateRange } from "react-day-picker";

const statCards = [
  { title: "Total Revenue", value: "$48,950.00", growth: "+12.5%" },
  { title: "Gross Profit", value: "$28,320.00", growth: "+12.5%" },
  { title: "Gross Margin", value: "34%", growth: "+12.5%" },
  { title: "Net Profit", value: "$6,230.00", growth: "+12.5%" },
  { title: "Operating Cash Flow", value: "$4,900.00", growth: "+12.5%" },
];

const profitLossRows = [
  {
    label: "Total Revenue",
    thisMonth: "$1,245,360,00",
    lastMonth: "$1,050,180.00",
    change: "18.66%",
    ytd: "$5,842,190.00",
  },
  {
    label: "Cost of Goods Sold",
    thisMonth: "$1,245,360,00",
    lastMonth: "$1,050,180.00",
    change: "18.66%",
    ytd: "$5,842,190.00",
    negative: true,
  },
  {
    label: "Gross Profit",
    thisMonth: "$1,245,360,00",
    lastMonth: "$1,050,180.00",
    change: "18.66%",
    ytd: "$5,842,190.00",
  },
  {
    label: "Operating Expenses",
    thisMonth: "$1,245,360,00",
    lastMonth: "$1,050,180.00",
    change: "18.66%",
    ytd: "$5,842,190.00",
  },
  {
    label: "Operating Profit",
    thisMonth: "$1,245,360,00",
    lastMonth: "$1,050,180.00",
    change: "18.66%",
    ytd: "$5,842,190.00",
  },
  {
    label: "Other Income",
    thisMonth: "$1,245,360,00",
    lastMonth: "$1,050,180.00",
    change: "18.66%",
    ytd: "$5,842,190.00",
  },
  {
    label: "Net Profit Befor Tax",
    thisMonth: "$1,245,360,00",
    lastMonth: "$1,050,180.00",
    change: "18.66%",
    ytd: "$5,842,190.00",
  },
  {
    label: "Income Tax",
    thisMonth: "$1,245,360,00",
    lastMonth: "$1,050,180.00",
    change: "18.66%",
    ytd: "$5,842,190.00",
    negative: true,
  },
  {
    label: "Net Profit",
    thisMonth: "$1,245,360,00",
    lastMonth: "$1,050,180.00",
    change: "18.66%",
    ytd: "$5,842,190.00",
  },
  {
    label: "Net Profit Margin",
    thisMonth: "14%",
    lastMonth: "12%",
    change: "18.66%",
    ytd: "14%",
  },
];

const topCustomers = [
  { customer: "ABC Construction LLC", revenue: "$1,245,360,00" },
  { customer: "Global Builders", revenue: "$1,245,360,00" },
  { customer: "Texas Steel", revenue: "$1,245,360,00" },
  { customer: "Summit Industries", revenue: "$1,245,360,00" },
  { customer: "Metro Structures", revenue: "$1,245,360,00" },
];

function StatCard({
  title,
  value,
  growth,
}: {
  title: string;
  value: string;
  growth: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-slate-500">{title}</p>
      <div className="mt-1 flex items-end gap-2">
        <p className="text-xl font-semibold leading-none text-slate-900">
          {value}
        </p>
      </div>
      <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">
        <CircleDollarSign className="h-3.5 w-3.5" />
        <span>{growth}</span>
      </div>
    </div>
  );
}

export default function FinancialOverviewPage() {
  const [company, setCompany] = useState("all");
  const [project, setProject] = useState("all");
  const [currency, setCurrency] = useState("usd");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  return (
    <div className="space-y-4 p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <TitleSubtitle
          title="Financial Overview"
          subtitle="Monitor your business financial performance and key metrics"
        />

        <Button className="h-9 bg-violet-600 px-4 text-white hover:bg-violet-700">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Select value={company} onValueChange={setCompany}>
          <SelectTrigger className="w-auto bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Companies</SelectItem>
            <SelectItem value="company1">Company 1</SelectItem>
            <SelectItem value="company2">Company 2</SelectItem>
            <SelectItem value="company3">Company 3</SelectItem>
          </SelectContent>
        </Select>

        <Select value={project} onValueChange={setProject}>
          <SelectTrigger className="w-auto bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            <SelectItem value="project1">Project 1</SelectItem>
            <SelectItem value="project2">Project 2</SelectItem>
            <SelectItem value="project3">Project 3</SelectItem>
          </SelectContent>
        </Select>

        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger className="w-auto bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="usd">All Currencies (USD)</SelectItem>
            <SelectItem value="eur">EUR</SelectItem>
            <SelectItem value="gbp">GBP</SelectItem>
            <SelectItem value="jpy">JPY</SelectItem>
          </SelectContent>
        </Select>

        <DateRangeFilter
          value={dateRange}
          onChange={setDateRange}
          className="bg-white"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {statCards.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
        <RevenueTrendChart />
        <IncomeVsExpenseChart />
        <ProfitabilityChart />
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-[2fr_1fr]">
        <ProfitLossSummaryCard rows={profitLossRows} />
        <TopCustomersRevenueCard customers={topCustomers} />
      </div>
    </div>
  );
}
