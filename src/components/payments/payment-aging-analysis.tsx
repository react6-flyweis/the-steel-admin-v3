import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const data = [
  { range: "0-30 days", amount: 90000, percentage: 45, color: "bg-green-500" },
  {
    range: "31-60 days",
    amount: 60000,
    percentage: 30,
    color: "bg-yellow-500",
  },
  {
    range: "61-90 days",
    amount: 25000,
    percentage: 15,
    color: "bg-orange-500",
  },
  { range: "90+ days", amount: 25000, percentage: 10, color: "bg-red-500" },
];

export default function PaymentAgingAnalysis({
  className,
}: {
  className?: string;
}) {
  return (
    <Card className={cn("w-full p-4 bg-[#FAFBFF] rounded-sm", className)}>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Expected Payments
      </h2>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.range}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                {item.range}
              </span>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-900">
                  ${item.amount.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 w-10 text-right">
                  {item.percentage}%
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all", item.color)}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
