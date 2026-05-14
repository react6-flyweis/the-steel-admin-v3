import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type TopCustomer = {
  customer: string;
  revenue: string;
};

type TopCustomersRevenueCardProps = {
  customers: TopCustomer[];
};

export function TopCustomersRevenueCard({
  customers,
}: TopCustomersRevenueCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Customers (Revenue)</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-y border-slate-300 bg-slate-200">
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-800">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-800">
                Revenue (USD)
              </th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.customer}
                className="border-b border-slate-300 bg-white"
              >
                <td className="px-6 py-4 text-base font-medium text-slate-800">
                  {customer.customer}
                </td>
                <td className="px-6 py-4 text-base font-normal text-slate-500">
                  {customer.revenue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
