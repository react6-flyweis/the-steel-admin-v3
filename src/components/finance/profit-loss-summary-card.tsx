import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type ProfitLossRow = {
  label: string;
  thisMonth: string;
  lastMonth: string;
  change: string;
  ytd: string;
  negative?: boolean;
};

type ProfitLossSummaryCardProps = {
  rows: ProfitLossRow[];
};

export function ProfitLossSummaryCard({ rows }: ProfitLossSummaryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profit &amp; Loss Summary</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-max w-full border-collapse">
            <thead>
              <tr className="border-y border-slate-300 bg-slate-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-800">
                  Particulars
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-800">
                  This Month (May2026)
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-800">
                  Last Month (April 2026)
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-800">
                  Change %
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-800">
                  YTD 2026
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-slate-300 bg-white"
                >
                  <td className="px-6 py-4 text-base font-medium text-slate-800">
                    {row.label}
                  </td>
                  <td
                    className={`px-6 py-4 text-base font-normal ${
                      row.negative ? "text-red-500" : "text-slate-500"
                    }`}
                  >
                    {row.thisMonth}
                  </td>
                  <td
                    className={`px-6 py-4 text-base font-normal ${
                      row.negative ? "text-red-500" : "text-slate-500"
                    }`}
                  >
                    {row.lastMonth}
                  </td>
                  <td className="px-6 py-4 text-base font-normal text-emerald-500">
                    {row.change}
                  </td>
                  <td
                    className={`px-6 py-4 text-base font-normal ${
                      row.negative ? "text-red-500" : "text-slate-500"
                    }`}
                  >
                    {row.ytd}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
