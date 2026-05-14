import { AlertCircle, Info } from "lucide-react";

export function BudgetAlert() {
  return (
    <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 shadow-sm">
      <div className="flex gap-3">
        <AlertCircle className="h-5 w-5 flex-shrink-0 text-orange-600" />
        <div>
          <h4 className="font-semibold text-orange-900">Budget Alert</h4>
          <p className="mt-1 text-sm text-orange-800">
            You've used 75% of your monthly budget.
          </p>
        </div>
      </div>
    </div>
  );
}

export function ImportantNote() {
  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 shadow-sm">
      <div className="flex gap-3">
        <Info className="h-5 w-5 flex-shrink-0 text-blue-600" />
        <div>
          <h4 className="font-semibold text-blue-900">Important Note</h4>
          <p className="mt-1 text-sm text-blue-800">
            Attach receipts or invoices for expense proof.
          </p>
        </div>
      </div>
    </div>
  );
}
