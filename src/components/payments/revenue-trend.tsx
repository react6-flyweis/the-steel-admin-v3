import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jul", received: 190000, projected: 240000 },
  { month: "Aug", received: 230000, projected: 180000 },
  { month: "Sep", received: 190000, projected: 220000 },
  { month: "Oct", received: 240000, projected: 260000 },
  { month: "Nov", received: 180000, projected: 240000 },
  { month: "Dec", received: 250000, projected: 220000 },
];

export default function RevenueTrend({ className }: { className?: string }) {
  return (
    <Card className={cn("w-full py-4 rounded-sm bg-[#FAFBFF]", className)}>
      <CardHeader className="flex px-4 justify-between items-center">
        <CardTitle className="text-lg font-semibold">Revenue trend</CardTitle>
        {/* legend */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="size-2 bg-blue-500 rounded-full mr-1"></div>
            <span className="text-xs text-gray-600">Received</span>
          </div>
          <div className="flex items-center">
            <div className="size-2 bg-purple-500 rounded-full mr-1"></div>
            <span className="text-xs text-gray-600">Projected</span>
          </div>
        </div>
      </CardHeader>

      <ResponsiveContainer width="100%" height={240} className="mt-auto">
        <BarChart data={data} barGap={8}>
          {/* <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /> */}
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />
          {/* <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            tickFormatter={(value) => `$${value / 1000}k`}
            // hide
          /> */}
          <Tooltip
            formatter={(value: number) => `$${value.toLocaleString()}`}
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
            labelStyle={{ color: "#fff" }}
          />
          {/* <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="circle"
            iconSize={10}
          /> */}
          <Bar
            dataKey="received"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
            name="Received"
            barSize={18}
          />
          <Bar
            dataKey="projected"
            fill="#8b5cf6"
            radius={[4, 4, 0, 0]}
            name="Projected"
            barSize={18}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
