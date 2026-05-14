import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

const profitabilityData = [
  {
    name: "Cost of goods sold",
    value: 58,
    amount: "$98,765",
    color: "#0f5f75",
  },
  {
    name: "Operating Expenses",
    value: 18,
    amount: "$98,765",
    color: "#f97316",
  },
  {
    name: "Other Income",
    value: 14,
    amount: "$98,765",
    color: "#facc15",
  },
  {
    name: "Net Profit",
    value: 10,
    amount: "$98,765",
    color: "#22c55e",
  },
];

export function ProfitabilityChart() {
  return (
    <Card className="rounded">
      <CardHeader className="border-b px-4 items-center">
        <CardTitle className="text-sm">Profitability (Net Profit)</CardTitle>
        <CardAction>
          <Button variant="outline" size="sm">
            <CalendarIcon className="size-3" />
            This Month
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={profitabilityData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={82}
                paddingAngle={3}
              >
                {profitabilityData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-2 text-xs">
          {profitabilityData.map((item) => (
            <div key={item.name} className="space-y-0.5">
              <p className="inline-flex items-center gap-1 text-slate-700">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                {item.name}
              </p>
              <p className="text-slate-500">
                {item.amount} ({item.value}%)
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
