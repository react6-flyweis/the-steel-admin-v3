import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  DollarSign,
  ShoppingBag,
  Handbag,
  Hourglass,
  Search,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import StatCardV2 from "@/components/ui/stat-card-v2";
import DateRangeFilter from "@/components/ui/date-range-filter";

const filingData = [
  {
    state: "Texas",
    stateColor: "bg-blue-900",
    rate: "8.25% Sales Tax",
    period: "May 2025",
    periodType: "Monthly",
    dueDate: "14/01/2024",
    dueIn: "In 31 Days",
    taxDue: "$4,50,000",
    status: "Due Soon",
  },
  {
    state: "California",
    stateColor: "bg-orange-500",
    rate: "8.25% Sales Tax",
    period: "May 2025",
    periodType: "Monthly",
    dueDate: "21/01/2024",
    dueIn: "In 31 Days",
    taxDue: "$3,15,000",
    status: "Due Soon",
  },
  {
    state: "New York",
    stateColor: "bg-blue-700",
    rate: "8.25% Sales Tax",
    period: "May 2025",
    periodType: "Monthly",
    dueDate: "20/02/2024",
    dueIn: "In 31 Days",
    taxDue: "$8,40,000",
    status: "Pending",
  },
  {
    state: "Arizona",
    stateColor: "bg-yellow-500",
    rate: "8.25% Sales Tax",
    period: "May 2025",
    periodType: "Monthly",
    dueDate: "15/03/2024",
    dueIn: "In 31 Days",
    taxDue: "$6,10,000",
    status: "Pending",
  },
  {
    state: "Nevada",
    stateColor: "bg-blue-800",
    rate: "8.25% Sales Tax",
    period: "May 2025",
    periodType: "Monthly",
    dueDate: "12/04/2024",
    dueIn: "In 31 Days",
    taxDue: "0",
    status: "No tax due",
  },
];

