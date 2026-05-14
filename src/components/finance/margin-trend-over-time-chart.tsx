import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import MarginChartLegend from "@/components/finance/margin-chart-legend";

export interface MarginTrendDataPoint {
  month: string;
  gross: number;
  operating: number;
  net: number;
  contribution: number;
}

interface MarginTrendOverTimeChartProps {
  data: MarginTrendDataPoint[];
}

export default function MarginTrendOverTimeChart({
  data,
}: MarginTrendOverTimeChartProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[26px] font-semibold text-slate-900 md:text-2xl">
          Margin Trend Over Time
        </h3>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-slate-200 bg-white text-xs"
        >
          <CalendarIcon className="mr-1 h-3.5 w-3.5" />
          Monthly
        </Button>
      </div>

      <MarginChartLegend />

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#e2e8f0" vertical={true} />
            <XAxis
              dataKey="month"
              tick={{ fill: "#1e293b", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis hide domain={[0, 40]} tickLine={false} axisLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="gross"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="operating"
              stroke="#10b981"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="net"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="contribution"
              stroke="#d4a917"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
