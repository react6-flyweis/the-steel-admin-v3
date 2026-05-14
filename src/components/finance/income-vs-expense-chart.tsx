import {
  Bar,
  BarChart,
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
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const incomeVsExpenseData = [
  { month: "Jan", income: 560, expense: 260 },
  { month: "Feb", income: 730, expense: 380 },
  { month: "Mar", income: 980, expense: 620 },
  { month: "Apr", income: 890, expense: 690 },
  { month: "May", income: 1010, expense: 460 },
  { month: "Jun", income: 760, expense: 540 },
  { month: "Jul", income: 1030, expense: 700 },
];

export function IncomeVsExpenseChart() {
  return (
    <Card className="rounded">
      <CardHeader className="border-b">
        <CardTitle className="text-sm">Income VS Expense</CardTitle>
        <CardAction>
          <Button variant="outline" size="sm">
            <Calendar className="size-3" />
            Monthly
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="mb-3 flex items-center gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ede9fe]" /> Income
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#6d28d9]" /> Expense
          </span>
        </div>

        <div className="h-[270px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={incomeVsExpenseData} barGap={4}>
              <CartesianGrid stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis hide />
              <Tooltip />
              <Bar
                dataKey="income"
                fill="#ede9fe"
                radius={[6, 6, 0, 0]}
                maxBarSize={18}
              />
              <Bar
                dataKey="expense"
                fill="#6d28d9"
                radius={[6, 6, 0, 0]}
                maxBarSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
