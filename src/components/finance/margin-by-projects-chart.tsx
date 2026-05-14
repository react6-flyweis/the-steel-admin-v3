import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import MarginChartLegend from "@/components/finance/margin-chart-legend";

export interface MarginByProjectsDataPoint {
  name: string;
  gross: number;
  operating: number;
  net: number;
  contribution: number;
}

interface MarginByProjectsChartProps {
  data: MarginByProjectsDataPoint[];
}

export default function MarginByProjectsChart({
  data,
}: MarginByProjectsChartProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[26px] font-semibold text-slate-900 md:text-2xl">
          Margin by Projects
        </h3>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-slate-200 bg-white text-xs"
        >
          <CalendarIcon className="mr-1 h-3.5 w-3.5" />
          All Projects
        </Button>
      </div>

      <MarginChartLegend />

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={6}>
            <CartesianGrid stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
            />
            <Tooltip />
            <Bar dataKey="gross" fill="#3b82f6" radius={[8, 8, 8, 8]} />
            <Bar dataKey="operating" fill="#10b981" radius={[8, 8, 8, 8]} />
            <Bar dataKey="net" fill="#4f46e5" radius={[8, 8, 8, 8]} />
            <Bar dataKey="contribution" fill="#d4a917" radius={[8, 8, 8, 8]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
