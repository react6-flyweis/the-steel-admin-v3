import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

const revenueTrendData = [
  { month: "Jan", revenue: 820 },
  { month: "Feb", revenue: 1340 },
  { month: "Mar", revenue: 1360 },
  { month: "Apr", revenue: 1080 },
  { month: "May", revenue: 1520 },
  { month: "Jun", revenue: 1540 },
  { month: "Jul", revenue: 1880 },
];

export function RevenueTrendChart() {
  return (
    <Card className="rounded">
      <CardHeader className="border-b px-4 flex items-center">
        <CardTitle className="text-sm">Revenue Trend</CardTitle>
        <CardAction>
          <Button variant="outline" size="sm">
            <CalendarIcon className="size-3" />
            Monthly
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-sm text-slate-500">
          <span className="text-2xl font-semibold text-slate-900">98%</span>
          <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">
            +12%
          </span>
          <span className="ml-1">vs last years</span>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueTrendData}>
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#revenueFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-3">
        <p className="text-xs text-slate-500">
          Ratings are as per the feedback from higher authorities
        </p>
      </CardFooter>
    </Card>
  );
}
