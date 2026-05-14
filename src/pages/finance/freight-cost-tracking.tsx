import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { cn } from "@/lib/utils";
import { Truck, DollarSign, Users, CalendarDays } from "lucide-react";
import RecentFreightCosts from "@/components/finance/recent-freight-costs";
import { Info } from "lucide-react";
import TitleSubtitle from "@/components/TitleSubtitle";

const monthlyData = [
  { month: "Jan", cost: 48000, deliveries: 8 },
  { month: "Feb", cost: 56000, deliveries: 10 },
  { month: "Mar", cost: 42000, deliveries: 6 },
  { month: "Apr", cost: 72000, deliveries: 12 },
  { month: "May", cost: 64000, deliveries: 10 },
  { month: "Jun", cost: 52000, deliveries: 9 },
];

const carrierDistribution = [
  { name: "FastFreight", value: 130000 },
  { name: "QuickTransport", value: 95000 },
  { name: "Regional Freight", value: 78000 },
  { name: "Local Delivery", value: 42000 },
];

type MetricCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
};

function MetricCard({ title, value, icon, className }: MetricCardProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-lg shadow-md text-white flex items-center justify-between",
        className,
      )}
    >
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs opacity-90">{title}</div>
      </div>
      <div className="p-3 bg-white/20 rounded-md">{icon}</div>
    </div>
  );
}

export default function FreightCostTracking() {
  const totalCost = 35300;
  const activeCarriers = 4;
  const avgCost = 3245;
  const pendingInvoices = 12;

  return (
    <div className="p-6 space-y-6">
      <TitleSubtitle
        title="Freight Costs Tracking"
        subtitle="Monitor and track freight costs across all projects and deliveries"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Total Freight Cost"
          value={`$${totalCost.toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6 text-white" />}
          className="bg-blue-600"
        />

        <MetricCard
          title="Active Carriers"
          value={activeCarriers}
          icon={<Truck className="h-6 w-6 text-white" />}
          className="bg-green-500"
        />

        <MetricCard
          title="Avg Cost/Delivery"
          value={`$${avgCost.toLocaleString()}`}
          icon={<CalendarDays className="h-6 w-6 text-white" />}
          className="bg-orange-500"
        />

        <MetricCard
          title="Pending Invoices"
          value={pendingInvoices}
          icon={<Users className="h-6 w-6 text-white" />}
          className="bg-yellow-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Monthly Freight Cost Trend
              </h3>
              <p className="text-sm text-slate-400">
                Cost and delivery volume over time
              </p>
            </div>
          </div>

          <div className="mt-4 h-72">
            <ChartContainer
              config={{
                cost: { label: "Freight Cost ($)", color: "#2563EB" },
                deliveries: { label: "Deliveries", color: "#10B981" },
              }}
              className="h-full w-full"
            >
              <LineChart
                data={monthlyData}
                margin={{ left: 12, right: 12, top: 12 }}
              >
                <CartesianGrid
                  strokeDasharray="6 8"
                  stroke="#E2E8F0"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={12}
                  tick={{ fill: "#A0AEC0", fontSize: 13, fontWeight: 600 }}
                />
                <YAxis
                  yAxisId="left"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  tick={{ fill: "#A0AEC0", fontSize: 12, fontWeight: 600 }}
                  width={72}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#A0AEC0", fontSize: 12, fontWeight: 600 }}
                  width={48}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      indicator="line"
                      className="rounded-2xl border border-slate-200 bg-white/95"
                    />
                  }
                  cursor={{ stroke: "#BFDBFE", strokeDasharray: "4 6" }}
                />

                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="cost"
                  stroke="#2563EB"
                  strokeWidth={4}
                  dot={false}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="deliveries"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </Card>

        <Card className="p-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Cost Distribution by Carrier
            </h3>
            <p className="text-sm text-slate-400">
              Breakdown of freight costs by carrier
            </p>
          </div>

          <div className="mt-6 h-72 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={carrierDistribution}
                margin={{ left: 32, right: 12 }}
              >
                <CartesianGrid
                  strokeDasharray="6 8"
                  stroke="#E2E8F0"
                  vertical={false}
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#A0AEC0", fontSize: 12 }}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={140}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#4B5563", fontSize: 13, fontWeight: 600 }}
                />
                <Tooltip />
                <Bar dataKey="value" barSize={18} fill="#2563EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Carrier Cost Analysis Section */}
      <Card className="p-0 overflow-hidden border border-slate-200 shadow-sm gap-0">
        <div className="px-6 pt-6 pb-4 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">
            Carrier Cost Analysis
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Detailed breakdown by carrier partner
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-base font-semibold text-slate-900">
                      FastFreight
                    </h4>
                    <p className="text-xs text-slate-500">YTD Total</p>
                  </div>
                  <div className="rounded-xl bg-blue-100 p-3">
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-5 space-y-5">
                  <div className="flex items-end justify-between gap-4">
                    <p className="text-sm text-slate-500">Total Cost</p>
                    <p className="text-2xl font-semibold text-slate-900">
                      $125,000
                    </p>
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <p className="text-sm text-slate-500">% of Total</p>
                    <p className="text-2xl font-semibold text-blue-600">35%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-base font-semibold text-slate-900">
                      QuickTransport
                    </h4>
                    <p className="text-xs text-slate-500">YTD Total</p>
                  </div>
                  <div className="rounded-xl bg-blue-100 p-3">
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-5 space-y-5">
                  <div className="flex items-end justify-between gap-4">
                    <p className="text-sm text-slate-500">Total Cost</p>
                    <p className="text-2xl font-semibold text-slate-900">
                      $95,000
                    </p>
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <p className="text-sm text-slate-500">% of Total</p>
                    <p className="text-2xl font-semibold text-blue-600">27%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-base font-semibold text-slate-900">
                      Regional Freight
                    </h4>
                    <p className="text-xs text-slate-500">YTD Total</p>
                  </div>
                  <div className="rounded-xl bg-blue-100 p-3">
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-5 space-y-5">
                  <div className="flex items-end justify-between gap-4">
                    <p className="text-sm text-slate-500">Total Cost</p>
                    <p className="text-2xl font-semibold text-slate-900">
                      $78,000
                    </p>
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <p className="text-sm text-slate-500">% of Total</p>
                    <p className="text-2xl font-semibold text-blue-600">22%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-base font-semibold text-slate-900">
                      Local Delivery
                    </h4>
                    <p className="text-xs text-slate-500">YTD Total</p>
                  </div>
                  <div className="rounded-xl bg-blue-100 p-3">
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-5 space-y-5">
                  <div className="flex items-end justify-between gap-4">
                    <p className="text-sm text-slate-500">Total Cost</p>
                    <p className="text-2xl font-semibold text-slate-900">
                      $55,000
                    </p>
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <p className="text-sm text-slate-500">% of Total</p>
                    <p className="text-2xl font-semibold text-blue-600">16%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Freight Costs and About section */}

      <RecentFreightCosts />

      <div>
        <Card className="p-6 bg-blue-50 border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Info className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">
                About Freight Costs
              </h4>
              <p className="text-sm text-gray-600 mt-2">
                This screen provides visibility into freight costs across all
                projects and deliveries. Freight costs are automatically
                captured from awarded freight bids and linked to deliveries. For
                more details on freight operations and delivery management,
                please refer to the appropriate operational modules.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