export default function SalesTaxFiling() {
  const [activeTab, setActiveTab] = useState("Pending Filing");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Due Soon":
        return (
          <Badge className="bg-orange-400 hover:bg-orange-500 text-white font-normal rounded-sm">
            Due Soon
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="bg-cyan-500 hover:bg-cyan-600 text-white font-normal rounded-sm">
            Pending
          </Badge>
        );
      case "No tax due":
        return (
          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-normal rounded-sm">
            No tax due
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const GrowthText = ({ value }: { value: string }) => (
    <span className="flex items-center text-emerald-500 font-medium">
      <TrendingUp className="w-3 h-3 mr-1" />
      {value}{" "}
      <span className="text-gray-400 font-normal ml-1">from last month</span>
    </span>
  );

  return (
    <div className="p-5 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Sales Tax & Filling
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Track sales tax collected on invoices and manage filling by state
          </p>
        </div>
        <Button variant="outline" className="bg-white">
          <Upload className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">State</label>
          <Select defaultValue="all">
            <SelectTrigger className="bg-white w-full">
              <SelectValue placeholder="All State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All State</SelectItem>
              <SelectItem value="tx">Texas</SelectItem>
              <SelectItem value="ca">California</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Project</label>
          <Select defaultValue="all">
            <SelectTrigger className="bg-white w-full">
              <SelectValue placeholder="All Projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Date Range
          </label>
          <DateRangeFilter />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Client</label>
          <Select defaultValue="all">
            <SelectTrigger className="bg-white w-full">
              <SelectValue placeholder="All Clients" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clients</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCardV2
          title="Total Sales (Taxable)"
          value="$1,245,600.00"
          subtitle={<GrowthText value="5.62%" />}
          icon={
            <div className="flex items-center justify-center p-1 rounded bg-purple-50 text-purple-600">
              <DollarSign className="w-4 h-4" />
            </div>
          }
          color="purple"
        />
        <StatCardV2
          title="Total Sales Tax Collected"
          value="$1,500,000"
          subtitle={<GrowthText value="11.4%" />}
          icon={
            <div className="flex items-center justify-center p-1 rounded bg-emerald-50 text-emerald-600">
              <ShoppingBag className="w-4 h-4" />
            </div>
          }
          color="green"
        />
        <StatCardV2
          title="Tax Payable by States"
          value="$2,200,000"
          subtitle={<GrowthText value="8.52%" />}
          icon={
            <div className="flex items-center justify-center p-1 rounded bg-amber-50 text-yellow-600">
              <Handbag className="w-4 h-4" />
            </div>
          }
          color="yellow"
        />
        <StatCardV2
          title="File VS Unfiled Tax"
          value={
            <div className="flex flex-col text-sm font-semibold space-y-1 mt-2">
              <span>File: $300,000</span>
              <span>Unfiled: $300,000</span>
            </div>
          }
          subtitle=""
          icon={
            <div className="flex items-center justify-center p-1 rounded bg-rose-50 text-red-500">
              <Hourglass className="w-4 h-4" />
            </div>
          }
          color="red"
        />
      </div>

      {/* Tabs and Content */}
      <div className="space-y-4">
        <div className="flex items-center border-b pb-0 gap-8 relative">
          <div className="flex space-x-8 flex-1">
            {["Pending Filing", "Filing History"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-semibold relative ${
                  activeTab === tab
                    ? "text-blue-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-700" />
                )}
              </button>
            ))}
          </div>
          <div className="absolute right-0 top-[-8px]">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="h-9 w-62.5 rounded-md border border-input bg-white pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-900 text-lg">
              Pending Fillings
            </h3>
          </div>
          <Table>
            <TableHeader className="bg-[#f8fafc]">
              <TableRow className="border-none">
                <TableHead className="font-semibold text-gray-600 h-11">
                  State
                </TableHead>
                <TableHead className="font-semibold text-gray-600 h-11">
                  Filling Period
                </TableHead>
                <TableHead className="font-semibold text-gray-600 h-11">
                  Due Date ▾
                </TableHead>
                <TableHead className="font-semibold text-gray-600 h-11">
                  Tax Due
                </TableHead>
                <TableHead className="font-semibold text-gray-600 h-11">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-gray-600 h-11">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filingData.map((row, idx) => (
                <TableRow
                  key={idx}
                  className="border-b last:border-none hover:bg-gray-50/50"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${row.stateColor}`}
                      >
                        <span className="text-xs font-bold">
                          {row.state.charAt(0)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">
                          {row.state}
                        </span>
                        <span className="text-xs text-gray-500">
                          {row.rate}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        {row.period}
                      </span>
                      <span className="text-xs text-gray-500">
                        {row.periodType}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-col">
                      <span className="text-gray-900">{row.dueDate}</span>
                      <span className="text-xs text-gray-500">{row.dueIn}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-gray-600 text-sm">
                    {row.taxDue}
                  </TableCell>
                  <TableCell className="py-4">
                    {getStatusBadge(row.status)}
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      {row.status === "No tax due" ? (
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                          View Details
                        </button>
                      ) : (
                        <>
                          <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                            Review Details
                          </button>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white h-8 text-xs px-4">
                            Prepare Filling
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <div className="flex items-center text-sm text-gray-500">
              Showing
              <Select defaultValue="10">
                <SelectTrigger className="h-8 w-[60px] mx-2 bg-white">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              Results
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 text-gray-400 rounded-md border-gray-200"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 p-0 rounded-md"
              >
                1
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 text-gray-600 border-gray-200 p-0 rounded-md hover:bg-gray-50"
              >
                2
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 text-gray-600 border-gray-200 p-0 rounded-md hover:bg-gray-50"
              >
                3
              </Button>
              <div className="px-2 text-gray-400">
                <MoreHorizontal className="h-4 w-4" />
              </div>
              <Button
                variant="outline"
                className="h-8 w-8 text-gray-600 border-gray-200 p-0 rounded-md hover:bg-gray-50"
              >
                15
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 text-gray-600 rounded-md border-gray-200"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
