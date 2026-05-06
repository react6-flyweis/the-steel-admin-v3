import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Paid", value: 15, amount: 240000, color: "#22c55e" },
  { name: "Partial", value: 8, amount: 85000, color: "#eab308" },
  { name: "Overdue", value: 5, amount: 130000, color: "#ef4444" },
];

export default function PaymentStatusDistribution({
  className,
}: {
  className?: string;
}) {
  const totalClients = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card
      className={cn("w-full gap-0 py-4 bg-[#FAFBFF] rounded-sm", className)}
    >
      <CardHeader>
        <h2 className="text-lg font-semibold text-gray-900">
          Payment status Distribution
        </h2>
      </CardHeader>

      <CardContent className="flex flex-col items-center">
        {/* Donut Chart */}
        <div className="relative w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-gray-900">
              {totalClients}
            </div>
            <div className="text-sm text-gray-500">Total Clients</div>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-3 gap-8 mt-8 w-full">
          {data.map((item) => (
            <div key={item.name} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div
                  className="w-3 h-3 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium text-gray-700">
                  {item.name}
                </span>
              </div>
              <div className="text-sm text-gray-600">{item.value} clients</div>
              <div className="text-sm font-semibold text-gray-900">
                ${item.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
