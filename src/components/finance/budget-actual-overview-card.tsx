import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BudgetActualOverviewCard() {
  return (
    <Card className="rounded-3xl border-slate-200 p-0 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <CardHeader className="border-b border-slate-200 px-4 py-3">
        <CardTitle className="text-[15px] font-semibold text-slate-900">
          Budget VS Actual Overview
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 py-5">
        <div className="flex items-center gap-5">
          <div className="relative mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-[conic-gradient(#f97316_0_38%,#0f4c5c_38%_100%)]">
            <div className="h-20 w-20 rounded-full bg-white" />
          </div>

          <div className="space-y-4 text-[12px] text-slate-700">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#f97316]" />
              <div>
                <div className="font-semibold text-slate-900">Actual (USD)</div>
                <div className="text-slate-500">$98785 (58%)</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#0f4c5c]" />
              <div>
                <div className="font-semibold text-slate-900">
                  Remaining (USD)
                </div>
                <div className="text-slate-500">$98785 (58%)</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}