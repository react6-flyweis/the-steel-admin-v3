import { useState, useMemo } from "react";
import {
  Download,
  Upload,
  Eye,
  MoreVertical,
  SearchIcon,
  ChevronRight,
  MoreHorizontal,
  ChevronLeft,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DateRangePicker from "@/components/ui/date-range-picker";
import type { DateRange as RDateRange } from "react-day-picker";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

type CarrierInvoice = {
  id: string;
  carrier: string;
  loadId: string;
  freightRequest: string;
  awarded: number;
  invoice: number;
  variance: number;
  dueDate: string; // ISO
};

const initialCarrierInvoices: CarrierInvoice[] = [
  {
    id: "1",
    carrier: "FastFreight Logistics",
    loadId: "LDD000028",
    freightRequest: "FR-2024-0245",
    awarded: 54500,
    invoice: 54500,
    variance: 0,
    dueDate: "2025-01-22",
  },
  {
    id: "2",
    carrier: "QuickHaul Transport",
    loadId: "LDD000026",
    freightRequest: "FR-2024-0245",
    awarded: 56800,
    invoice: 56800,
    variance: 0,
    dueDate: "2025-01-07",
  },
  {
    id: "3",
    carrier: "Reliable Freight",
    loadId: "LDD000023",
    freightRequest: "FR-2024-0245",
    awarded: 55200,
    invoice: 55200,
    variance: 0,
    dueDate: "2025-01-30",
  },
  {
    id: "4",
    carrier: "FastFreight Logistics",
    loadId: "LDD000022",
    freightRequest: "FR-2024-0245",
    awarded: 54500,
    invoice: 54500,
    variance: 0,
    dueDate: "2025-01-17",
  },
  {
    id: "5",
    carrier: "QuickHaul Transport",
    loadId: "LDD000021",
    freightRequest: "FR-2024-0245",
    awarded: 56800,
    invoice: 56800,
    variance: 0,
    dueDate: "2025-01-04",
  },
  {
    id: "6",
    carrier: "Reliable Freight",
    loadId: "LDD000020",
    freightRequest: "FR-2024-0245",
    awarded: 55200,
    invoice: 55200,
    variance: 0,
    dueDate: "2025-01-09",
  },
  {
    id: "7",
    carrier: "FastFreight Logistics",
    loadId: "LDD000019",
    freightRequest: "FR-2024-0245",
    awarded: 54500,
    invoice: 54500,
    variance: 0,
    dueDate: "2025-01-07",
  },
  {
    id: "8",
    carrier: "QuickHaul Transport",
    loadId: "LDD000018",
    freightRequest: "FR-2024-0245",
    awarded: 56800,
    invoice: 56800,
    variance: 0,
    dueDate: "2025-01-15",
  },
  {
    id: "9",
    carrier: "Reliable Freight",
    loadId: "LDD000017",
    freightRequest: "FR-2024-0245",
    awarded: 55200,
    invoice: 55200,
    variance: 0,
    dueDate: "2025-01-30",
  },
  {
    id: "10",
    carrier: "FastFreight Logistics",
    loadId: "LDD000016",
    freightRequest: "FR-2024-0245",
    awarded: 54500,
    invoice: 54500,
    variance: 0,
    dueDate: "2025-01-12",
  },
];

function formatCurrency(n: number) {
  return `$${n.toLocaleString()}`;
}

export default function CarrierInvoicesPage() {
  const [invoices] = useState(initialCarrierInvoices);
  const [searchQuery, setSearchQuery] = useState("");
  const [carrierFilter, setCarrierFilter] = useState("All");
  const [dateRange, setDateRange] = useState<RDateRange | undefined>(undefined);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  // Get unique carriers from invoices
  const carriers = useMemo(() => {
    const uniqueCarriers = new Set(invoices.map((inv) => inv.carrier));
    return ["All", ...Array.from(uniqueCarriers).sort()];
  }, [invoices]);

  // Filter invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      // Search filter
      if (
        searchQuery &&
        !`${inv.loadId} ${inv.carrier} ${inv.freightRequest}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Carrier filter
      if (carrierFilter !== "All" && inv.carrier !== carrierFilter) {
        return false;
      }

      // Date range filter
      if (dateRange) {
        const dueDate = new Date(inv.dueDate);
        if (dateRange.from && dateRange.to) {
          if (dueDate < dateRange.from || dueDate > dateRange.to) {
            return false;
          }
        } else if (dateRange.from) {
          if (dueDate < dateRange.from) {
            return false;
          }
        } else if (dateRange.to) {
          if (dueDate > dateRange.to) {
            return false;
          }
        }
      }

      return true;
    });
  }, [invoices, searchQuery, carrierFilter, dateRange]);

  // Pagination
  const totalItems = filteredInvoices.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));
  const currentPageClamped = Math.min(currentPage, totalPages);
  const startIndex = (currentPageClamped - 1) * rowsPerPage;
  const paginatedInvoices = filteredInvoices.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  // Selection state for checkboxes
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    const currentPageIds = paginatedInvoices.map((i) => i.id);
    const allSelected = currentPageIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      // deselect all on page
      setSelectedIds((prev) =>
        prev.filter((id) => !currentPageIds.includes(id)),
      );
    } else {
      setSelectedIds((prev) =>
        Array.from(new Set([...prev, ...currentPageIds])),
      );
    }
  };

  const handleView = (invoice: CarrierInvoice) => {
    // stub: view details
    // replace with modal/open route later
    // eslint-disable-next-line no-console
    console.log("View invoice", invoice);
  };

  const handleDownloadInvoice = (invoice: CarrierInvoice) => {
    const csv = [
      [
        "Carrier",
        "Load ID",
        "Freight Request",
        "Awarded",
        "Invoice",
        "Variance",
        "Due Date",
      ],
      [
        invoice.carrier,
        invoice.loadId,
        invoice.freightRequest,
        invoice.awarded.toString(),
        invoice.invoice.toString(),
        invoice.variance.toString(),
        invoice.dueDate,
      ],
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${invoice.loadId}.csv`;
    a.click();
  };

  const handleExport = () => {
    // Export logic
    const csv = [
      [
        "Carrier",
        "Load ID",
        "Freight Request",
        "Awarded",
        "Invoice",
        "Variance",
        "Due Date",
      ],
      ...filteredInvoices.map((inv) => [
        inv.carrier,
        inv.loadId,
        inv.freightRequest,
        inv.awarded,
        inv.invoice,
        inv.variance,
        inv.dueDate,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `carrier-invoices-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const handleUpload = () => {
    // Upload logic
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,.xlsx,.xls";
    input.click();
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Carrier Invoices
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and track carrier freight invoices
            </p>
          </div>
          <Button onClick={handleExport} variant="outline">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Header with Title and Upload Button */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Carrier Invoices</h2>
          <Button
            onClick={handleUpload}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Upload className="w-4 h-4" />
            Upload Invoice
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date Range Picker */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose Date
              </label>
              <DateRangePicker value={dateRange} onChange={setDateRange} />
            </div>

            {/* Carrier Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Carrier
              </label>
              <Select value={carrierFilter} onValueChange={setCarrierFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select carrier" />
                </SelectTrigger>
                <SelectContent>
                  {carriers.map((carrier) => (
                    <SelectItem key={carrier} value={carrier}>
                      {carrier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Carrier Invoices Section */}
        <Card className="">
          <CardHeader>
            {/* Search */}
            <InputGroup className="max-w-2xs rounded">
              <InputGroupAddon>
                <SearchIcon className="w-4 h-4 text-gray-500" />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </InputGroup>
          </CardHeader>
          <CardContent className="">
            <div className="space-y-6">
              {/* Table */}
              <div className="overflow-x-auto">
                <Table className="w-full">
                  <TableHeader className="bg-gray-100">
                    <TableRow>
                      <TableHead className="w-8">
                        <input
                          type="checkbox"
                          aria-label="select all"
                          checked={
                            paginatedInvoices.length > 0 &&
                            paginatedInvoices.every((i) =>
                              selectedIds.includes(i.id),
                            )
                          }
                          onChange={toggleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900">
                        Carrier
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900">
                        Load ID
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900">
                        Freight Request
                      </TableHead>
                      <TableHead className="text-right font-semibold text-gray-900">
                        Awarded
                      </TableHead>
                      <TableHead className="text-right font-semibold text-gray-900">
                        Invoice
                      </TableHead>
                      <TableHead className="text-right font-semibold text-gray-900">
                        Variance
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900">
                        Due Date
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedInvoices.length > 0 ? (
                      paginatedInvoices.map((invoice) => (
                        <TableRow
                          key={invoice.id}
                          className="border-b hover:bg-gray-50"
                        >
                          <TableCell className="w-8">
                            <input
                              type="checkbox"
                              aria-label={`select-${invoice.loadId}`}
                              checked={selectedIds.includes(invoice.id)}
                              onChange={() => toggleSelect(invoice.id)}
                            />
                          </TableCell>
                          <TableCell className="font-medium text-gray-900">
                            {invoice.carrier}
                          </TableCell>
                          <TableCell className="text-gray-700">
                            {invoice.loadId}
                          </TableCell>
                          <TableCell className="text-gray-700">
                            {invoice.freightRequest}
                          </TableCell>
                          <TableCell className="text-right font-semibold text-gray-900">
                            {formatCurrency(invoice.awarded)}
                          </TableCell>
                          <TableCell className="text-right font-semibold text-gray-900">
                            {formatCurrency(invoice.invoice)}
                          </TableCell>
                          <TableCell className="text-right text-gray-700">
                            {formatCurrency(invoice.variance)}
                          </TableCell>
                          <TableCell className="text-gray-700">
                            {new Date(invoice.dueDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              },
                            )}
                          </TableCell>
                          <TableCell className="flex items-center gap-3">
                            <button
                              type="button"
                              aria-label="view"
                              onClick={() => handleView(invoice)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              aria-label="download"
                              onClick={() => handleDownloadInvoice(invoice)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              aria-label="more actions"
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={9}
                          className="text-center py-8 text-gray-500"
                        >
                          No invoices found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            {/* Pagination Footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <div className="flex items-center text-sm text-gray-500">
                Showing
                <Select defaultValue="10">
                  <SelectTrigger className="h-8 w-15 mx-2 bg-white">
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
                  className="h-8 w-8 border-blue-600 text-blue-600 font-medium p-0 rounded-md"
                >
                  1
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 text-gray-600 border-none p-0 rounded-md hover:bg-gray-50"
                >
                  2
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 text-gray-600 border-none p-0 rounded-md hover:bg-gray-50"
                >
                  3
                </Button>
                <div className="px-2 text-gray-400">
                  <MoreHorizontal className="h-4 w-4" />
                </div>
                <Button
                  variant="outline"
                  className="h-8 w-8 text-gray-600 border-none p-0 rounded-md hover:bg-gray-50"
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
