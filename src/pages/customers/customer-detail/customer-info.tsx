import { Link, useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Clock3,
  DollarSign,
  FileSpreadsheet,
  FileText,
  MailIcon,
  Printer,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/ui/stat-card";
import ProfileCard from "@/components/profile-card";
import { useCustomerDetailQuery } from "@/modules/customers/customers.hooks";
import photo1 from "@/assets/images/customers/photos-1.webp";
import photo2 from "@/assets/images/customers/photos-2.webp";
import photo3 from "@/assets/images/customers/photos-3.webp";
import photo4 from "@/assets/images/customers/photos-4.webp";
import photo5 from "@/assets/images/customers/photos-5.webp";

function formatCurrency(value = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatJoinedDate(value?: string) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function CustomerDetailLayout() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id ?? "unknown";

  const {
    data: customerDetailResponse,
    isLoading,
    isError,
  } = useCustomerDetailQuery(id);

  const customerData = customerDetailResponse?.data.customer;

  const customerName =
    `${customerData?.firstName ?? ""} ${customerData?.lastName ?? ""}`.trim() ||
    "-";

  const phoneNumber = customerData?.phone?.number ?? "";
  const phoneCountryCode = customerData?.phone?.countryCode ?? "";
  const phone =
    phoneCountryCode && phoneNumber
      ? `${phoneCountryCode} ${phoneNumber}`
      : phoneNumber || "-";

  const joinedDate = formatJoinedDate(customerData?.createdAt);

  const customer = {
    id: customerData?.customerId ?? customerData?._id ?? id,
    customerName,
    email: customerData?.email ?? "-",
    phone,
    inquiryFor:
      customerDetailResponse?.data.projects?.[0]?.buildingType?.trim() || "-",
    status: customerData?.isActive ? "Active" : "Inactive",
    joined: joinedDate,
    address: "-",
  };

  const profileData = {
    name: customer.customerName,
    status: customer.status as "Active" | "Inactive",
    id: customer.id,
    joined: customer.joined,
    phone: customer.phone,
    email: customer.email,
    address: customer.address,
  };

  const projectHistory = [
    {
      project: "Project 1",
      jobId: "PRO-001",
      projectName: "ABC Building",
      amount: "$5,0000",
      status: "Completed",
      startDate: "Apr 02, 2024",
      endDate: "May 02, 2024",
    },
    {
      project: "Project 2",
      jobId: "PRO-002",
      projectName: "XYZ Building",
      amount: "$5,0000",
      status: "Completed",
      startDate: "Apr 02, 2024",
      endDate: "May 02, 2024",
    },
    {
      project: "Project 3",
      jobId: "PRO-003",
      projectName: "PQR Building",
      amount: "$5,0000",
      status: "In progress",
      startDate: "Apr 02, 2024",
      endDate: "May 02, 2024",
    },
  ];

  const invoiceRows = [
    {
      invoiceNumber: "INV001",
      dueDate: "24 Dec 2024",
      amount: "$500",
      paid: "$500",
      amountDue: "$500",
      status: "Paid",
    },
    {
      invoiceNumber: "INV002",
      dueDate: "10 Dec 2024",
      amount: "$1500",
      paid: "$1500",
      amountDue: "$1500",
      status: "Paid",
    },
    {
      invoiceNumber: "INV003",
      dueDate: "27 Nov 2024",
      amount: "$600",
      paid: "$600",
      amountDue: "$600",
      status: "Paid",
    },
    {
      invoiceNumber: "INV004",
      dueDate: "18 Nov 2024",
      amount: "$1000",
      paid: "$1000",
      amountDue: "$1000",
      status: "Unpaid",
    },
  ];

  const photos = [photo1, photo2, photo3, photo4, photo5];

  return (
    <div className="p-4 sm:p-6 space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="default"
            onClick={() => navigate(-1)}
            className="px-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-lg ">Customer Info</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <Button asChild className="w-full sm:w-auto bg-black px-4">
            <Link to={`/customers/${id}/edit`}>Edit</Link>
          </Button>
          <Link to={`/customers/${id}/projects/new`}>
            <Button className="w-full sm:w-auto bg-[#1F86D5] hover:bg-[#1769A7]">
              Create new Project
            </Button>
          </Link>
          <Link to="/customers/meetings/schedule">
            <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
              <MailIcon className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
          </Link>
        </div>
      </div>

      {isError ? (
        <Card className="p-4">
          <CardContent className="px-0 py-0 text-sm text-red-600">
            Failed to load customer details. Please refresh and try again.
          </CardContent>
        </Card>
      ) : null}

      {/* Profile Card */}
      <ProfileCard profile={profileData} isLoading={isLoading} />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Paid"
          value={formatCurrency(customerDetailResponse?.data.totalPaid ?? 0)}
          color="bg-[#1D51A4]"
          icon={<DollarSign className="h-5 w-5 text-[#1D51A4]" />}
        />
        <StatCard
          title="Pending Payment"
          value={formatCurrency(customerDetailResponse?.data.totalPending ?? 0)}
          color="bg-[#FD8D5B]"
          icon={<Clock3 className="h-5 w-5 text-[#FD8D5B]" />}
        />
        <StatCard
          title="Total Invoices"
          value={String(customerDetailResponse?.data.totalInvoices ?? 0)}
          color="bg-[#EAB308]"
          icon={<FileText className="h-5 w-5 text-[#EAB308]" />}
        />
        <StatCard
          title="Revenue Generated"
          value={formatCurrency(customerDetailResponse?.data.totalPaid ?? 0)}
          color="bg-[#A855F7]"
          icon={<DollarSign className="h-5 w-5 text-[#A855F7]" />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Project</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pt-0 pb-2">
          <div className="overflow-x-auto">
            <table className="w-full min-w-205">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                    Project
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                    Job ID
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                    Project Name
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                    Amount
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                    Start Date
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">
                    End Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {projectHistory.map((project, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-0 hover:bg-transparent"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {project.project}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {project.jobId}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {project.projectName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {project.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-sm ${
                          project.status === "Completed"
                            ? "text-green-600"
                            : "text-orange-600"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {project.startDate}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {project.endDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pt-4 pb-2 text-center">
            <Button
              variant="link"
              className="text-blue-600 text-sm"
              onClick={() => navigate(`/customers/${id}/projects`)}
            >
              View All
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="">
        <CardHeader className="flex flex-row items-center justify-between gap-3">
          <CardTitle>Invoice List</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              className="h-9 w-9 rounded border bg-white p-0 text-red-600 hover:bg-red-50"
              aria-label="Export PDF"
            >
              <FileText className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-9 w-9 rounded border bg-white p-0 text-green-600 hover:bg-green-50"
              aria-label="Export Excel"
            >
              <FileSpreadsheet className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-9 w-9 rounded border bg-white p-0 text-gray-600 hover:bg-gray-50"
              aria-label="Print"
            >
              <Printer className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0 pt-0 pb-2">
          <div className="overflow-x-auto">
            <table className="w-full min-w-225">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                    Invoice Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                    Paid
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                    Amount Due
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoiceRows.map((invoice) => (
                  <tr
                    key={invoice.invoiceNumber}
                    className="border-b last:border-0 hover:bg-transparent"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-orange-500">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {invoice.dueDate}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {invoice.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {invoice.paid}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {invoice.amountDue}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold text-white ${
                          invoice.status === "Paid"
                            ? "bg-emerald-500"
                            : "bg-red-600"
                        }`}
                      >
                        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-white" />
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {invoice.status === "Unpaid" ? (
                        <Button
                          type="button"
                          className="h-6 rounded-md bg-indigo-600 px-2.5 text-xs font-medium text-white hover:bg-indigo-700"
                        >
                          Mark as paid
                        </Button>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Photos</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pt-0 pb-6">
          <div className="grid grid-cols-2 gap-4 px-6 sm:grid-cols-2 md:grid-cols-3">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="h-28 overflow-hidden rounded-lg bg-gray-100 sm:h-32"
              >
                <img
                  src={photo}
                  alt={`Project photo ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
