const budgetChartData = [
  { month: "Jan", budget: 85000, actual: 72000 },
  { month: "Feb", budget: 90000, actual: 85000 },
  { month: "Mar", budget: 88000, actual: 92000 },
  { month: "Apr", budget: 80000, actual: 65000 },
  { month: "May", budget: 92000, actual: 88000 },
  { month: "Jun", budget: 85000, actual: 78000 },
  { month: "Jul", budget: 95000, actual: 91000 },
];

export function BudgetVsActualChart() {
  const maxValue = Math.max(
    ...budgetChartData.flatMap((item) => [item.budget, item.actual]),
  );

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">Budget VS Actual</h3>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-violet-600"></div>
            <span className="text-slate-600">Budget</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-purple-400"></div>
            <span className="text-slate-600">Actual</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-slate-600">Total Budget</p>
        <p className="text-2xl font-bold text-slate-900">
          $98,545 <span className="text-sm text-emerald-600">+45 ↑</span>
        </p>
      </div>

      {/* Simple Bar Chart */}
      <div className="flex items-end justify-between gap-2 px-2">
        {budgetChartData.map((item) => {
          const actualHeight = (item.actual / maxValue) * 150;

          return (
            <div key={item.month} className="flex flex-col items-center gap-2">
              <div className="flex gap-1">
                <div
                  className="w-5 rounded-sm bg-violet-600 transition-all hover:opacity-80"
                  style={{ height: `${actualHeight}px` }}
                ></div>
              </div>
              <span className="text-xs text-slate-600">{item.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
